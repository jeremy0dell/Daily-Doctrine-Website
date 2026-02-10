# Daily Doctrine Website

Marketing website for the Daily Doctrine iOS app. Dark, refined, editorial aesthetic — NOT generic startup landing page energy.

## Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Plain CSS (no Tailwind) — CSS custom properties for tokens
- **Hosting:** Vercel
- **Domain:** dailydoctrine.xyz
- **OG Images:** `@vercel/og` (Satori) for dynamic share cards

## Brand Identity

The app delivers daily wisdom quotes (Stoic philosophy, Scripture, discipline). The brand is **quiet authority** — think leather-bound journal, not motivational poster. Dark, warm, serif-forward.

### Design Direction

- **Tone:** Refined minimalism. Editorial. Like a premium book publisher's website.
- **Theme:** Dark-first (the iOS app is OLED black). The website should feel like an extension of the app.
- **Typography:** Georgia for display/quotes (matches the app icon). System sans-serif for UI text. Do NOT use Inter, Roboto, or Space Grotesk.
- **Key differentiator:** The quotes themselves are the hero. Let them breathe. Generous whitespace, large serif type, minimal chrome.

### Color Tokens (CSS Custom Properties)

Use `WebsiteAssets/tokens/colors.css` — these are extracted from the iOS app's `DesignSystem/Theme.swift`:

```css
--dd-bg-primary: #000000;        /* Root background */
--dd-bg-secondary: #141414;      /* Cards, sections */
--dd-bg-tertiary: #1F1F1F;       /* Nested elements */
--dd-bg-elevated: #242424;       /* Modals, popovers */
--dd-text-primary: #F2F2F2;      /* Headings, body */
--dd-text-secondary: #999999;    /* Captions, metadata */
--dd-accent: #D9BF8C;            /* Gold accent — CTAs, links, highlights */
--dd-accent-muted: rgba(217, 191, 140, 0.30);
--dd-pro-badge: #E6B34D;         /* Premium badge */
--dd-icon-bg: #0D0D14;           /* Brand mark background */
--dd-icon-text: #F2E6CC;         /* Brand mark cream */
```

### Typography Tokens

```css
--dd-font-ui: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif;
--dd-font-serif: Georgia, "Times New Roman", "Noto Serif", serif;
```

| Style | Size | Weight | Notes |
|-------|------|--------|-------|
| Hero quote | 28px | 500 | Serif, line-height 1.4 |
| Section title | 13px | 600 | Uppercase, tracking 1.2px |
| Body | 16px | 400 | Sans-serif |
| Caption | 13px | 400 | Secondary color |
| Label | 11px | 500 | Uppercase, tracking 0.8px |

Full token files: `WebsiteAssets/tokens/typography.css`, `WebsiteAssets/tokens/typography.json`

### Brand Assets

All in `WebsiteAssets/`:

| Asset | Path |
|-------|------|
| Mark PNGs (16-1024px) | `logo/mark/daily-doctrine-mark-{size}.png` |
| Wordmark SVGs | `logo/wordmark/daily-doctrine-wordmark-{light,dark}.svg` |
| Lockup SVGs | `logo/lockups/daily-doctrine-lockup-{horizontal,stacked}-{light,dark}.svg` |
| Favicons | `favicons/favicon-{16,32,48}x{16,32,48}.png` |
| Apple touch icon | `icons/apple-touch/apple-touch-icon-180x180.png` |
| OG image (static) | `og/og-1200x630.png` |
| App screenshots | `screenshots/` |

## Mobile-First Rules (MANDATORY)

1. **Design mobile viewport first (375px), then scale up.** Every component must work at 375px before any desktop styling.
2. **Use `min-width` media queries only** — never `max-width`. Base styles = mobile.
3. **Breakpoints:**
   - Base: 0–639px (mobile)
   - `@media (min-width: 640px)` — tablet
   - `@media (min-width: 1024px)` — desktop
4. **Touch targets:** Minimum 44x44px for all interactive elements.
5. **No horizontal scroll.** Test every layout at 375px width.
6. **Images:** Use `srcset` or `<picture>` for responsive images. Always set `width`/`height` attributes to prevent CLS.
7. **Font sizes:** Use `clamp()` for fluid typography where appropriate. Never below 16px for body text on mobile (prevents iOS zoom).

## SEO Checklist (MANDATORY for every page)

1. **Metadata:** Every page must export Next.js `Metadata` with unique `title`, `description`, and `openGraph` properties.
2. **Semantic HTML:** Use `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`. Never nest interactive elements.
3. **Heading hierarchy:** One `<h1>` per page, then `<h2>` → `<h3>` in order. No skipping levels.
4. **Images:** All `<img>` must have descriptive `alt` text. Use Next.js `<Image>` component.
5. **Performance:**
   - No layout shift (set explicit dimensions on images/embeds).
   - Lazy-load below-the-fold images.
   - Minimize JS bundle — prefer CSS animations over JS.
6. **Structured data:** Add JSON-LD `SoftwareApplication` schema to the homepage.
7. **Canonical URL:** Set in metadata for every page.
8. **Robots:** Ensure `robots.txt` and `sitemap.xml` exist.

## Existing Routes

| Route | Purpose |
|-------|---------|
| `/` | Homepage (currently a placeholder — needs full redesign) |
| `/s/[payload]` | Dynamic share page — decodes base64url quote payload, renders quote, sets OG metadata |
| `/api/og` | Edge function — generates OG images via `@vercel/og` |
| `/privacy` | Privacy policy |
| `/terms` | Terms of use |
| `/support` | Support page |

## Share Payload Format

Base64url-encoded JSON used by iOS app for share links:

```typescript
interface SharePayload {
  q: string    // quote text (required)
  a?: string   // author (optional)
  p: string    // pack name (required)
}
```

## OG Image Generation

Uses `@vercel/og` (Satori). Constraints:
- Flexbox only (no CSS grid)
- Inline styles only (no CSS classes)
- System fonts or embedded fonts only
- 1200x630 dimensions

## Build & Deploy

```bash
npm run dev          # Local development
npm run build        # Production build
vercel --prod        # Deploy to production
```

## Testing

```bash
# Generate test share payload
echo '{"q":"Test quote","a":"Author","p":"Pack"}' | base64 | tr '+/' '-_' | tr -d '='

# Test share page
curl -I "https://dailydoctrine.xyz/s/{payload}"

# Test OG image
curl -I "https://dailydoctrine.xyz/api/og?payload={payload}"
```

## Design Anti-Patterns (DO NOT)

- Do NOT use gradient backgrounds (especially purple/blue gradients)
- Do NOT use generic stock-photo hero sections
- Do NOT use "Get Started Free" / "Join 10,000+ users" fake social proof
- Do NOT use card grids with emoji icons as "features"
- Do NOT center everything — use intentional asymmetry and editorial layouts
- Do NOT use Inter, Roboto, Space Grotesk, or Poppins
- Do NOT add floating particles, blobs, or mesh gradient decorations
- Do NOT use light theme — the brand is dark
