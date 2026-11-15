# website

The static, bilingual Who Cares Software website, built with Vite and hosted on
GitHub Pages at [whocaressoftware.com](https://whocaressoftware.com/).

## Prerequisites

- mise
- Node.js 22.12+ and the GitHub CLI
- Read access to the private `@whocaressoftware/brand` package (an account in
  the WhoCaresSoftware GitHub organization)

## Getting started

```sh
mise install
task setup    # signs in to GitHub in the browser and installs dependencies
```

## Usage

```sh
task dev          # local development server
task lint         # stylesheet lints
npm run check     # lints, build and brand, publication and demo checks
npm run preview   # serve the production build
```

Pushes to `main` are checked, built and deployed to GitHub Pages.

## Learn more

- [Product: purpose, audience and voice](PRODUCT.md)
- [Design system](DESIGN.md)
- Runbooks: [Update the brand package](docs/runbooks/update-brand.md)
