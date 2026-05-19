# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Rauxa (`rauxa.cat`) is the website for **RAUXA**, a gastronomic and cultural community based in Barcelona. They organize experiential events where gastronomy, music, and art converge — their own branded dinners (*Cenas RAUXA*), private dinners, full event production, catering, DJ services, and brand collaborations.

The site is a Next.js 15 app with two locales — **`es`** (default) and **`ca`** (Catalan) — deployed to Vercel. Service bookings go through external Typeform forms (URLs defined in `src/lib/content/services.ts`). Contact email is `info@rauxa.cat`.

## Commands

```bash
pnpm dev        # start dev server
pnpm build      # production build
pnpm lint       # eslint
pnpm format     # prettier --write .
```

No test suite is configured.

## Architecture

### Routing & i18n

All pages live under `src/app/[locale]/`. Locale detection and redirect is handled by the middleware at `src/proxy.ts` (exported as `middleware`). Localized pathnames are defined in `src/i18n/routing.ts` — e.g. `/services` → `/es/servicios` or `/ca/serveis`. When adding a new page, register its localized paths there.

Navigation and links must use `@/i18n/navigation` (`Link`, `useRouter`, etc.) — never Next.js's built-in ones — so locale is preserved automatically.

### Layout layers

Two nested layouts:
- `src/app/layout.tsx` — sets `<html lang>`, loads the three custom fonts, mounts `<Analytics>` and `<SpeedInsights>`.
- `src/app/[locale]/layout.tsx` — wraps everything in `<NextIntlClientProvider>`, renders `<SiteHeader>`, `<Footer>`, and `<Toaster>`.

### Fonts

Three CSS variables are available globally:
- `--font-rauxa-primary` → AlfredinoSemirounded (brand/headings)
- `--font-rauxa-secondary` → VT323 (accent)
- `--font-rauxa-body-inter` → Inter (body text)

### Translations

Translation strings live in `messages/es.json` and `messages/ca.json`. Server components use `getTranslations()`; client components use `useTranslations()`. Error message keys in `contactSchema` (e.g. `'errors.name.tooShort'`) map directly to translation keys and are resolved in the form component.

### Component structure

```
src/components/
  ui/          # shadcn/ui primitives (do not edit directly)
  site/        # Header, Footer, Nav, Logo, LanguageSelector
  sections/    # per-page section components
  icons/       # custom SVG icon components
```

Static content (nav links, services, team members) is defined as data in `src/lib/content/`.

### Animations

Reusable Framer Motion variants live in `src/lib/animations.ts` (`fadeInUp`, `staggerContainer`, `staggerItem`, etc.). Use these rather than inline variants to stay consistent.

### Contact form flow

`ContactForm` (client) → `useContactSubmit` hook → `POST /api/contact` → rate-limit check (Upstash Redis, 5 req / 10 min sliding window per IP) → Zod validation → Brevo transactional email via `BREVO_CONTACT_TEMPLATE_ID`.

The `company` field is a honeypot: if it's filled in, the API silently returns `200 OK` without sending an email.

### Metadata

Use `generatePageMetadata()` from `src/lib/metadata.ts` for per-page SEO. It handles canonical URLs and `hreflang` alternates for both locales automatically.

### Cron

`/api/cron/keep-alive` runs daily (see `vercel.json`) to keep the Upstash Redis instance warm. It is secured with a `Bearer` token from `CRON_SECRET`.

### Required environment variables

```
BREVO_API_KEY
BREVO_CONTACT_TEMPLATE_ID
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
CRON_SECRET
```

## Skills

Skills are in `.claude/skills/`. Read the relevant skill file before starting work on tasks that match — don't skip this step.

| When working on… | Read this skill |
|---|---|
| React components, data fetching, performance, bundle size | `.claude/skills/react-best-practices/SKILL.md` |
| Next.js file conventions, RSC boundaries, routing, metadata | `.claude/skills/next-best-practices/SKILL.md` |
| Next.js caching, `unstable_cache`, revalidation | `.claude/skills/next-cache-components/SKILL.md` |
| Tailwind CSS, responsive design, layout | `.claude/skills/tailwind-css-patterns/SKILL.md` |
| TypeScript types, generics, utility types | `.claude/skills/typescript-advanced-types/SKILL.md` |
| Forms with react-hook-form | `.claude/skills/react-hook-form/SKILL.md` |
| Component composition, patterns, abstractions | `.claude/skills/composition-patterns/SKILL.md` |
| UI design, visual design decisions | `.claude/skills/frontend-design/SKILL.md` |
| Accessibility (a11y) | `.claude/skills/accessibility/SKILL.md` |
| SEO, Open Graph, structured data | `.claude/skills/seo/SKILL.md` |
| API routes, server actions, Node.js backend | `.claude/skills/nodejs-backend-patterns/SKILL.md` |
| Node.js general best practices | `.claude/skills/nodejs-best-practices/SKILL.md` |
| Deploying to Vercel, vercel.json, env vars | `.claude/skills/deploy-to-vercel/SKILL.md` |
| Upgrading Next.js | `.claude/skills/next-upgrade/SKILL.md` |
