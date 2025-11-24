# Tasks: Next.js Migration

**Input**: Design documents from `/specs/001-nextjs-migration/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

**Tests**: Manual testing and validation tasks included for migration verification.

**Organization**: Tasks are organized by migration phases, with each phase building on the previous one. User story validation is integrated throughout.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task validates (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup Next.js Foundation

**Purpose**: Install Next.js and configure the build system

- [ ] T001 Install Next.js and update dependencies in `package.json`
- [ ] T002 [P] Create `next.config.ts` with basic configuration
- [ ] T003 [P] Update `tsconfig.json` for Next.js compatibility
- [ ] T004 [P] Configure Tailwind CSS for Next.js in `tailwind.config.ts`
- [ ] T005 [P] Update `postcss.config.js` for Next.js
- [ ] T006 Update `package.json` scripts (dev, build, start)
- [ ] T007 Create `.env.local` template if needed for environment variables

**Checkpoint**: Next.js is installed and configured, ready for project structure migration

---

## Phase 2: Migrate Project Structure

**Purpose**: Reorganize files from Vite structure to Next.js structure

- [ ] T008 Create `app/` directory at repository root
- [ ] T009 [P] Create `app/layout.tsx` root layout component
- [ ] T010 [P] Move components from `client/src/components/` to root `components/` directory
- [ ] T011 [P] Move `client/src/lib/` to root `lib/` directory
- [ ] T012 [P] Move static assets from `client/public/` to root `public/` directory
- [ ] T013 Update all import paths that reference `@/` alias to work with new structure
- [ ] T014 Update path aliases in `tsconfig.json` for Next.js conventions

**Checkpoint**: Project structure matches Next.js conventions, components and assets are in correct locations

---

## Phase 3: Convert Routing System [US1]

**Purpose**: Replace Wouter routing with Next.js App Router

**Goal**: All existing routes work with Next.js routing system

**Independent Test**: Navigate to all 6 routes and verify pages load correctly

- [ ] T015 [US1] Create `app/page.tsx` for home route (/) from `client/src/pages/home.tsx`
- [ ] T016 [P] [US1] Create `app/events/page.tsx` from `client/src/pages/events.tsx`
- [ ] T017 [P] [US1] Create `app/sermons/page.tsx` from `client/src/pages/sermons.tsx`
- [ ] T018 [P] [US1] Create `app/about/page.tsx` from `client/src/pages/about.tsx`
- [ ] T019 [P] [US1] Create `app/resources/page.tsx` from `client/src/pages/resources.tsx`
- [ ] T020 [P] [US1] Create `app/merch/page.tsx` from `client/src/pages/merch.tsx`
- [ ] T021 [US1] Create `app/not-found.tsx` from `client/src/pages/not-found.tsx`
- [ ] T022 [US1] Remove Wouter dependency from `package.json`
- [ ] T023 [US1] Update `components/layout/navbar.tsx` to use Next.js `Link` component instead of Wouter
- [ ] T024 [US1] Remove `App.tsx` router component (no longer needed)
- [ ] T025 [US1] Update root layout to include providers (QueryClientProvider, TooltipProvider, Toaster)

**Checkpoint**: All routes accessible via Next.js routing, navigation works between pages

---

## Phase 4: Migrate Root Layout and Providers [US1]

**Purpose**: Set up Next.js root layout with all necessary providers

**Goal**: Application providers and global components work correctly

**Independent Test**: Verify React Query, tooltips, and toasts work on any page

- [ ] T026 [US1] Create `app/layout.tsx` with metadata configuration
- [ ] T027 [US1] Add QueryClientProvider to root layout
- [ ] T028 [US1] Add TooltipProvider to root layout
- [ ] T029 [US1] Add Toaster component to root layout
- [ ] T030 [US1] Import global CSS (`index.css`) in root layout
- [ ] T031 [US1] Add "use client" directive where needed for client components
- [ ] T032 [US1] Remove `client/src/main.tsx` (entry point no longer needed)

**Checkpoint**: Root layout configured, all providers working, global styles applied

---

## Phase 5: Update Component Imports and Paths [US1]

**Purpose**: Fix all import paths to work with new Next.js structure

**Goal**: All components import correctly without path errors

**Independent Test**: Build succeeds without import errors, all components render

- [ ] T033 [P] [US1] Update imports in all page components to use new paths
- [ ] T034 [P] [US1] Update imports in `components/layout/navbar.tsx`
- [ ] T035 [P] [US1] Update imports in all section components
- [ ] T036 [P] [US1] Update imports in UI components (if they reference each other)
- [ ] T037 [US1] Update `lib/queryClient.ts` imports if needed
- [ ] T038 [US1] Update `lib/utils.ts` imports if needed
- [ ] T039 [US1] Fix any asset imports (images, fonts) to use Next.js conventions

**Checkpoint**: All imports resolve correctly, TypeScript compilation succeeds

---

## Phase 6: Migrate Server/API Infrastructure [US3]

**Purpose**: Convert Express server setup to Next.js (if API routes exist)

**Goal**: Any API functionality works through Next.js API routes

**Independent Test**: API endpoints respond correctly (if any exist)

- [ ] T040 [US3] Review `server/routes.ts` to identify any API routes
- [ ] T041 [US3] Create `app/api/` directory structure if API routes needed
- [ ] T042 [US3] Convert Express API routes to Next.js route handlers (if applicable)
- [ ] T043 [US3] Update database/storage access for Next.js server components
- [ ] T044 [US3] Remove Express server files (`server/app.ts`, `server/index-dev.ts`, `server/index-prod.ts`)
- [ ] T045 [US3] Remove Express dependency if no longer needed
- [ ] T046 [US3] Keep `server/storage.ts` and `shared/schema.ts` (still needed for database)

**Checkpoint**: API routes migrated (if any), server infrastructure converted to Next.js

---

## Phase 7: Remove Vite Build System [US2]

**Purpose**: Remove Vite configuration and dependencies

**Goal**: Build system fully uses Next.js, no Vite remnants

**Independent Test**: Development server starts with `next dev`, build works with `next build`

- [ ] T047 [US2] Remove `vite.config.ts`
- [ ] T048 [US2] Remove `vite-plugin-meta-images.ts` or create Next.js alternative
- [ ] T049 [US2] Remove Vite dependencies from `package.json` (vite, @vitejs/plugin-react)
- [ ] T050 [US2] Remove Replit Vite plugins from `package.json` (@replit/vite-plugin-*)
- [ ] T051 [US2] Remove `client/index.html` (Next.js generates HTML)
- [ ] T052 [US2] Remove `client/src/main.tsx` (already removed in Phase 4)
- [ ] T053 [US2] Clean up any Vite-specific configuration

**Checkpoint**: Vite completely removed, Next.js is the only build system

---

## Phase 8: Static Assets and Public Files [US4]

**Purpose**: Ensure all static assets work correctly in Next.js

**Goal**: All images, fonts, and public files load correctly

**Independent Test**: All assets display on their respective pages

- [ ] T054 [US4] Verify `public/favicon.png` is accessible
- [ ] T055 [US4] Update any image imports to use Next.js Image component or public paths
- [ ] T056 [US4] Verify Google Fonts load correctly (check `app/layout.tsx`)
- [ ] T057 [US4] Check all asset references in components work with new paths
- [ ] T058 [US4] Verify meta images and Open Graph assets work

**Checkpoint**: All static assets load correctly, no broken images or missing files

---

## Phase 9: Component Client/Server Boundaries [US1]

**Purpose**: Add "use client" directives where needed for interactivity

**Goal**: Client components work correctly, server components render properly

**Independent Test**: Interactive components work, pages render without hydration errors

- [ ] T059 [US1] Identify components that need "use client" (useState, useEffect, event handlers)
- [ ] T060 [P] [US1] Add "use client" to interactive UI components
- [ ] T061 [P] [US1] Add "use client" to page components that use hooks
- [ ] T062 [US1] Ensure layout components have correct client/server boundaries
- [ ] T063 [US1] Test that server components can import client components correctly

**Checkpoint**: Client/server boundaries correctly defined, no hydration errors

---

## Phase 10: Testing & Validation [US1, US2, US3, US4]

**Purpose**: Comprehensive testing of migrated application

**Goal**: All functionality works identically to original Vite implementation

### Development Server Testing [US2]

- [ ] T064 [US2] Start development server with `npm run dev`
- [ ] T065 [US2] Verify server starts without errors
- [ ] T066 [US2] Test hot reload by making a component change
- [ ] T067 [US2] Verify hot reload updates appear in browser within 2 seconds

### Route Testing [US1]

- [ ] T068 [US1] Navigate to home page (/) and verify content renders
- [ ] T069 [US1] Navigate to /events and verify page loads
- [ ] T070 [US1] Navigate to /sermons and verify page loads
- [ ] T071 [US1] Navigate to /about and verify page loads
- [ ] T072 [US1] Navigate to /resources and verify page loads
- [ ] T073 [US1] Navigate to /merch and verify page loads
- [ ] T074 [US1] Test 404 page by visiting non-existent route
- [ ] T075 [US1] Test navigation between pages using navbar links

### Component Testing [US1]

- [ ] T076 [US1] Verify all UI components render correctly (buttons, dialogs, forms, etc.)
- [ ] T077 [US1] Test interactive components (accordions, carousels, etc.)
- [ ] T078 [US1] Verify React Query data fetching works (if used)
- [ ] T079 [US1] Test tooltips and toast notifications
- [ ] T080 [US1] Verify all section components (hero, carousel, grid, collage) display

### Styling Testing [US1]

- [ ] T081 [US1] Verify Tailwind CSS styles apply correctly
- [ ] T082 [US1] Check responsive design works on different screen sizes
- [ ] T083 [US1] Verify fonts load correctly (Oswald, Inter, Libre Baskerville)
- [ ] T084 [US1] Compare visual appearance with original implementation

### Production Build Testing [US2]

- [ ] T085 [US2] Run `npm run build` and verify build completes successfully
- [ ] T086 [US2] Check for build warnings or errors
- [ ] T087 [US2] Verify build output is generated in `.next/` directory
- [ ] T088 [US2] Start production server with `npm run start`
- [ ] T089 [US2] Test all routes in production mode
- [ ] T090 [US2] Verify production build performance

### API Testing [US3] (if applicable)

- [ ] T091 [US3] Test API routes if any were migrated
- [ ] T092 [US3] Verify API responses match expected format
- [ ] T093 [US3] Test error handling in API routes

### Static Assets Testing [US4]

- [ ] T094 [US4] Verify favicon displays in browser tab
- [ ] T095 [US4] Check all images load on their respective pages
- [ ] T096 [US4] Verify public file access works

**Checkpoint**: All tests pass, application functions identically to original

---

## Phase 11: Cleanup and Finalization

**Purpose**: Remove unused files and finalize migration

- [ ] T097 Remove `client/` directory (if completely migrated)
- [ ] T098 Remove `server/` directory Express files (keep storage.ts if needed elsewhere)
- [ ] T099 Update `.gitignore` for Next.js (add `.next/`, `out/`)
- [ ] T100 Verify no references to old Vite/Wouter/Express code remain
- [ ] T101 Update README.md with new Next.js instructions (if exists)
- [ ] T102 Clean up unused dependencies in `package.json`
- [ ] T103 Run `npm install` to ensure clean dependency tree
- [ ] T104 Final TypeScript type check (`npm run check`)

**Checkpoint**: Migration complete, codebase clean, ready for production

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies - can start immediately
- **Phase 2 (Structure)**: Depends on Phase 1 - must have Next.js installed
- **Phase 3 (Routing)**: Depends on Phase 2 - needs components moved first
- **Phase 4 (Layout)**: Depends on Phase 2 - needs components structure
- **Phase 5 (Imports)**: Depends on Phases 2, 3, 4 - needs new structure in place
- **Phase 6 (API)**: Can run in parallel with Phases 3-5 if no dependencies
- **Phase 7 (Remove Vite)**: Depends on Phases 3-5 being complete - must have Next.js working first
- **Phase 8 (Assets)**: Depends on Phase 2 - needs public directory moved
- **Phase 9 (Client/Server)**: Depends on Phase 3 - needs pages created
- **Phase 10 (Testing)**: Depends on all previous phases - final validation
- **Phase 11 (Cleanup)**: Depends on Phase 10 - only after everything works

### Parallel Opportunities

- Phases 2-4 can have parallel tasks within each phase (marked [P])
- Phase 6 (API) can run in parallel with Phases 3-5 if no cross-dependencies
- Phase 8 (Assets) can run in parallel with Phases 3-5
- Testing tasks within Phase 10 can be done in parallel

### Critical Path

1. Phase 1 (Setup) → Must complete first
2. Phase 2 (Structure) → Blocks routing and layout work
3. Phase 3 (Routing) + Phase 4 (Layout) → Can run in parallel after Phase 2
4. Phase 5 (Imports) → Must complete after Phases 3-4
5. Phase 7 (Remove Vite) → Must wait until Next.js fully working
6. Phase 10 (Testing) → Final validation before cleanup
7. Phase 11 (Cleanup) → Final step

---

## Implementation Strategy

### Sequential Migration (Recommended)

1. Complete Phase 1: Setup Next.js foundation
2. Complete Phase 2: Migrate project structure
3. Complete Phases 3-5: Get basic routing working
4. **STOP and VALIDATE**: Verify at least one route works
5. Complete remaining phases incrementally
6. Final testing and cleanup

### Incremental Validation

- After Phase 3: Test one route works
- After Phase 5: Test all routes work
- After Phase 7: Verify build system works
- After Phase 10: Full application validation
- After Phase 11: Migration complete

---

## Notes

- [P] tasks = different files, no dependencies, can run simultaneously
- [Story] label maps task to user story for traceability (US1=Functionality, US2=Build/Dev, US3=API, US4=Assets)
- Test incrementally after each major phase
- Keep old Vite code until Next.js is fully working (safety backup)
- Commit after each phase completion for easy rollback
- Verify each checkpoint before proceeding to next phase

