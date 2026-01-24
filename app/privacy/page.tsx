import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Daily Doctrine',
  description: 'Privacy Policy for Daily Doctrine',
}

export default function Privacy() {
  return (
    <main>
      <h1>Privacy Policy</h1>

      <h2>Overview</h2>
      <p>
        Daily Doctrine is designed with your privacy in mind. We do not collect, store, or
        transmit any personal information to our servers. All your preferences and data remain
        on your device.
      </p>

      <h2>Data We Do Not Collect</h2>
      <p>We do not collect:</p>
      <ul>
        <li>Names, email addresses, or contact information</li>
        <li>Location data</li>
        <li>Usage analytics or behavior tracking</li>
        <li>Any data that leaves your device to our servers</li>
      </ul>

      <h2>Third-Party Advertising</h2>
      <p>
        The free version of Daily Doctrine displays ads provided by Google AdMob. Google may
        collect and use data to serve personalized ads based on your interests, or show
        non-personalized ads if you decline tracking.
      </p>
      <p>
        When you first open the app, iOS will ask whether you want to allow Daily Doctrine to
        track your activity across other companies' apps and websites. This choice is entirely
        yours:
      </p>
      <ul>
        <li><strong>Allow:</strong> Google may use data to show you more relevant ads</li>
        <li><strong>Ask App Not to Track:</strong> You will see non-personalized ads</li>
      </ul>
      <p>
        You can change this setting anytime in Settings &gt; Privacy &amp; Security &gt; Tracking.
        Pro users do not see any ads.
      </p>
      <p>
        For more information about how Google handles data, see{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          Google's Privacy Policy
        </a>.
      </p>

      <h2>Photos Access</h2>
      <p>
        If you choose to save a wallpaper, we request permission to add images to your photo
        library. We do not access, read, or upload any of your existing photos.
      </p>

      <h2>Purchases</h2>
      <p>
        In-app purchases are processed entirely by Apple through the App Store. We do not
        receive or store any payment information.
      </p>

      <h2>Data Retention</h2>
      <p>
        Since we do not collect personal data, there is nothing for us to retain. Your app
        preferences are stored locally on your device and in your iCloud account (if enabled)
        and are deleted when you uninstall the app.
      </p>

      <h2>Children's Privacy</h2>
      <p>
        Daily Doctrine does not knowingly collect any personal information from children.
        The app contains no features that require personal data input.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Any changes will be posted on
        this page with an updated revision date.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy, please contact us at{' '}
        <a href="mailto:jeremy.odell01@gmail.com">jeremy.odell01@gmail.com</a>.
      </p>

      <p className="last-updated">Last updated: January 20, 2025</p>
    </main>
  )
}
