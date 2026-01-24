# Claude Code Notes - Daily Doctrine Website

Technical reference for AI assistants working on this codebase.

## Architecture

- **Framework:** Next.js 14 (App Router)
- **Hosting:** Vercel
- **Domain:** dailydoctrine.xyz
- **Runtime:** Node.js + Edge (for /api/og)

## Key Files

| File | Purpose |
|------|---------|
| `app/s/[payload]/page.tsx` | Dynamic share page - decodes payload, renders quote, sets OG metadata |
| `app/api/og/route.tsx` | Edge function - generates OG images using @vercel/og |
| `next.config.js` | No `output: 'export'` - required for dynamic routes |

## Share Payload Format

Base64url-encoded JSON:
```typescript
interface SharePayload {
  q: string    // quote text (required)
  a?: string   // author (optional)
  p: string    // pack name (required)
}
```

### Encoding/Decoding

**Encode (for iOS app):**
```swift
// JSON → base64 → base64url (replace +/ with -_, remove =)
let json = try! JSONEncoder().encode(payload)
let base64url = json.base64EncodedString()
    .replacingOccurrences(of: "+", with: "-")
    .replacingOccurrences(of: "/", with: "_")
    .replacingOccurrences(of: "=", with: "")
```

**Decode (in Next.js):**
```typescript
function decodePayload(payload: string): SharePayload | null {
  try {
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64 + '='.repeat((4 - base64.length % 4) % 4)
    const json = Buffer.from(padded, 'base64').toString('utf-8')
    return JSON.parse(json)
  } catch {
    return null
  }
}
```

## OG Image Generation

Uses `@vercel/og` (Satori under the hood). Constraints:
- Only supports a subset of CSS (flexbox, no grid)
- Must use inline styles (no CSS classes)
- Fonts are limited (system fonts or embedded)
- Image dimensions: 1200x630 (standard OG)

### Dynamic Font Sizing

```typescript
function getQuoteFontSize(text: string): number {
  const len = text.length
  if (len < 80) return 48
  if (len < 150) return 40
  if (len < 250) return 34
  if (len < 350) return 28
  return 24
}
```

## Design Tokens (match iOS app)

| Token | Value |
|-------|-------|
| Background | `#0a0a0a` |
| Card background | `#141414` |
| Text primary | `rgba(255,255,255,0.92)` |
| Text author | `rgba(255,255,255,0.55)` |
| Text subtle | `rgba(255,255,255,0.35)` |
| Watermark | `rgba(255,255,255,0.18)` |
| Accent (CTA) | `rgb(217,191,140)` |

## Testing

**Generate test payload:**
```bash
echo '{"q":"Test quote","a":"Author","p":"Pack"}' | base64 | tr '+/' '-_' | tr -d '='
```

**Test endpoints:**
```bash
# Share page
curl -I "https://dailydoctrine.xyz/s/{payload}"

# OG image
curl -I "https://dailydoctrine.xyz/api/og?payload={payload}"
```

## Common Tasks

### Add a new static page
1. Create `app/{route}/page.tsx`
2. Export metadata and default component
3. Deploy with `vercel --prod`

### Update OG image styling
1. Edit `app/api/og/route.tsx`
2. Test locally: `npm run dev` then visit `/api/og?payload=...`
3. Deploy with `vercel --prod`

### Debug OG previews
- Use https://opengraph.xyz to preview
- Clear cache: add `?v=2` to URL when testing

## Related: iOS App Integration

The iOS app generates share URLs in `QuoteShareCardRenderer.swift`:

```swift
extension QuoteShareCardRenderer {
    func generateShareURL(for quote: TodayQuote) -> URL? {
        var payload: [String: String] = ["q": quote.text, "p": quote.packName]
        if let author = quote.author { payload["a"] = author }

        guard let json = try? JSONEncoder().encode(payload) else { return nil }

        let base64url = json.base64EncodedString()
            .replacingOccurrences(of: "+", with: "-")
            .replacingOccurrences(of: "/", with: "_")
            .replacingOccurrences(of: "=", with: "")

        return URL(string: "https://dailydoctrine.xyz/s/\(base64url)")
    }
}
```

## Future Enhancements

- [ ] Universal Links (AASA file at `/.well-known/apple-app-site-association`)
- [ ] Analytics on share page visits
- [ ] Custom fonts in OG images
- [ ] Short URL service (optional)
