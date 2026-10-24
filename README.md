# ACB Document Processing Services — Landing Page

Single-page marketing site (TypeScript + React + Tailwind CSS v4) with a **Supabase CMS** at `/admin`.

## Run locally

```bash
npm install
npm run dev
```

- Site: `http://localhost:5173`
- Admin: `http://localhost:5173/admin`

## Supabase CMS setup

1. Create a project at [supabase.com](https://supabase.com).
2. In **SQL Editor**, run the script in `supabase/schema.sql`.
3. Enable **Email** provider under Authentication → Providers.
4. Create an admin user: Authentication → Users → Add user (email + password).
5. Copy **Project URL** and **anon public** key into `.env`:

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

6. Restart `npm run dev`.
7. Sign in at `/admin`, click **Seed defaults** once to load current site copy into the database.
8. Edit sections and **Save section**. Upload images via file inputs (stored in the `media` bucket).

Without `.env`, the site still runs using built-in defaults from `src/data/cmsDefaults.ts` (not editable via admin).

## Build

```bash
npm run build
```

Deploy `dist/` to any static host. Set the same `VITE_*` env vars at build time so the live site reads CMS content.

### Vercel

- Framework preset: **Vite** (or leave **Other** — `vercel.json` sets `buildCommand` and `outputDirectory`).
- **Settings → General → Build & Development Settings**: if overrides exist, set **Output Directory** to `dist` or remove overrides so `vercel.json` applies.
- Add environment variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_SITE_URL` (then **Redeploy**).
- After deploy, open **`/admin/`** (trailing slash) or **`/admin`** (redirects). Build creates `dist/admin/index.html` for direct `/admin/` access.
- If `/admin` still 404s: confirm the latest commit includes `vercel.json`, `scripts/postbuild-spa.mjs`, and check the deployment **Build Logs** for `Created dist/admin/index.html`.

### Share preview (Open Graph)

- Banner image: `public/og-image.jpg` (used when links are shared on Facebook, Messenger, LinkedIn, X, etc.).
- Before production build, set **`VITE_SITE_URL`** in `.env` to your live URL (no trailing slash), e.g. `https://yourname.github.io/acb`.
- Run `npm run build` so `index.html` gets the correct absolute `og:image` URL.
- Test: [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) or [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/).

## Content structure

All editable content is defined in `src/types/cms.ts` and defaults in `src/data/cmsDefaults.ts`. Legacy files under `src/data/*.ts` feed the default seed only.
