# Implementation Plan: Next.js Migration

**Branch**: `001-nextjs-migration` | **Date**: 2025-01-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-nextjs-migration/spec.md`

## Summary

Migrate the Faith Point application from a Vite + React + Express architecture to Next.js framework. The migration must preserve all existing functionality, routes, components, and styling while replacing the build system, routing, and server setup with Next.js equivalents. The application currently uses Wouter for routing, Vite for building, and Express for serving, all of which will be replaced by Next.js's integrated solution.

## Technical Context

**Language/Version**: TypeScript 5.6.3, Node.js (current version)  
**Primary Dependencies**: Next.js 15.x (latest stable), React 19.2.0, React DOM 19.2.0  
**Storage**: Drizzle ORM with Neon/PostgreSQL (existing, no changes needed)  
**Testing**: Manual testing during migration (no test framework changes)  
**Target Platform**: Web application (browser + Node.js server)  
**Project Type**: Web application (full-stack Next.js)  
**Performance Goals**: Maintain current performance, leverage Next.js optimizations (SSR, static generation where applicable)  
**Constraints**: Must maintain existing functionality, preserve all routes and components, keep same visual appearance  
**Scale/Scope**: 6 page routes, ~50+ React components, existing UI component library (Radix UI), Tailwind CSS styling

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Constitution file is currently a template and not yet defined. No specific constitution constraints to validate against. Proceeding with standard migration practices.

## Project Structure

### Documentation (this feature)

```text
specs/001-nextjs-migration/
├── plan.md              # This file
├── spec.md              # Feature specification
├── checklists/          # Quality checklists
│   └── requirements.md
└── tasks.md             # Task breakdown (to be created by /speckit.tasks)
```

### Source Code (repository root)

**Current Structure (Vite + React)**:
```text
client/
├── src/
│   ├── components/      # React components
│   ├── pages/          # Page components (Wouter routes)
│   ├── lib/            # Utilities, queryClient
│   └── main.tsx        # Entry point
├── index.html          # HTML template
└── public/             # Static assets

server/
├── app.ts              # Express app setup
├── routes.ts           # API routes (currently minimal)
├── storage.ts          # Database interface
└── index-dev.ts        # Dev server with Vite
```

**Target Structure (Next.js)**:
```text
app/                    # Next.js App Router
├── layout.tsx          # Root layout
├── page.tsx            # Home page (/)
├── events/
│   └── page.tsx        # Events page (/events)
├── sermons/
│   └── page.tsx        # Sermons page (/sermons)
├── about/
│   └── page.tsx        # About page (/about)
├── resources/
│   └── page.tsx        # Resources page (/resources)
├── merch/
│   └── page.tsx        # Merch page (/merch)
├── api/                # API routes (if needed)
│   └── [routes]/route.ts
└── not-found.tsx       # 404 page

components/             # Shared React components
├── layout/
│   └── navbar.tsx
├── sections/
│   ├── hero.tsx
│   ├── carousel-section.tsx
│   ├── editorial-grid.tsx
│   └── ministry-collage.tsx
└── ui/                 # Radix UI components (keep as-is)

lib/                    # Utilities
├── queryClient.ts      # React Query setup
└── utils.ts

public/                 # Static assets (moved from client/public)
└── favicon.png

shared/                 # Shared schemas (keep as-is)
└── schema.ts

attached_assets/        # Design assets (keep as-is)
```

**Structure Decision**: Using Next.js App Router (modern approach) with file-based routing. Components remain in a `components/` directory at root level for reusability. API routes will be in `app/api/` if needed. Static assets move to root `public/` directory.

## Migration Strategy

### Phase 1: Setup Next.js Foundation
1. Install Next.js and update dependencies
2. Create Next.js configuration files
3. Set up TypeScript configuration for Next.js
4. Configure Tailwind CSS for Next.js
5. Update package.json scripts

### Phase 2: Migrate Project Structure
1. Create `app/` directory structure
2. Move components from `client/src/components/` to root `components/`
3. Convert pages from Wouter routes to Next.js App Router pages
4. Move static assets from `client/public/` to root `public/`
5. Create root layout with providers (React Query, Tooltip, Toaster)

### Phase 3: Convert Routing
1. Remove Wouter dependency
2. Convert each page component to Next.js page.tsx format
3. Update navigation links to use Next.js Link component
4. Handle 404 page
5. Test all routes

### Phase 4: Migrate Server/API (if applicable)
1. Remove Express server files
2. Convert any API routes to Next.js API routes (if needed)
3. Update database/storage access for Next.js server components
4. Remove Vite dev server integration

### Phase 5: Update Build System
1. Remove Vite configuration
2. Remove Vite-specific plugins
3. Update build scripts
4. Test production build
5. Clean up unused dependencies

### Phase 6: Testing & Validation
1. Verify all pages load correctly
2. Test navigation between pages
3. Verify all components render correctly
4. Check static assets load
5. Verify styling matches original
6. Test development server and hot reload
7. Test production build and serve

## Technical Decisions

### Next.js App Router vs Pages Router
**Decision**: Use App Router (Next.js 13+ approach)
**Rationale**: Modern, recommended approach with better performance, supports React Server Components, better data fetching patterns

### Component Organization
**Decision**: Keep components at root level in `components/` directory
**Rationale**: Maintains current structure, easier migration, components remain reusable across pages

### React Query Integration
**Decision**: Keep React Query, adapt for Next.js
**Rationale**: Existing setup works well, Next.js supports client-side data fetching libraries

### Tailwind CSS
**Decision**: Use Next.js Tailwind CSS integration
**Rationale**: Next.js has built-in Tailwind support, minimal configuration changes needed

### Static Assets
**Decision**: Move to root `public/` directory
**Rationale**: Next.js convention, simpler path resolution

### API Routes
**Decision**: Convert to Next.js API routes only if needed
**Rationale**: Current routes.ts is mostly empty, may not need immediate migration

## Dependencies to Add

- `next`: ^15.0.0 (Next.js framework)
- `react`: ^19.2.0 (keep existing version)
- `react-dom`: ^19.2.0 (keep existing version)

## Dependencies to Remove

- `vite`: Build tool replaced by Next.js
- `@vitejs/plugin-react`: No longer needed
- `wouter`: Routing replaced by Next.js
- `express`: Server replaced by Next.js (if fully migrating)
- `@replit/vite-plugin-*`: Vite-specific plugins
- Vite-related dev dependencies

## Dependencies to Keep

- `@tanstack/react-query`: Data fetching
- `@radix-ui/*`: UI component library
- `tailwindcss`: Styling
- `drizzle-orm`: Database ORM
- `zod`: Schema validation
- All other React/UI dependencies

## Configuration Files to Create

- `next.config.ts`: Next.js configuration
- Update `tsconfig.json`: Add Next.js types and paths
- Update `tailwind.config.ts`: Next.js-specific configuration
- Update `postcss.config.js`: Ensure compatibility

## Configuration Files to Remove

- `vite.config.ts`: Replaced by Next.js
- `vite-plugin-meta-images.ts`: May need Next.js alternative or remove

## Environment Variables

- Maintain existing environment variables
- Next.js uses `.env.local` for local development (similar to current setup)
- Ensure `PORT` variable works with Next.js (defaults to 3000, can be configured)

## Potential Challenges

1. **Replit-specific plugins**: May need to remove or find alternatives
2. **Vite HMR**: Next.js has its own hot reload, should work similarly
3. **Path aliases**: Need to update from Vite aliases to Next.js path mapping
4. **Server-side rendering**: Some components may need "use client" directive
5. **Static generation**: May need to configure which pages are static vs dynamic

## Success Validation

- All 6 routes accessible and render correctly
- Development server starts without errors
- Hot reload works for component changes
- Production build completes successfully
- All components maintain styling and functionality
- Navigation works between all pages
- Static assets load correctly





