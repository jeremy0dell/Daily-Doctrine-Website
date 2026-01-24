import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use - Daily Doctrine',
  description: 'Terms of Use for Daily Doctrine',
}

export default function Terms() {
  return (
    <main>
      <h1>Terms of Use</h1>

      <h2>Agreement</h2>
      <p>
        By downloading or using Daily Doctrine, you agree to these Terms of Use. If you do not
        agree, please do not use the app.
      </p>

      <h2>License</h2>
      <p>
        Daily Doctrine grants you a limited, non-exclusive, non-transferable license to use the
        app for personal, non-commercial purposes on any Apple device you own or control,
        subject to the Apple Media Services Terms and Conditions.
      </p>

      <h2>Apple's Standard EULA</h2>
      <p>
        Your use of Daily Doctrine is also governed by Apple's Standard End User License
        Agreement (EULA) for apps downloaded from the App Store. You can review Apple's
        Standard EULA at{' '}
        <a
          href="https://www.apple.com/legal/internet-services/itunes/dev/stdeula/"
          target="_blank"
          rel="noopener noreferrer"
        >
          apple.com/legal/internet-services/itunes/dev/stdeula
        </a>.
      </p>

      <h2>Acceptable Use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Reverse engineer, decompile, or disassemble the app</li>
        <li>Remove or alter any copyright or proprietary notices</li>
        <li>Use the app for any unlawful purpose</li>
        <li>Redistribute, sell, or sublicense the app</li>
      </ul>

      <h2>Intellectual Property</h2>
      <p>
        All content in Daily Doctrine, including but not limited to text, graphics, and software,
        is the property of Daily Doctrine or its content suppliers and is protected by copyright
        and other intellectual property laws.
      </p>

      <h2>Disclaimer</h2>
      <p>
        Daily Doctrine is provided "as is" without warranties of any kind. We do not guarantee
        that the app will be error-free or uninterrupted. Quote content is for inspirational
        purposes only and should not be considered professional advice.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, Daily Doctrine shall not be liable for any
        indirect, incidental, special, or consequential damages arising from your use of the app.
      </p>

      <h2>Changes to Terms</h2>
      <p>
        We may modify these Terms of Use at any time. Continued use of the app after changes
        constitutes acceptance of the modified terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these Terms? Contact us at{' '}
        <a href="mailto:jeremy.odell01@gmail.com">jeremy.odell01@gmail.com</a>.
      </p>

      <p className="last-updated">Last updated: January 20, 2025</p>
    </main>
  )
}
