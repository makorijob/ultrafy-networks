# Ultrafy Networks Website

Full-stack Next.js site for Ultrafy Networks (Thika) — public site + a password-protected admin panel that manages every dynamic section: hero slides, services ("What We Offer"), internet packages, career openings, testimonials, investment opportunities, and contact form submissions. Images are uploaded straight to Cloudinary from the admin panel.

## Tech stack
- **Next.js 14** (App Router, TypeScript)
- **Prisma + SQLite** for the database (swap `DATABASE_URL` for Postgres/MySQL in production — no code changes needed)
- **Tailwind CSS** for styling (glass-morphism theme in green / blue / red on white)
- **Cloudinary** for image hosting/uploads

## 1. Install dependencies
```bash
npm install
```

## 2. Configure environment variables
Copy `.env.example` to `.env` and fill in real values:
```bash
cp .env.example .env
```

- `DATABASE_URL` — leave as `file:./dev.db` for SQLite, or point at a Postgres/MySQL connection string for production.
- `ADMIN_PASSWORD` — the password used to log into `/admin`.
- `SESSION_SECRET` — any long random string (used to sign the admin session cookie).
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — from your [Cloudinary dashboard](https://console.cloudinary.com/). Free tier is enough to start.

## 3. Set up the database
```bash
npx prisma db push     # creates the SQLite database file with all tables
npm run db:seed        # optional: adds sample hero slides, packages, offerings, etc.
```

## 4. Run it
```bash
npm run dev
```
- Public site: http://localhost:3000
- Admin panel: http://localhost:3000/admin/login (log in with `ADMIN_PASSWORD`)

## Deploying
This app needs a Node.js server (not static export) because of the API routes, Prisma, and file uploads to Cloudinary. It deploys cleanly to:
- **Vercel** (recommended) — set the environment variables above in Project Settings, and use a hosted Postgres database (e.g. Vercel Postgres, Neon, Supabase) instead of SQLite, since serverless filesystems are read-only/ephemeral.
- Any VPS/Docker host — `npm run build && npm start`.

If you switch databases, update `provider` in `prisma/schema.prisma` (e.g. `"postgresql"`) and run `npx prisma db push` again.

## What the admin panel controls
| Section on site | Admin page |
|---|---|
| Hero slider images/titles | Hero Slides |
| "What We Offer" grid (CCTV, fiber, solar, etc.) | What We Offer |
| Internet package cards (speed/price/1-month-free) | Packages |
| Careers section | Careers |
| Client testimonials | Testimonials |
| Invest / partnership section | Invest Options |
| Messages from the site's contact form | Contact Messages |

## Contact details shown on the site
- Phone / WhatsApp: 0703 199 691
- Email: info.ultrafynetworks@gmail.com
- Location: Thika, Kenya
