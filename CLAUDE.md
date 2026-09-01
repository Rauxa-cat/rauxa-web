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

Animations use [Motion](https://motion.dev) (`motion/react`), not CSS keyframes. The
previous scroll-driven pattern relied on `animation-timeline: view()`, which Firefox
does not support, so those reveals never ran there. The keyframes left in
`src/app/globals.css` are the services ticker marquee and the four hero aperture
ones, which belong to the first paint (see "The hero hold").

`MotionProvider` (mounted in `src/app/[locale]/layout.tsx`) wraps the app in
`LazyMotion` with `domAnimation` and `strict`. **Use `m.*`, never `motion.*`**:
`strict` throws on the latter, which is what keeps the full bundle out.

Shared easing and spring tokens live in `src/lib/motion.ts`; read from those rather
than hardcoding a curve.

Primitives in `src/components/motion/`:

| Component | Use for |
|---|---|
| `Reveal` | `RevealList` / `RevealItem` (clip-path wipe from the left), `FadeIn` |
| `MaskReveal` | Top-to-bottom mask reveal for headings |
| `Parallax` | `ParallaxScene` + `ParallaxLayer` for scroll-linked `y` / `scale` / `opacity` |
| `Stagger` | `Stagger` / `StaggerItem`, plus `staggerContainer` for non-div containers |

Button hover/press is not a Motion primitive: it lives in the base of
`buttonVariants`, gated behind `motion-safe:`, so every `<Button>` gets it for free.

Anything that clips while it moves (`RevealItem`, `MaskReveal`, `SectionHeader`,
`HeroBands`) has to stop clipping when the move lands: Motion leaves its last frame
in place, and a mask that stays on shears tall glyphs and cuts the glows callers
hang off the revealed element. `useUnclip` is the shared switch.

Motion serializes each `initial` state into the server HTML as an inline style, and
with scripts off nothing runs to clear it. Every primitive that ships hidden carries
a `NOJS` attribute (`src/lib/motion.ts`), and the root layout serves `NO_JS_CSS`
inside `<noscript>`, which is the only place it can apply. Add the attribute to any
new primitive that hides itself, or the page ships that part blank.

Two rules when adding an effect:

- **Never branch rendered output on the reduced-motion preference.** The server
  cannot know it, so a render-time branch serves one tree and hydrates another,
  and React throws the whole subtree away. `MotionProvider` sets
  `MotionConfig reducedMotion="user"`, which snaps transform and layout values
  instantly for those visitors, so write *one* set of keyframes and always give it
  an `opacity` leg: that leg is what degrades the effect to a plain fade.
  Non-transform properties (`clip-path`) need a `motion-reduce:` utility instead.
  Where the preference really has to reach render (a scroll-linked `style`, a
  class, whether a decoration mounts at all) use `@/hooks/useReducedMotion`, which
  reads `false` until hydration and then stays live; never Motion's own
  `useReducedMotion`. Pin those values to identity rather than dropping them:
  Motion stops writing a removed `style` entry but never clears what it wrote.
- **Keep sections as server components.** Animation goes in a `'use client'` child
  that receives data through props, so pages keep fetching translations on the
  server (see `GallerySection` → `GalleryStrip`).

`ParallaxScene` publishes one scroll progress to every layer beneath it, so sibling
layers share a timeline instead of each measuring its own box. Layers that translate
or zoom an image need slack around it, or the movement exposes an empty edge: the
hero photo sits in an `-inset-[6%]` bleed wrapper. Change a crop and that slack has
to move with it. A layer inside a scene must not open a scroll subscription of its
own, which is why `ParallaxLayer` splits into two components: `offset`, `container`
and `axis` only mean anything on the standalone one.

`GalleryStrip` sizes its cards entirely in CSS (`--card-w` and friends, in `svh`)
and moves the row through one unitless custom property. Nothing there is measured:
a JS fallback has to guess a viewport for the server render, and re-measuring
`innerHeight` on resize slides the strip sideways every time a mobile URL bar
collapses. Both the pinned scene and the reduced-motion strip are always rendered
and CSS picks between them, so the six viewport heights the pin needs never appear
or vanish under someone who has already been scrolled back into the page. The hidden
half costs no bytes: a lazy image that is never laid out never loads.

#### The hero hold

The hero aperture is the one entrance that is CSS and not Motion, because it belongs
to the first paint: driven from JS it would only start at hydration, and until the
bundle landed the photo band would sit frozen, which reads as a page that failed.
Every layer runs off `--hero-open` (see `globals.css`) and carries its resolved state
as its base style, so `motion-reduce` and a visitor with no JS both land on the
finished hero.

Because it starts on style resolution alone, it can spend its whole travel on an
empty frame and be over before the photo arrives. So it is paused, via
`data-hero-hold` on `<html>`, until the photo can be painted. There are **two ways
into a hero page** and both need the hold, but there is only one implementation of
it, the inline script, which publishes itself as `window.__rauxaHeroHold`:

| Entry | Arms the hold | Why the other one cannot do it |
|---|---|---|
| Cold document | the script, at parse | An effect only runs at hydration, long after the first paint. |
| Client navigation | `HeroHold` layout effect, calling back into the script | A `<script>` only executes when the parser reaches it. React creates the node without running it, and dev-warns. |

Every call joins the hold already in flight instead of arming a second one. On a
cold load the parse-time call and the hydrating provider would otherwise each run
their own `decode()` and their own stall timer, and release the photo and the copy
at different moments. Keep it that way: a second hand-written copy of the algorithm
in TypeScript is what drifted last time.

The script lives in the root layout, not in the hero, because Next does not
re-render layouts across a client navigation; move it back into `HeroAperture` and
React recreates a script node that never runs. It sits first in `<body>`, ahead of
the hero markup, so the release waits for `DOMContentLoaded` to find
`img[data-hero-photo]`. Every page therefore holds until `DOMContentLoaded`,
including the ones with no hero, where the release then fires and the
`[data-hero-hold] [data-hero-open]` rule had nothing to match anyway. On release it
marks the photo with a `heroHeld` expando, which is how the effect knows not to
re-pause an animation already halfway through. An expando rather than an attribute,
because the script runs before hydration and React treats an unexpected attribute as
a mismatch.

The attribute only reaches the CSS layers, and the copy animates on Motion, so
`HeroHoldProvider` (in `HeroSection`, wrapping both halves) publishes the same state
through context. `HeroBands` and `HeroFade` hold their `animate` target equal to
`initial` while it is set, which is what keeps the words and the photo on one beat.
The context starts held and defaults to *not* held outside a provider, so those
primitives still animate if they are ever used away from a hero.

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
