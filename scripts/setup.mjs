import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

function run(command, args, options = {}) {
  const env = { ...process.env };
  if (command === 'gh') {
    // Shell/CI tokens override gh's stored browser login and cannot be refreshed.
    delete env.GH_TOKEN;
    delete env.GITHUB_TOKEN;
  }
  const result = spawnSync(command, args, { encoding: 'utf8', env, ...options });
  if (result.error) throw new Error(`Could not run ${command}: ${result.error.message}`);
  return result;
}

function requireSuccess(result, message) {
  if (result.status !== 0) throw new Error(message);
  return result.stdout?.trim();
}

function setup() {
  requireSuccess(run('npm', ['--version']), 'Install Node.js 22.12+ and npm first.');
  requireSuccess(run('gh', ['--version']), 'Install GitHub CLI first: https://cli.github.com/');

  if (run('gh', ['auth', 'status', '--hostname', 'github.com']).status !== 0) {
    requireSuccess(run('gh', [
      'auth', 'login', '--hostname', 'github.com', '--web', '--git-protocol', 'https',
      '--scopes', 'read:packages',
    ], { stdio: 'inherit' }), 'GitHub browser authentication failed.');
  }

  const identity = run('gh', ['api', '--hostname', 'github.com', '--include', 'user']);
  requireSuccess(identity, 'Could not verify GitHub authentication. Check your connection and gh auth status.');
  const scopes = identity.stdout.match(/^x-oauth-scopes:\s*(.*)$/im)?.[1]
    .split(',').map((scope) => scope.trim()) ?? [];
  if (!scopes.some((scope) => ['read:packages', 'write:packages'].includes(scope))) {
    requireSuccess(run('gh', [
      'auth', 'refresh', '--hostname', 'github.com', '--scopes', 'read:packages',
    ], { stdio: 'inherit' }), 'Could not authorize package access in GitHub.');
  }

  const token = requireSuccess(run('gh', ['auth', 'token', '--hostname', 'github.com']),
    'Could not retrieve the GitHub credential.');
  if (!token) throw new Error('GitHub returned an empty credential.');

  // Preserve user npm settings without putting a credential in the repository or ~/.npmrc.
  const userConfigPath = requireSuccess(run('npm', ['config', 'get', 'userconfig']),
    'Could not locate the npm user configuration.');
  let userConfig = '';
  try {
    userConfig = readFileSync(userConfigPath, 'utf8');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  const directory = mkdtempSync(join(tmpdir(), 'website-setup-'));
  try {
    const configPath = join(directory, 'npmrc');
    writeFileSync(configPath,
      `${userConfig}\n//npm.pkg.github.com/:_authToken=\${NODE_AUTH_TOKEN}\n`,
      { mode: 0o600 });
    requireSuccess(run('npm', ['ci'], {
      stdio: 'inherit',
      env: { ...process.env, NODE_AUTH_TOKEN: token, npm_config_userconfig: configPath },
    }), 'Dependency installation failed. For 401/403/404 errors, ask an admin for Read access to @whocaressoftware/brand and authorize organization SSO if required.');
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
  console.log('Setup complete. Run npm run dev.');
}

try {
  setup();
} catch (error) {
  console.error(`Setup failed: ${error.message}`);
  process.exitCode = 1;
}
