# MARLO Innovation Catalog Client

Modern web client for the MARLO Innovation Catalog, built with Astro, Vue, TypeScript, Tailwind CSS, and PrimeVue.

## Requirements

- Node.js 22.12.0 or newer
- npm

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Project Structure

```text
src/
├── components/     Shared Astro and Vue components
├── composables/    API and reusable Vue logic
├── content/        Static text and project variables
├── images/         Source images and SVG assets
├── interfaces/     TypeScript interfaces
├── layouts/        Astro layouts
├── pages/          Astro routes and page-specific components
├── providers/      Vue providers
├── styles/         Global CSS
└── utils/          Helper functions
```

## Environment

Copy `.env.example` into a local environment file and configure the public API, analytics, Clarity, and Turnstile values for the target environment.
