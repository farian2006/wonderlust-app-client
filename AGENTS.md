<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# WonderLust App — agent notes

Next.js 16.4.3 + React 19 App Router project (`src/app`), pure JavaScript — **no TypeScript**. `README.md` is untouched create-next-app boilerplate and is stale (points at `app/page.js`; code lives in `src/app/`); don't trust it. No tests, no CI.

## Commands

- `npm run dev` / `build` / `start` / `lint` (npm only — package-lock.json; no test/typecheck scripts exist)
- Verify changes with `npm run build`; there is no `tsc` step since the codebase is plain JS, so the build is the strongest check.
- Run `npm run lint` for a focused check; `lint` is just `eslint` (flat config in `eslint.config.mjs`).

## Conventions that differ from defaults

- **JS, not TS**: write `.js`/`.jsx`. shadcn is configured with `"tsx": false` (`components.json`), so added components come out as `.jsx`.
- **shadcn/`src/components/ui/`** uses `style: "base-nova"` wrapping **`@base-ui/react`** primitives (not Radix). Add components via `npx shadcn add <component>` rather than hand-writing them. Icons come from `lucide-react`.
- `cn` is re-exported from the `cn` package by `src/lib/utils.js` — don't rewrite it with clsx/tailwind-merge.
- Path alias `@/*` → `src/*` (`jsconfig.json`).

## Toolchain quirks

- `next.config.mjs` enables **`cacheComponents`**, `partialPrefetching`, and the **React Compiler**. With `cacheComponents`, anything reading request-time data (cookies/headers, dynamic fetches) must be wrapped in `<Suspense>` or use `"use cache"` — otherwise the build fails. With the compiler, don't hand-add `memo`/`useCallback`/`useMemo`.
- **Tailwind v4** with no `tailwind.config.js`: theme lives in CSS via Tailwind v4 directives and shadcn variables in `src/app/globals.css`; CSS is processed by the `@tailwindcss/turbopack` loader rule in `next.config.mjs`.
- Font: `Josefin_Sans` via `next/font/google` is applied on the `<html>` element in `src/app/layout.js` — new pages don't set their own fonts.
