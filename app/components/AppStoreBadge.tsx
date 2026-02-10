export default function AppStoreBadge({ className }: { className?: string }) {
  return (
    <a
      href="https://apps.apple.com/app/daily-doctrine/id6740091498"
      target="_blank"
      rel="noopener noreferrer"
      className={`app-store-badge ${className || ''}`}
      aria-label="Download on the App Store"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40" width="144" height="48">
        <rect width="120" height="40" rx="6" fill="#000" stroke="#A6A6A6" strokeWidth="0.5"/>
        <text x="40" y="12.5" fill="#fff" fontSize="5" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif" fontWeight="400">Download on the</text>
        <text x="40" y="24" fill="#fff" fontSize="11" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif" fontWeight="600" letterSpacing="-0.2">App Store</text>
        <g transform="translate(12, 6)" fill="#fff">
          <path d="M18.87 12.17a5.53 5.53 0 0 1 2.63-4.64 5.66 5.66 0 0 0-4.46-2.41c-1.88-.2-3.7 1.12-4.66 1.12-.97 0-2.45-1.1-4.04-1.07a5.95 5.95 0 0 0-5.01 3.06c-2.15 3.72-.55 9.2 1.52 12.22 1.03 1.48 2.24 3.13 3.83 3.07 1.55-.06 2.13-1 4-.1s2.41 1 4 .98c1.63-.03 2.68-1.48 3.67-2.98a12.16 12.16 0 0 0 1.67-3.42 5.34 5.34 0 0 1-3.15-4.83zM15.96 3.17A5.44 5.44 0 0 0 17.2.01a5.54 5.54 0 0 0-3.59 1.86A5.18 5.18 0 0 0 12.33 5a4.59 4.59 0 0 0 3.63-1.83z" transform="scale(0.52)"/>
        </g>
      </svg>
    </a>
  )
}
