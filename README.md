# Who Cares Software website

A static, bilingual website with self-hosted assets, built with Vite and npm.

## Requirements

- mise

`mise` installs all packages and tools that are needed for the website to build locally.

### Technologies

- Node.js 22.12+
- Github Cli
- Task

## Setup
```sh
mise install
mise exec task -- task setup
```

## Brand updates and deployment

Install a published brand version explicitly, then commit both npm manifests:

```sh
npm install --save-exact @whocaressoftware/brand@<version>
npm run check
```

