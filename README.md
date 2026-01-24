# Daily Doctrine Website

Minimal static site for Daily Doctrine's App Store web presence.

## Pages

- `/` - Marketing landing page
- `/support` - Support page with FAQ
- `/privacy` - Privacy Policy
- `/terms` - Terms of Use

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy to Vercel

### First-time setup

```bash
npm i -g vercel
vercel login
vercel
```

### Subsequent deploys

```bash
vercel --prod
```

## App Store Connect URLs

After deployment, use these URLs in App Store Connect:

| Field | URL |
|-------|-----|
| Marketing URL | `https://your-domain.vercel.app` |
| Support URL | `https://your-domain.vercel.app/support` |
| Privacy Policy URL | `https://your-domain.vercel.app/privacy` |
