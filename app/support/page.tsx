import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Support - Daily Doctrine',
  description: 'Get help with Daily Doctrine',
}

export default function Support() {
  return (
    <main>
      <h1>Support</h1>

      <p>
        Need help? Email us at{' '}
        <a href="mailto:jeremy.odell01@gmail.com">jeremy.odell01@gmail.com</a>
      </p>

      <h2>Frequently Asked Questions</h2>

      <h3>Widgets</h3>
      <p>
        Daily Doctrine offers widgets for your Home Screen and Lock Screen. Widgets must be added
        manually by you — they do not appear automatically after installing the app.
      </p>
      <p><strong>To add a Home Screen widget:</strong></p>
      <ul>
        <li>Long-press on your Home Screen until apps start jiggling</li>
        <li>Tap the + button in the top-left corner</li>
        <li>Search for "Daily Doctrine"</li>
        <li>Choose a widget size and tap "Add Widget"</li>
      </ul>
      <p><strong>To add a Lock Screen widget:</strong></p>
      <ul>
        <li>Long-press on your Lock Screen</li>
        <li>Tap "Customize" and select your Lock Screen</li>
        <li>Tap the widget area below the time</li>
        <li>Search for "Daily Doctrine" and add it</li>
      </ul>

      <h3>Wallpapers</h3>
      <p>
        You can export today's quote as a beautiful wallpaper image. When you tap the wallpaper
        option, the image is saved to your Photos library — you will need to grant Photos access
        when prompted.
      </p>
      <p>
        After saving, you must set the wallpaper manually through the Photos app or Settings.
        Daily Doctrine cannot set your wallpaper automatically due to iOS limitations.
      </p>

      <h3>Notifications</h3>
      <p>
        Daily reminders are optional. You can enable or disable notifications and choose your
        preferred time in the app's settings. If you don't see notifications, check that
        notifications are enabled for Daily Doctrine in your iPhone's Settings app.
      </p>

      <h3>Purchases &amp; Restore</h3>
      <p>
        <strong>What does Pro unlock?</strong> Pro removes all ads and unlocks all current and
        future quote packs. You can also purchase individual quote packs separately.
      </p>
      <p><strong>To restore purchases:</strong></p>
      <ul>
        <li>Open Daily Doctrine</li>
        <li>Go to Settings (gear icon)</li>
        <li>Tap "Restore Purchases"</li>
        <li>Sign in with the Apple ID you used for the original purchase if prompted</li>
      </ul>
      <p>
        If your purchases don't restore, ensure you're signed into the correct Apple ID in
        Settings &gt; Apple ID on your device.
      </p>

      <p className="last-updated">Last updated: January 20, 2025</p>
    </main>
  )
}
