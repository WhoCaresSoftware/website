# Update the brand package

Use this after a new `@whocaressoftware/brand` version is published, to adopt
its theme and artwork in the website.

## Before you start

- A working checkout set up with `task setup` (GitHub sign-in with package read
  access).
- The published brand version to adopt. Releasing brand is described in the
  brand repository's `docs/RELEASING.md`.

## Steps

1. Install the published brand version explicitly:

   ```sh
   npm install --save-exact @whocaressoftware/brand@<version>
   npm run check
   ```

2. Commit both npm manifests (`package.json` and `package-lock.json`) together.
3. Merge into `main`. `.github/workflows/deploy.yml` runs `npm run check`, builds
   and deploys the site to GitHub Pages.

## Verify

- `npm run check` passes locally.
- The "Deploy to GitHub Pages" workflow run on `main` succeeds and the live site
  shows the new brand version.
