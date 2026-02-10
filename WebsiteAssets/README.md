# Daily Doctrine - Website Assets

Brand assets extracted from the iOS app's design system for use on the marketing website (dailydoctrine.xyz).

## Directory Structure

```
WebsiteAssets/
├── raw/                          # Source files from iOS repo
│   ├── AppIcon.png               # 1024x1024 app icon source
│   ├── generate-icon.swift       # Icon generation script (reference)
│   └── Theme.swift               # Design system source of truth
├── logo/
│   ├── mark/                     # Icon mark at multiple sizes
│   │   └── daily-doctrine-mark-{16..1024}.png
│   ├── wordmark/                 # "Daily Doctrine" text-only
│   │   ├── daily-doctrine-wordmark-light.svg  (cream text, transparent bg)
│   │   └── daily-doctrine-wordmark-dark.svg   (dark text, transparent bg)
│   └── lockups/                  # Mark + wordmark combined
│       ├── daily-doctrine-lockup-horizontal-light.svg
│       ├── daily-doctrine-lockup-horizontal-dark.svg
│       ├── daily-doctrine-lockup-stacked-light.svg
│       └── daily-doctrine-lockup-stacked-dark.svg
├── tokens/
│   ├── colors.json               # Color tokens (structured JSON)
│   ├── colors.css                # CSS custom properties
│   ├── typography.json           # Typography tokens (structured JSON)
│   └── typography.css            # CSS custom properties + utility classes
├── favicons/
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon-48x48.png
│   └── site.webmanifest
├── icons/
│   ├── app-icon/                 # App icon at common sizes
│   │   └── app-icon-{16..1024}.png
│   ├── apple-touch/
│   │   └── apple-touch-icon-180x180.png
│   └── android-chrome/
│       ├── android-chrome-192x192.png
│       └── android-chrome-512x512.png
├── og/
│   └── og-1200x630.png           # Open Graph image (1200x630)
├── screenshots/                  # App screenshots (if generated)
│   └── *.png
└── notes/
    └── licenses.md               # Font and asset licensing notes
```

## Usage

### Colors (CSS)

Import in your stylesheet or `<head>`:

```html
<link rel="stylesheet" href="/assets/tokens/colors.css" />
```

Then use custom properties:

```css
body {
  background: var(--dd-bg-primary);
  color: var(--dd-text-primary);
}

.cta-button {
  background: var(--dd-accent);
}
```

### Typography (CSS)

```html
<link rel="stylesheet" href="/assets/tokens/typography.css" />
```

Use utility classes:

```html
<blockquote class="dd-hero-quote">The obstacle is the way.</blockquote>
<h3 class="dd-section-title">Features</h3>
<p class="dd-body">Daily wisdom from the Stoics.</p>
```

Or custom properties:

```css
.my-heading {
  font-family: var(--dd-font-serif);
  font-size: var(--dd-text-hero-size);
}
```

### Favicons (Next.js)

Add to your `app/layout.tsx`:

```tsx
export const metadata = {
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon-180x180.png',
  },
  manifest: '/site.webmanifest',
};
```

### OG Image

For static pages, reference directly:

```tsx
export const metadata = {
  openGraph: {
    images: [{ url: '/og-1200x630.png', width: 1200, height: 630 }],
  },
};
```

The dynamic share page (`/s/[payload]`) uses `@vercel/og` to generate per-quote OG images at runtime.

### Logo Usage

| Context | File |
|---------|------|
| Dark backgrounds (website) | `*-light.svg` variants |
| Light backgrounds (emails, docs) | `*-dark.svg` variants |
| Favicon / small icon | `mark/daily-doctrine-mark-32.png` or `mark-64.png` |
| Social / profile pic | `mark/daily-doctrine-mark-512.png` |

## Regeneration

### Mark PNGs

```bash
# From iOS repo root:
swift Scripts/generate-icon.swift
# Then resize:
sips -z {SIZE} {SIZE} Assets.xcassets/AppIcon.appiconset/AppIcon.png --out daily-doctrine-mark-{SIZE}.png
```

### OG Image

```bash
cd Daily-Doctrine-Website
swift Tools/generate-og-image.swift
```

### Screenshots

```bash
cd Daily-Doctrine  # iOS repo
xcodegen generate
xcodebuild build -scheme Screenshots -destination 'platform=iOS Simulator,name=iPhone 17 Pro' -quiet
xcrun simctl boot "iPhone 17 Pro"
open -a Simulator
xcrun simctl launch booted com.yourco.DailyDoctrine
sleep 3
xcrun simctl io booted screenshot screenshots/01-home.png
# Navigate to each screen and capture
```

## Source Mapping

| Asset | iOS Source |
|-------|-----------|
| Colors | `DesignSystem/Theme.swift` (DDColors) |
| Typography | `DesignSystem/Theme.swift` (DDTypography) |
| App icon | `Assets.xcassets/AppIcon.appiconset/AppIcon.png` |
| Icon generator | `Scripts/generate-icon.swift` |
| Brand font | Georgia-Bold (system font, no custom font files) |
| UI font | SF Pro (Apple system font, web fallback stack provided) |
