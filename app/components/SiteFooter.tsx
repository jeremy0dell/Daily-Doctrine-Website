export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <span>&copy; {new Date().getFullYear()} Daily Doctrine</span>
      <div className="footer-links">
        <a href="/support">Support</a>
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
      </div>
    </footer>
  )
}
