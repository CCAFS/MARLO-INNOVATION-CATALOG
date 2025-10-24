# MARLO Innovation Catalog - Claude Code Context

## Project Overview
Modern web application for MARLO's innovation catalog built with Astro 5.13.7, Vue 3.5.21, and TypeScript.

## Technology Stack

### Core
- **Astro 5.13.7**: Static site generator with islands architecture
- **Vue 3.5.21**: Reactive components with `<script setup>` composition API
- **TypeScript**: Strict mode with configured path aliases
- **Vite**: Build tool integrated with Astro

### UI & Styling
- **Tailwind CSS 4.1.13**: Utility-first CSS framework
- **PrimeVue 4.3.9**: Professional Vue component library
- **PrimeIcons 7.0.0**: Icon library
- **TailwindCSS-PrimeUI 0.6.1**: Tailwind + PrimeVue integration
- **Montserrat**: Primary font family

### Development & Deployment
- **Node.js 20**: Runtime environment
- **Docker**: Multi-stage containerization
- **Nginx**: Production static file server

## Architecture

### Directory Structure
```
src/
├── components/
│   ├── shared/         # Shared Astro + Vue components
│   └── vue/            # Vue-specific reactive components
├── pages/
│   ├── index/          # Main page with subcomponents
│   └── innovation/     # Innovation detail pages
├── layouts/            # Base layouts (MainLayout.astro)
├── interfaces/         # TypeScript type definitions
├── styles/             # Global styles and custom CSS
├── utils/              # Helper functions and utilities
├── content/            # Static content and variables
└── jsons/              # Static data (JSON/TS)
```

### Component Strategy
- **Astro (.astro)**: Use for static, SEO-friendly components
- **Vue (.vue)**: Use for reactive, interactive components
- **Hydration**: Apply `client:load` directive for client-side interactivity
- **Composables**: Shared logic in `useSharedValue.ts`, `usePublicAPI.ts`

### State Management
- Vue composables for shared reactive state
- Props drilling for component communication
- Public APIs for dynamic data fetching

## Development Patterns

### Astro Components
- Use frontmatter `---` for server-side logic
- Can embed Vue components when reactivity needed
- Static by default, fast performance

### Vue Components
- `<script setup>` syntax preferred
- TypeScript with proper interface definitions
- Integration via `@astrojs/vue`

### TypeScript Configuration
- Strict mode enabled (`astro/tsconfigs/strict`)
- Path aliases configured:
  - `~/*` - Root src directory
  - `@components/*` - Components directory
  - Additional aliases as needed

## Key Features

### Innovation Catalog
- Advanced filtering (country, phase, type, SDG)
- Readiness scale explorer
- Innovation cards with detailed information
- Statistics and interactive maps

### Data Management
- Public API integration for dynamic data
- Static data in TypeScript files
- Complex interfaces for innovations, countries, SDGs

### SEO & Performance
- Open Graph and Twitter Card meta tags
- Client-side routing with `ClientRouter`
- Optimized images and static assets

## Coding Conventions

### Naming Conventions
- **Components**: PascalCase
  - Astro: `BasicButton.component.astro`
  - Vue: `Home.vue`
- **Interfaces**: PascalCase with `.interface.ts` suffix
- **Utilities**: camelCase (e.g., `getCountryNormalizeText.ts`)

### File Organization
- Separate Astro (static) and Vue (reactive) components clearly
- Shared components in `/shared/` directory
- Base layouts for visual consistency

### Styling Approach
- Tailwind utilities for most styling
- Custom CSS in `/styles/` for specific cases only
- CSS variables for colors and theme customization

## Common Commands
```bash
npm run dev      # Start local development server
npm run build    # Create production build
npm run preview  # Preview production build
npm run astro    # Access Astro CLI
```

## Bug Fixing Guidelines
When fixing bugs in this codebase:
1. Check both Astro and Vue component interactions
2. Verify TypeScript interfaces match data structures
3. Test client-side hydration with `client:load` directive
4. Ensure Tailwind + PrimeVue integration is working
5. Validate API data fetching in composables
6. Check path alias resolution in imports

## Current Branch
- Working branch: `dev-detail-innovation`
- Main branch: `main`

## Notes
This project leverages Astro's islands architecture for optimal performance while using Vue for interactive components. The combination provides fast initial loads with selective hydration for dynamic features.
