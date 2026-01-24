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
