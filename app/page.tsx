import type { Metadata } from 'next'
import Image from 'next/image'
import AppStoreBadge from './components/AppStoreBadge'
import SiteFooter from './components/SiteFooter'
import './home.css'

export const metadata: Metadata = {
  title: 'Daily Doctrine — Quotes for composure, focus, and quiet strength',
  description:
    'A daily quote app designed for discipline. Stoic philosophy, Scripture, and modern wisdom — delivered every morning with widgets, wallpapers, and curated packs.',
  openGraph: {
    title: 'Daily Doctrine — Quotes for composure, focus, and quiet strength',
    description:
      'A daily quote app designed for discipline. Stoic philosophy, Scripture, and modern wisdom — delivered every morning.',
    url: 'https://dailydoctrine.xyz',
    siteName: 'Daily Doctrine',
    images: [{ url: '/og/og-1200x630.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daily Doctrine — Quotes for composure, focus, and quiet strength',
    description:
      'A daily quote app designed for discipline. Stoic philosophy, Scripture, and modern wisdom — delivered every morning.',
    images: ['/og/og-1200x630.png'],
  },
}

const features = [
  {
    title: 'Daily Quotes',
    desc: 'A new line of discipline waiting for you every morning. Short enough to read in seconds, strong enough to carry all day.',
  },
  {
    title: 'Widgets',
    desc: 'Pin today\u2019s quote to your Home Screen or Lock Screen. Glance, absorb, move on.',
  },
  {
    title: 'Wallpapers',
    desc: 'Turn any quote into a clean, ready-made wallpaper. One tap \u2014 no design app needed.',
  },
  {
    title: 'Favorites',
    desc: 'Save the ones that hit different. Build your personal collection of wisdom.',
  },
]

const packs = ['Stoic', 'Scripture', 'Modern Grit', 'Discipline', 'Composure', 'Focus']

export default function Home() {
  return (
    <div className="v5-page">
      <main>
        {/* Hero */}
        <header className="v5-hero">
          <Image
            src="/logo/daily-doctrine-mark-128.png"
            alt=""
            width={48}
            height={48}
            className="v5-hero-mark"
            priority
          />
          <h1 className="v5-hero-title">Daily Doctrine</h1>
          <p className="v5-hero-tagline">A line of discipline, every morning.</p>
          <div className="v5-hero-badge">
            <AppStoreBadge />
          </div>
          <p className="v5-hero-note">Free with optional Pro upgrade</p>
          <div className="v5-hero-phone">
            <Image
              src="/screenshots/01-home-stoic.png"
              alt="Daily Doctrine app showing a Stoic philosophy quote on the home screen"
              width={300}
              height={600}
              className="v5-phone-frame"
              priority
            />
          </div>
        </header>

        {/* Features */}
        <section className="v5-features" aria-labelledby="v5-features-label">
          <h2 className="v5-section-label" id="v5-features-label">
            Designed for Daily Use
          </h2>
          <div className="v5-features-grid">
            {features.map((f) => (
              <div key={f.title} className="v5-feature-card">
                <h3 className="v5-feature-title">{f.title}</h3>
                <p className="v5-feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Packs */}
        <section className="v5-packs" aria-labelledby="v5-packs-label">
          <h2 className="v5-section-label" id="v5-packs-label">
            Quote Packs
          </h2>
          <p className="v5-packs-desc">
            Explore themed collections designed for composure, focus, and quiet strength.
          </p>
          <div className="v5-packs-phone">
            <Image
              src="/screenshots/04-packs.png"
              alt="Quote pack collection featuring Stoic, Scripture, Modern Grit, and more"
              width={280}
              height={560}
              className="v5-phone-frame"
            />
          </div>
          <div className="v5-packs-pills" role="list">
            {packs.map((name) => (
              <span key={name} className="v5-pill" role="listitem">
                {name}
              </span>
            ))}
          </div>
        </section>

        {/* Widget Showcase */}
        <section className="v5-widget" aria-labelledby="v5-widget-label">
          <h2 className="v5-section-label" id="v5-widget-label">
            Your Home Screen, Elevated
          </h2>
          <div className="v5-widget-phone">
            <Image
              src="/screenshots/03-widget.png"
              alt="Daily Doctrine widget on iPhone Home Screen showing today's quote"
              width={280}
              height={560}
              className="v5-phone-frame"
            />
          </div>
          <p className="v5-widget-desc">
            Pin today&rsquo;s quote right where you&rsquo;ll see it &mdash; your Home Screen, Lock
            Screen, or StandBy.
          </p>
        </section>
      </main>

      {/* Final CTA */}
      <section className="v5-cta" aria-labelledby="v5-cta-title">
        <h2 className="v5-cta-title" id="v5-cta-title">
          Start your morning ritual.
        </h2>
        <div className="v5-cta-badge">
          <AppStoreBadge />
        </div>
        <p className="v5-cta-note">Available for iPhone</p>
      </section>

      <SiteFooter />
    </div>
  )
}
