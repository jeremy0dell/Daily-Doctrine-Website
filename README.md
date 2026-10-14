# Daily Doctrine Website

Marketing site + share infrastructure for Daily Doctrine iOS app.

**Production:** https://dailydoctrine.xyz

## Pages

| Route | Purpose |
|-------|---------|
| `/` | Marketing landing page |
| `/support` | Support page with FAQ |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Use |
| `/s/[payload]` | Share page (dynamic) |
| `/api/og` | OG image generation (edge) |

## Share System

The share system enables rich link previews when users share quotes from the app.

### URL Format

```
https://dailydoctrine.xyz/s/{payload}
```

Where `payload` is a base64url-encoded JSON object:

```json
{
  "q": "Quote text here",
  "a": "Author (optional)",
  "p": "Pack Name"
}
```

### Encoding (Swift)

```swift
func encodeSharePayload(quote: String, author: String?, pack: String) -> String {
    var payload: [String: String] = ["q": quote, "p": pack]
    if let author = author { payload["a"] = author }

    let json = try! JSONEncoder().encode(payload)
    let base64 = json.base64EncodedString()
    return base64
        .replacingOccurrences(of: "+", with: "-")
        .replacingOccurrences(of: "/", with: "_")
        .replacingOccurrences(of: "=", with: "")
}
```

### Test URLs

**Share page:**
```
https://dailydoctrine.xyz/s/eyJxIjoiRGlzY2lwbGluZSBpcyB0aGUgYnJpZGdlIGJldHdlZW4gZ29hbHMgYW5kIGFjY29tcGxpc2htZW50LiIsImEiOiJKaW0gUm9obiIsInAiOiJEaXNjaXBsaW5lIn0
```

**OG image direct:**
```
https://dailydoctrine.xyz/api/og?payload=eyJxIjoiRGlzY2lwbGluZSBpcyB0aGUgYnJpZGdlIGJldHdlZW4gZ29hbHMgYW5kIGFjY29tcGxpc2htZW50LiIsImEiOiJKaW0gUm9obiIsInAiOiJEaXNjaXBsaW5lIn0
```

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy

```bash
vercel --prod
```

## App Store Connect URLs

| Field | URL |
|-------|-----|
| Marketing URL | `https://dailydoctrine.xyz` |
| Support URL | `https://dailydoctrine.xyz/support` |
| Privacy Policy URL | `https://dailydoctrine.xyz/privacy` |
# Private feedback

`POST /api/feedback` validates text feedback and the five-question private product
survey. Successful responses follow a durable private Blob write. Retries with
the same ID and content return the same receipt; different content cannot
overwrite a received submission. The endpoint never exposes stored text in its
response. It accepts at most 16 KiB per request and 2,000 UTF-16 units of message
text. It stops accepting new records at 1,000 stored submissions; export and
archive older records before raising that capacity. Store credentials stay on
the server, and no public read route exists.

The private store is `daily-doctrine-feedback`, connected to this Vercel project.
Inspect it in Vercel's Storage dashboard. To export records to a private local
file and print aggregate choice counts:

```sh
npx --yes vercel@64.0.2 env pull .env.local
node --env-file=.env.local Tools/export-feedback.mjs /private/path/feedback.json
node --test Tools/feedback.test.mjs
```

The export separates answers from paid owners and free users. Use friction and
purchase objections to prioritize changes; these incentivized answers do not
establish willingness to pay. Measure paid conversion and return behavior in
TelemetryDeck alongside trial usage. Never publish raw messages or the private
export file. Survey schema 1 uses the exact option IDs in `app/lib/feedback.mjs`
and the iPhone app's `FeedbackQuestion`.
