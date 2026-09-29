# Implementation Plan: Frontend Migration from CRACO to Vite

Migrate the SunMac Solar frontend from the deprecated **Create React App (CRA) + CRACO** toolchain to **Vite**, purge legacy/redundant dependencies, and establish a high-performance foundation for the upcoming full visual design revamp without breaking any existing functionality.

---

## 1. Problem Statement & Scope

### Current Pain Points
* **Deprecated Toolchain:** The application runs React 19 on top of `react-scripts 5.0.1` and `@craco/craco 7.1.0`. CRA is officially deprecated by the React team and causes sluggish cold starts (15-30s) and slow hot module replacement (HMR).
* **Legacy Artifacts:** Residual scaffolding packages and scripts (`@emergentbase/visual-edits`, `cra-template`, `plugins/health-check`, Babel polyfills) add noise and unnecessary bundle weight.
* **Redundant Dependencies:** Duplicated libraries (`swr` alongside `@tanstack/react-query`, `dayjs` alongside `date-fns`) inflate the dependency tree.

### Core Objective
Modernize the build pipeline to **Vite** while guaranteeing **zero functional or visual regressions** across all 11 existing pages, routing, animations, forms, calculations, and backend API integrations.

---

## 2. Dependency Audit & Changes

### Packages to Remove
| Package | Type | Rationale |
| :--- | :--- | :--- |
| `@craco/craco` | devDependency | Replaced by native Vite configuration |
| `react-scripts` | dependency | Deprecated CRA bundler being replaced |
| `cra-template` | dependency | Legacy template dependency |
| `@babel/plugin-proposal-private-property-in-object` | devDependency | Unnecessary CRA Babel override |
| `@emergentbase/visual-edits` | devDependency | Legacy template dev visual editor |
| `swr` | dependency | Redundant; TanStack React Query v5 is already the active data layer |
| `dayjs` | dependency | Redundant; `date-fns` is already used for date formatting |

### Packages to Install
| Package | Version | Purpose |
| :--- | :--- | :--- |
| `vite` | `^6.0.0` or `^5.4.0` | Fast next-generation frontend build tool |
| `@vitejs/plugin-react` | Latest | Official React Fast Refresh plugin for Vite |

---

## 3. Detailed Migration Steps

### Step 1: Clean Up Legacy Files & Dependencies
1. Run uninstall commands in `frontend/` to remove `@craco/craco`, `react-scripts`, `cra-template`, `@babel/plugin-proposal-private-property-in-object`, `@emergentbase/visual-edits`, `swr`, and `dayjs`.
2. Delete [frontend/craco.config.js](file:///c:/Users/Admin/sunmacsolar/frontend/craco.config.js).
3. Delete the `frontend/plugins/health-check/` directory (only used conditionally by CRACO).
4. Install `vite` and `@vitejs/plugin-react`.

### Step 2: Create Vite Configuration (`frontend/vite.config.js`)
Create [frontend/vite.config.js](file:///c:/Users/Admin/sunmacsolar/frontend/vite.config.js) configured to preserve the existing port (`3000`), path alias (`@/`), and output directory (`build`):

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    open: false,
  },
  build: {
    outDir: "build",
    sourcemap: true,
  },
});
```

### Step 3: Relocate & Clean `index.html`
1. Move [frontend/public/index.html](file:///c:/Users/Admin/sunmacsolar/frontend/public/index.html) to **`frontend/index.html`** (Vite requires `index.html` at the project root).
2. Clean up template artifacts from `frontend/index.html`:
   * Remove `<script src="https://assets.emergent.sh/scripts/emergent-main.js">`.
   * Remove the `DataCloneError` error handler snippet.
   * Update `<title>` to `SunMac Solar | Commercial & Off-Grid Solar Australia`.
   * Retain Google Fonts preconnect tags and PostHog analytics snippet.
3. Inject the module script tag directly before `</body>`:
   ```html
   <script type="module" src="/src/index.jsx"></script>
   ```

### Step 4: Rename Entry Points for Vite JSX Support
Vite's Fast Refresh transform requires files containing JSX syntax to have the `.jsx` or `.tsx` extension:
1. Rename `frontend/src/index.js` &rarr; `frontend/src/index.jsx`
2. Rename `frontend/src/App.js` &rarr; `frontend/src/App.jsx`
*(Note: All other UI components in `src/pages/` and `src/components/` already use `.jsx`).*

### Step 5: Environment Variables & API Compatibility Bridge
1. Update [frontend/.env](file:///c:/Users/Admin/sunmacsolar/frontend/.env) to declare Vite variables while maintaining legacy fallbacks:
   ```env
   VITE_BACKEND_URL=http://localhost:8000
   REACT_APP_BACKEND_URL=http://localhost:8000
   ```
2. Update [frontend/src/lib/api.js](file:///c:/Users/Admin/sunmacsolar/frontend/src/lib/api.js) to resolve the backend URL with full cross-environment compatibility:
   ```javascript
   import axios from "axios";

   const BACKEND_URL =
     (typeof import.meta !== "undefined" && import.meta.env?.VITE_BACKEND_URL) ||
     process.env.REACT_APP_BACKEND_URL ||
     "http://localhost:8000";

   export const API = `${BACKEND_URL}/api`;

   export const api = axios.create({
     baseURL: API,
     headers: { "Content-Type": "application/json" },
   });
   ```

### Step 6: Update `package.json` Scripts
Update [frontend/package.json](file:///c:/Users/Admin/sunmacsolar/frontend/package.json):
```json
"scripts": {
  "start": "vite",
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```
Update root [package.json](file:///c:/Users/Admin/sunmacsolar/package.json):
```json
"scripts": {
  "start": "yarn --cwd frontend start",
  "dev": "yarn --cwd frontend dev",
  "build": "yarn --cwd frontend build",
  "preview": "yarn --cwd frontend preview"
}
```

---

## 4. Verification & Testing Matrix

To confirm zero regressions after the migration:

| Test Item | Target Functionality | Verification Criteria |
| :--- | :--- | :--- |
| **Dev Server** | `yarn start` | Vite server boots on `http://localhost:3000` with no build errors |
| **HMR** | File edit in `src/pages/Home.jsx` | Updates in browser instantly without full page refresh |
| **Typography & Tokens** | Google Fonts (*Outfit* & *Manrope*), Tailwind colors | Warm palette (`#FDFBF7`), amber accents, fonts apply correctly |
| **Route Integrity** | All 11 navigation endpoints | `/`, `/products`, `/projects`, `/projects/:slug`, `/savings`, `/about`, `/blog`, `/blog/:slug`, `/ppa`, `/contact`, `/admin/leads` render cleanly |
| **Calculators & Charts** | `/savings` page | Recharts render interactive ROI graphs, sliders adjust dynamically |
| **Interactive Widgets** | Joey Mascot Chat (`JoeyChat.jsx`) | Floating chat widget expands, steps through questions, captures lead |
| **Form Submissions** | Contact & PPA Forms | POST requests to `/api/leads` and `/api/ppa-inquiries` succeed, Sonner toasts show success |
| **Production Build** | `yarn build` | Produces production-ready bundle in `frontend/build/` without errors |

---

## 5. Transition Path to Next.js (Strategic Roadmap)

1. **Why Vite first:** Moving to Vite right now requires **zero refactoring** of existing `react-router-dom` routes, client-side hooks, Recharts, or forms. It delivers an immediate 10x developer experience improvement and eliminates CRACO risk immediately.
2. **Next.js Transition Readiness:** Once the visual design revamp is completed on this clean codebase:
   * Reusable UI components in `src/components/ui/` and `src/components/site/` are already modular shadcn/Radix components ready for Next.js.
   * Pages can easily be migrated to the Next.js App Router (`app/(site)/...`) by adding `"use client"` where client interactivity is required.
