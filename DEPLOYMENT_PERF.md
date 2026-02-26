# Monginis Export – Deployment & Performance Plan (Vercel + Render)

This repo was updated **without touching UI layout or backend business logic**. Changes are limited to:
- i18n text coverage for **EN / FR / AR** (Navbar, Hero product names/tags, Download Brochure section)
- Added favicon: `public/favicon.png` + `<link rel="icon"...>` in `index.html`
- Production deployment configs:
  - `vercel.json` (caching headers + SPA rewrite)
  - `render.yaml` (Render service definition)
- Frontend build config improvement (no visual change):
  - Removed `vite-plugin-singlefile` usage to enable chunking + long-term caching
  - Added Rollup `manualChunks` vendor splitting

---

## A) Audit checklist (what to verify)

### Frontend (Vite/React)
- Bundle size & chunking (vendor chunk present, no single huge inline bundle)
- Long-term caching for hashed assets (`/assets/*` immutable)
- Image delivery:
  - Images are served with caching headers
  - No images accidentally inlined into JS/HTML
- Runtime:
  - No long tasks during scroll (Chrome Performance panel)
  - No layout shifts from late-loading images (CLS)
- Lighthouse:
  - LCP element identified (likely Hero image), confirm it’s cached & fast
  - TBT/INP (no main-thread freezes)

### Backend (Express on Render)
- Health check: `/api/health` returns 200
- CORS: production Vercel domain(s) included
- Response compression:
  - Render/Proxy gzip enabled (verify `content-encoding: br/gzip` for JSON)
- Timeouts & keep-alive:
  - Ensure platform/router timeouts are not exceeded
- Logs:
  - Error rates, request latency, Prisma errors

### Database (PostgreSQL + Prisma)
- Connection count (avoid spikes / “too many clients”)
- Prisma client generation in build step
- Migration strategy (use `prisma migrate deploy` in CI when you choose, not required here)
- Pooling:
  - Prefer PgBouncer / pooled connection URL if available

---

## B) Deployment configuration plan

### Vercel (frontend)
**Recommended settings**
- Framework: Vite (auto-detected)
- Build Command: `npm ci && npm run build`
- Output: `dist`
- Env vars:
  - `VITE_API_URL` = your Render backend URL (e.g. `https://<service>.onrender.com`)

**Caching**
- `vercel.json` adds:
  - Immutable caching for hashed assets
  - Reasonable caching for images (7 days + SWR)
  - `must-revalidate` for `/` HTML

### Render (backend)
Use `render.yaml` or configure in dashboard:
- Root directory: `server`
- Build: `npm ci && npx prisma generate`
- Start: `npm start`
- Health check path: `/api/health`

**Env vars (Render Dashboard)**
- `DATABASE_URL` (prefer pooled URL if your provider supports it)
- Any email/SMTP vars you already use (don’t commit secrets)

---

## C) Image performance plan (no UI changes)

### CDN strategy (no code change required)
- **Vercel** serves static assets from its edge network automatically.
- Ensure all large images are stored in `public/assets/*` and referenced as they are now.

### Caching headers
- Hashed build assets: `Cache-Control: public, max-age=31536000, immutable`
- Public images: `Cache-Control: public, max-age=604800, stale-while-revalidate=86400`

### Prevent large payloads (build-time only, optional)
If you want further gains **without visual changes**:
- Keep the same dimensions and quality, but convert originals to:
  - `webp` (and keep the same displayed size)
- Do it only once on source images (manual or scripted), then keep filenames stable.

---

## D) Concrete config files added

- `vercel.json` (caching + rewrite)
- `render.yaml` (Render backend service)
- `vite.config.ts` (vendor chunk splitting; removed singlefile plugin usage)

---

## E) Scaling & stability (Render)
- Start with **Starter** (or equivalent) for MVP.
- Upgrade if you see:
  - sustained CPU > 70%
  - memory pressure
  - cold-start latency affecting UX

**Health checks**
- `/api/health` already exists.

**Prisma connection spikes**
- Use pooled `DATABASE_URL` (PgBouncer) when available.
- Avoid multiple Render instances if your DB has low connection limits.

**Monitoring**
- Render logs + Postgres metrics (connections, CPU, IO)
- Vercel Analytics / Web Vitals (LCP/INP/CLS)

---

## F) Verification plan (post-deploy)
1. Open DevTools → Network:
   - First load: confirm assets are served with cache headers
   - Reload: most assets should be `from disk cache` / `304` minimal
2. Lighthouse (mobile + desktop):
   - Compare before/after: Performance, LCP, INP/TBT
3. Scroll test on mid-range device:
   - Ensure no long frames / no freezing
4. Backend:
   - Hit `/api/health` and key POST routes, confirm latency stable
5. DB:
   - Check active connections during traffic spikes

---

## Common pitfalls + fixes
- **Vercel SPA routing**: handled by `vercel.json` rewrite.
- **Render cold starts**: keep plan warm, avoid sleeping on free tiers.
- **Prisma “too many connections”**: use pooled DB URL and keep instance count aligned with DB limits.
- **Images not cached**: confirm `vercel.json` headers are applied and images are not served from a different path.
