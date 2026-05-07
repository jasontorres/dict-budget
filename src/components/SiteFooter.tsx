export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p className="sf-source">
          SOURCE: GENERAL APPROPRIATIONS ACT · DEPT 37 · 7 FISCAL YEARS · 4 BUREAUS · 91 PROGRAMS · ~4,930 LINE ITEMS
        </p>
        <p className="sf-disclaimer">
          <strong>AI-assisted analysis.</strong> The figures, breakdowns, and editorial commentary on
          this site were parsed, aggregated, and drafted by{' '}
          <a href="https://www.anthropic.com/claude" target="_blank" rel="noopener">
            Claude Opus 4.7
          </a>{' '}
          with human oversight. The dataset and its interpretations may contain errors, mis-classifications,
          or stale figures — always verify against the official GAA before citing.
        </p>
        <p className="sf-credit">
          Site by <a href="https://about.bettergov.ph" target="_blank" rel="noopener">BetterGov</a>
        </p>
      </div>
    </footer>
  );
}
