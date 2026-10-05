import type { Metadata } from 'next'
import SiteFooter from '../components/SiteFooter'

export const metadata: Metadata = {
  title: 'Privacy Policy — Daily Doctrine',
  description: 'How Daily Doctrine handles local content, analytics, advertising, purchases, and permissions.',
  alternates: { canonical: 'https://dailydoctrine.xyz/privacy' },
  openGraph: {
    title: 'Privacy Policy — Daily Doctrine',
    description: 'Local content, analytics, advertising, purchases, and permissions.',
    url: 'https://dailydoctrine.xyz/privacy',
  },
}

export default function Privacy() {
  return (
    <div className="v5-page">
      <main className="legal-page">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last updated: October 5, 2026</p>
        <h2>Your content and preferences</h2>
        <p>Daily Doctrine requires no account. Your chosen collections, saved lines, personal principles,
          reminder settings, and wallpaper designs are stored on your device. Personal principles and
          photo designs are not uploaded to our analytics services. If you choose to share a line or
          image, it is sent to the destination you select. Device backups are controlled by your Apple settings.</p>
        <h2>Usage and purchase analytics</h2>
        <p>We use TelemetryDeck to understand how the app works and improve it. Signals include app opens,
          setup and widget configuration, wallpaper actions, reminder settings, paywall interactions,
          purchases, restores, rewarded-ad outcomes, and ad impression revenue. They include app/device
          context and Premium status, but not the text of your personal principles or your photos.
          TelemetryDeck uses pseudonymous identifiers for analytics; this does not require the advertising identifier (IDFA).
          Purchase reporting includes product and transaction information and a randomly generated install token
          to avoid counting the same purchase more than once. We do not receive your card details.</p>
        <p>See <a href="https://telemetrydeck.com/privacy/" target="_blank" rel="noopener noreferrer">TelemetryDeck&apos;s privacy information</a>.</p>
        <h2>Advertising and your choices</h2>
        <p>The free app uses Google AdMob for banner, native, and optional rewarded ads. Google and its
          advertising partners may process device identifiers, advertising interactions, usage information,
          and network information to deliver and measure ads. Premium removes ads.</p>
        <p>Where required, the app presents Google&apos;s consent form before requesting ads. Ad privacy
          choices are available in the app&apos;s Settings when required. iOS may also ask for permission
          to track across other companies&apos; apps and websites. Declining that request prevents access
          to IDFA; it does not stop all ad delivery or all non-identifying measurement. You can change
          the iOS choice in Settings &gt; Privacy &amp; Security &gt; Tracking.</p>
        <p>See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google&apos;s Privacy Policy</a>.</p>
        <h2>Photos and notifications</h2>
        <p>Photo designs use the image you select through Apple&apos;s photo picker. Saving a wallpaper
          requests permission to add an image to Photos. The app does not upload your selected images.
          Optional reminders require notification permission and are scheduled on your device.</p>
        <h2>Purchases</h2>
        <p>Apple processes purchases and restores through the App Store. We use StoreKit transaction
          information to recognize Premium access and measure purchases. Apple manages payment information.</p>
        <h2>Website and campaign links</h2>
        <p>This website is hosted on Vercel. Hosting requests may involve IP addresses and technical
          request information. App Store links include campaign labels so Apple can report aggregate
          downloads and visits. Apple Ads measures ads on the App Store. These labels do not contain
          your personal principles, photos, or contact details.</p>
        <h2>Retention and requests</h2>
        <p>Local app data can be cleared by removing the app; device backups and App Store purchase
          history are managed by Apple. Analytics and advertising providers handle service data under
          their own policies. For questions or requests about data handled by Daily Doctrine, contact us below.
          Do not send sensitive personal content to support.</p>
        <h2>Children</h2>
        <p>Daily Doctrine is not directed at children. We do not knowingly collect names or contact
          information from children. Contact us if you believe information requires removal.</p>
        <h2>Changes and contact</h2>
        <p>We update this page when our practices change. Contact <a href="mailto:contact@dailydoctrine.xyz">contact@dailydoctrine.xyz</a> with privacy questions.</p>
      </main>
      <SiteFooter />
    </div>
  )
}
