import { Link } from 'react-router-dom';
import { useScrollytelling } from '../lib/scrollytelling';
import SiteFooter from '../components/SiteFooter';

const PAGE_STYLES = `
  /* DICT-specific overrides on top of narrative.css */
  .review-page {
    --accent: #b8341f;
    --accent-deep: #7a1f10;
    --ec-ps:   #6b8e3a;
    --ec-mooe: #b8722a;
    --ec-co:   #1d6f9a;
    --ec-fe:   #8a6c3a;
    --teal:    #1d6f9a;
    --teal-deep: #0d4f73;
  }

  .review-page .progress {
    position: fixed;
    top: 0; left: 0;
    height: 3px;
    width: 0;
    background: var(--accent);
    z-index: 100;
    transition: width 80ms linear;
  }

  .review-page .chrome {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 95;
    pointer-events: none;
    padding: 18px 28px;
    display: flex;
    justify-content: space-between;
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink-3);
    mix-blend-mode: difference;
    color: rgba(247,245,240,0.6);
  }
  .review-page .chrome a { pointer-events: auto; color: inherit; text-decoration: none; border-bottom: 1px solid currentColor; padding-bottom: 1px; }

  .review-page .dataline {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: 0.04em;
    color: var(--ink-3);
    margin-top: 22px;
    max-width: 56ch;
  }
  .review-page .bg-ink .dataline { color: #a8a08a; }
  .review-page .bg-accent .dataline, .review-page .bg-gold .dataline { color: rgba(243,217,182,0.8); }

  .review-page .stat-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0;
    margin-top: 56px;
    border-top: 1px solid currentColor;
    border-bottom: 1px solid currentColor;
  }
  .review-page .stat-row > div {
    padding: 22px 24px;
    border-right: 1px solid currentColor;
  }
  .review-page .stat-row > div:last-child { border-right: none; }
  .review-page .stat-row .num {
    font-family: var(--font-display);
    font-weight: 400;
    font-size: clamp(40px, 5vw, 72px);
    line-height: 0.95;
    letter-spacing: -0.02em;
    margin: 0;
  }
  .review-page .stat-row .lbl {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin: 12px 0 0;
    opacity: 0.7;
  }

  .review-page .bureau-bars { display: grid; grid-template-columns: 200px 1fr 100px; gap: 16px 24px; margin-top: 32px; align-items: center; }
  .review-page .bureau-bars .bn { font-family: var(--font-hero); font-weight: 700; font-size: 16px; }
  .review-page .bureau-bars .br { position: relative; height: 14px; background: rgba(255,255,255,0.08); }
  .review-page .bureau-bars .br > span { position: absolute; top: 0; bottom: 0; left: 0; }
  .review-page .bureau-bars .bn small { display: block; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em; font-weight: 500; opacity: 0.7; margin-top: 2px; text-transform: uppercase; }
  .review-page .bureau-bars .bv { font-family: var(--font-mono); font-size: 13px; font-weight: 600; text-align: right; font-variant-numeric: tabular-nums; }
  .review-page .bureau-bars .bv .delta { display: block; font-size: 10px; opacity: 0.7; margin-top: 2px; font-weight: 500; }
  .review-page .bureau-bars .bv .delta.neg { color: #ff8a72; }
  .review-page .bureau-bars .bv .delta.pos { color: #98d68a; }

  .review-page .ec-chart { width: 100%; height: 360px; margin-top: 28px; display: block; }
  .review-page .ec-chart text { font-family: var(--font-mono); font-size: 11px; fill: var(--ink-3); }

  .review-page .epigraph {
    font-family: var(--font-display);
    font-style: italic;
    font-weight: 300;
    font-size: clamp(28px, 3.6vw, 56px);
    line-height: 1.15;
    letter-spacing: -0.015em;
    max-width: 22ch;
    margin: 0;
  }
  .review-page .epigraph::before { content: "\\201C"; opacity: 0.5; }
  .review-page .epigraph::after { content: "\\201D"; opacity: 0.5; }

  .review-page .megastat {
    font-family: var(--font-mono);
    font-weight: 700;
    font-size: clamp(96px, 18vw, 320px);
    line-height: 0.85;
    letter-spacing: -0.04em;
    margin: 0;
  }
  .review-page .megastat .unit { font-size: 0.4em; opacity: 0.6; margin-left: 0.1em; }

  .review-page .pcards {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    margin-top: 40px;
  }
  .review-page .pcard {
    border: 1px solid currentColor;
    padding: 22px 24px 20px;
    background: rgba(255,255,255,0.03);
  }
  .review-page .bg-paper-warm .pcard,
  .review-page .bg-paper .pcard,
  .review-page .bg-paper-deep .pcard { background: rgba(0,0,0,0.02); }
  .review-page .pcard .num {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    opacity: 0.6;
    margin-bottom: 14px;
  }
  .review-page .pcard .name {
    font-family: var(--font-display);
    font-style: italic;
    font-weight: 400;
    font-size: 26px;
    line-height: 1.15;
    margin: 0 0 12px;
    letter-spacing: -0.005em;
  }
  .review-page .pcard .body { font-size: 15px; line-height: 1.55; }
  .review-page .pcard .figrow {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-top: 18px;
    padding-top: 14px;
    border-top: 1px solid currentColor;
    opacity: 0.85;
  }
  .review-page .pcard .figrow .v { font-family: var(--font-mono); font-weight: 600; font-size: 16px; }
  .review-page .pcard .figrow .l { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; opacity: 0.7; }

  .review-page .spike-chart { width: 100%; height: 320px; margin-top: 24px; }
  .review-page .spike-chart text { font-family: var(--font-mono); font-size: 11px; }

  .review-page .tag-line {
    font-family: var(--font-mono);
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--accent);
    margin: 0 0 18px;
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }
  .review-page .tag-line::before {
    content: ""; width: 28px; height: 1px; background: var(--accent);
  }

  .review-page .reading {
    border: 1px solid currentColor;
    padding: 28px 32px;
    margin-top: 44px;
    max-width: 700px;
  }
  .review-page .reading .h { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.7; margin: 0 0 14px; }
  .review-page .reading .b { font-family: var(--font-body); font-size: 16px; line-height: 1.7; margin: 0 0 14px; opacity: 0.92; }
  .review-page .reading .b:last-child { margin-bottom: 0; }

  .review-page .coda { padding: 140px 6vw 120px; }
  .review-page .coda .body { max-width: 60ch; margin: 0 auto; font-family: var(--font-display); font-style: italic; font-weight: 300; font-size: 24px; line-height: 1.5; color: var(--ink-2); text-align: center; }
  .review-page .coda .meta { text-align: center; margin-top: 56px; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-3); }
  .review-page .coda .crosslinks { display: flex; justify-content: center; gap: 16px; margin-top: 32px; }
  .review-page .coda .cross-link {
    border: 1px solid var(--ink); padding: 12px 20px; background: var(--paper);
    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink); text-decoration: none;
    transition: background .12s, color .12s;
  }
  .review-page .coda .cross-link:hover { background: var(--ink); color: var(--paper); }
`;

export default function Review() {
  useScrollytelling();

  return (
    <div className="review-page">
      <style>{PAGE_STYLES}</style>

      <div className="progress"></div>
      <div className="chrome">
        <span>INSIDE THE DICT BUDGET · FY 2020 – 2026</span>
        <span>
          <Link to="/">↗ DATA PORTAL</Link>
        </span>
      </div>
      <div className="piprail"></div>

      {/* ===== 1 — Cover ===== */}
      <section className="scene bg-paper" data-title="Cover">
        <div className="scene-inner center">
          <p className="eyebrow">
            <span className="num">01</span> A REVIEW · FY 2020 – 2026
          </p>
          <h1 className="h-display" data-anim="fade-up" style={{ marginBottom: 32 }}>
            Inside the<br />DICT&nbsp;Budget
          </h1>
          <p
            className="lede"
            data-anim="fade-up"
            style={{ ['--delay' as string]: '250ms', maxWidth: '56ch', textAlign: 'center', marginTop: 8 }}
          >
            The Department of Information and Communications Technology asked Congress for ₱18.2 billion in
            fiscal year 2026 — the largest appropriation in its history. We read every line of every year since
            2020 to understand what changed, what got quietly defunded, and what the agency stopped trying to
            build.
          </p>
          <p
            className="dataline"
            data-anim="fade-up"
            style={{ ['--delay' as string]: '450ms', textAlign: 'center' }}
          >
            SOURCE: GENERAL APPROPRIATIONS ACT · DEPT 37 · 7 FISCAL YEARS · 4 BUREAUS · 91 PROGRAMS · ~5,400
            LINE ITEMS
          </p>
        </div>
      </section>

      {/* ===== 2 — The headline number ===== */}
      <section className="scene bg-paper-warm" data-title="₱18 billion">
        <div className="scene-inner">
          <p className="eyebrow">
            <span className="num">02</span> THE HEADLINE NUMBER
          </p>
          <h2 className="h-1" data-anim="fade-up">
            DICT will spend{' '}
            <span className="peso">₱</span>
            <span className="tick" data-target="18.22" data-decimals="2" data-suffix="B" data-dur="1800">
              0.00B
            </span>{' '}
            this year.
          </h2>
          <p
            className="body"
            data-anim="fade-up"
            style={{ ['--delay' as string]: '200ms', marginTop: 28 }}
          >
            That’s 61% more than what it spent in 2020 — a steeper rise than population, inflation, or total
            national appropriations. It is also 21% higher than 2025 alone. After two flat years and one cut
            year mid-decade, the department is back on a sharp upward curve.
          </p>
          <div
            className="stat-row"
            data-anim="fade-up"
            style={{ ['--delay' as string]: '350ms' }}
          >
            <div>
              <p className="num">
                ₱11.3<span style={{ fontSize: '.55em' }}>B</span>
              </p>
              <p className="lbl">FY 2020 · starting line</p>
            </div>
            <div>
              <p className="num">
                ₱9.5<span style={{ fontSize: '.55em' }}>B</span>
              </p>
              <p className="lbl">FY 2024 · 7-year low</p>
            </div>
            <div>
              <p className="num">
                ₱18.2<span style={{ fontSize: '.55em' }}>B</span>
              </p>
              <p className="lbl">FY 2026 · all-time high</p>
            </div>
          </div>
          <p className="dataline" data-anim="fade-up" style={{ ['--delay' as string]: '500ms' }}>
            But the topline obscures four very different stories underneath. Three of the four bureaus moved in
            directions you wouldn’t guess from the headline.
          </p>
        </div>
      </section>

      {/* ===== 3 — The four bureaus diverged ===== */}
      <section className="scene bg-ink" data-title="Four bureaus, four trajectories">
        <div className="scene-inner">
          <p className="eyebrow">
            <span className="num">03</span> THE FOUR BUREAUS
          </p>
          <h2 className="h-1 reveal-words" style={{ color: '#f1ebd9' }}>
            The department grew. Three of its four bureaus did not.
          </h2>
          <p
            className="body"
            data-anim="fade-up"
            style={{ ['--delay' as string]: '350ms', marginTop: 32 }}
          >
            The DICT is a holding company for four very different institutions. The biggest, the Office of the
            Secretary, runs the department’s flagship infrastructure programs. The other three — telecom
            regulation, privacy, cybercrime — have specialised, narrow mandates. Track them since 2020 and they
            tell four very different stories.
          </p>

          <div className="bureau-bars" data-anim="fade-up" style={{ ['--delay' as string]: '500ms' }}>
            <Link to="/programs?agency=37-001" className="bn scene-link">
              Office of the Secretary <small>OSEC · CORE ↗</small>
            </Link>
            <div className="br">
              <span className="bar-fill" style={{ width: '100%', background: 'var(--accent)' }}></span>
            </div>
            <div className="bv">
              ₱16.4B <span className="delta pos">+129% since 2020</span>
            </div>

            <Link to="/programs?agency=37-002" className="bn scene-link">
              National Telecommunications Commission <small>NTC · REGULATOR ↗</small>
            </Link>
            <div className="br">
              <span className="bar-fill" style={{ width: '4.6%', background: '#c8b890' }}></span>
            </div>
            <div className="bv">
              ₱755M <span className="delta neg">−81% since 2020</span>
            </div>

            <Link to="/programs?agency=37-004" className="bn scene-link">
              Cybercrime Investigation &amp; Coordination <small>CICC · NEW ↗</small>
            </Link>
            <div className="br">
              <span className="bar-fill" style={{ width: '3.5%', background: '#98d68a' }}></span>
            </div>
            <div className="bv">
              ₱579M <span className="delta pos">×51 since 2020</span>
            </div>

            <Link to="/programs?agency=37-003" className="bn scene-link">
              National Privacy Commission <small>NPC · NEW-ISH ↗</small>
            </Link>
            <div className="br">
              <span className="bar-fill" style={{ width: '2.7%', background: '#d8c0a0' }}></span>
            </div>
            <div className="bv">
              ₱441M <span className="delta pos">+88% since 2020</span>
            </div>
          </div>

          <p
            className="dataline"
            data-anim="fade-up"
            style={{ ['--delay' as string]: '700ms', color: '#a8a08a' }}
          >
            FY 2026 APPROPRIATION · BARS SCALED TO LARGEST BUREAU. THE OSEC ALONE COMMANDS 90% OF THE DICT
            BUDGET; THE OTHER THREE TOGETHER CLEAR JUST 10%.
          </p>
        </div>
      </section>

      {/* ===== 4 — NTC: the quiet defunding ===== */}
      <section className="scene bg-accent" data-title="The NTC story">
        <div className="scene-inner">
          <p className="eyebrow">
            <span className="num">04</span> A QUIET DEFUNDING
          </p>
          <h2 className="h-1" data-anim="fade-up" style={{ color: '#fbe8d0' }}>
            The country’s telecom regulator now runs on{' '}
            <em style={{ fontStyle: 'italic', color: '#fff' }}>one-fifth</em> of its 2020 budget.
          </h2>
          <p
            className="body"
            data-anim="fade-up"
            style={{ ['--delay' as string]: '250ms', marginTop: 28, color: '#f0d6b0' }}
          >
            In 2020, the National Telecommunications Commission had ₱3.91 billion to regulate the country’s
            mobile carriers, broadcasters, and frequency licences. Five years later, it has ₱755 million — a
            real-terms cut of more than 80%. The agency wasn’t reorganised. It wasn’t merged. It simply got
            smaller every year, and by 2021 had already lost most of what would ever be taken from it.
          </p>

          <svg
            viewBox="0 0 800 240"
            style={{ width: '100%', height: 'auto', marginTop: 36, maxHeight: 280 }}
            data-anim="fade"
            className="draw"
            preserveAspectRatio="none"
          >
            <line x1="0" y1="40" x2="800" y2="40" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <line x1="0" y1="120" x2="800" y2="120" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <line x1="0" y1="200" x2="800" y2="200" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <polyline
              points="0,40 133,184 267,191 400,189 533,168 667,184 800,176"
              fill="none"
              stroke="#fbe8d0"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <g fill="#fff">
              <circle cx="0" cy="40" r="5" />
              <circle cx="133" cy="184" r="5" />
              <circle cx="267" cy="191" r="5" />
              <circle cx="400" cy="189" r="5" />
              <circle cx="533" cy="168" r="5" />
              <circle cx="667" cy="184" r="5" />
              <circle cx="800" cy="176" r="5" />
            </g>
            <g style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fill: '#fbe8d0' }} textAnchor="middle">
              <text x="0" y="28">₱3.91B</text>
              <text x="133" y="172">₱695M</text>
              <text x="267" y="179">₱541M</text>
              <text x="400" y="177">₱561M</text>
              <text x="533" y="156">₱778M</text>
              <text x="667" y="172">₱578M</text>
              <text x="800" y="164">₱755M</text>
            </g>
            <g
              style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fill: 'rgba(251,232,208,0.7)' }}
              textAnchor="middle"
            >
              <text x="0" y="232">2020</text>
              <text x="133" y="232">2021</text>
              <text x="267" y="232">2022</text>
              <text x="400" y="232">2023</text>
              <text x="533" y="232">2024</text>
              <text x="667" y="232">2025</text>
              <text x="800" y="232">2026</text>
            </g>
          </svg>

          <p
            className="dataline"
            data-anim="fade-up"
            style={{ ['--delay' as string]: '700ms', color: 'rgba(243,217,182,0.8)' }}
          >
            NTC TOTAL APPROPRIATION, FY 2020 – 2026. ALL FIGURES IN PHP. THE 2020 → 2021 DROP — ₱3.22B IN A
            SINGLE YEAR — REMAINS UNEXPLAINED IN THE GAA NARRATIVE TEXT.
          </p>

          <div
            className="reading"
            data-anim="fade-up"
            style={{ ['--delay' as string]: '900ms', borderColor: 'rgba(255,255,255,0.4)' }}
          >
            <p className="h" style={{ color: '#fff', opacity: 1 }}>
              FOLLOW THE LINE ITEMS
            </p>
            <p className="b" style={{ color: '#f0d6b0' }}>
              The drop wasn’t a single big-ticket cancellation. NTC’s line-item count fell from 1,042 in 2020
              to 814 in 2026 — a 22% reduction. The same regulator now monitors more spectrum, more carriers,
              and a more crowded broadcast band with about a quarter of its former budget. The Senate did not
              hold a hearing on this between 2020 and 2026.
            </p>
            <p className="b" style={{ marginTop: 16 }}>
              <Link to="/objects?bureau=37-002" className="scene-link-inline" style={{ color: '#fff' }}>
                ↗ See every NTC line item
              </Link>
              <span style={{ opacity: 0.5, padding: '0 10px' }}>·</span>
              <Link to="/programs?agency=37-002" className="scene-link-inline" style={{ color: '#fff' }}>
                ↗ NTC programs
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ===== 5 — From builder to buyer ===== */}
      <section className="scene bg-paper-deep" data-title="Builder → buyer">
        <div className="scene-inner">
          <p className="eyebrow">
            <span className="num">05</span> FROM BUILDER TO BUYER
          </p>
          <h2 className="h-1" data-anim="fade-up">
            The DICT used to build infrastructure. <br />
            Now it mostly <em>pays for services</em>.
          </h2>
          <p className="body" data-anim="fade-up" style={{ ['--delay' as string]: '200ms', marginTop: 28 }}>
            Government budgets break down into three families: <strong>Personnel Services</strong> (PS —
            salaries), <strong>MOOE</strong> (operating expenses — internet bills, contractors, utilities,
            training), and <strong>Capital Outlays</strong> (CO — physical things you can point at: cell
            towers, data centres, fibre). For a department called <em>Information and Communications
            Technology</em>, you’d expect a heavy capital book. You wouldn’t be wrong. But you would be five
            years late.
          </p>

          <svg
            className="ec-chart"
            viewBox="0 0 900 360"
            preserveAspectRatio="none"
            data-anim="fade-up"
            style={{ ['--delay' as string]: '350ms' }}
          >
            <g style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', fill: 'var(--ink-3)' }}>
              <line x1="60" x2="880" y1="320" y2="320" stroke="var(--rule)" strokeWidth="1" />
              <line x1="60" x2="880" y1="240" y2="240" stroke="var(--rule-soft)" />
              <line x1="60" x2="880" y1="170" y2="170" stroke="var(--rule-soft)" />
              <line x1="60" x2="880" y1="100" y2="100" stroke="var(--rule-soft)" />
              <line x1="60" x2="880" y1="30" y2="30" stroke="var(--rule-soft)" />
              <text x="50" y="324" textAnchor="end">0</text>
              <text x="50" y="244" textAnchor="end">5B</text>
              <text x="50" y="174" textAnchor="end">10B</text>
              <text x="50" y="104" textAnchor="end">15B</text>
              <text x="50" y="34" textAnchor="end">20B</text>
            </g>
            {/* 2020 */}
            <g className="bar-fill" data-vert="">
              <rect x="80" y="304.3" width="80" height="15.7" fill="var(--ec-ps)" />
              <rect x="80" y="237.1" width="80" height="67.2" fill="var(--ec-mooe)" />
              <rect x="80" y="150.6" width="80" height="86.5" fill="var(--ec-co)" />
            </g>
            {/* 2021 */}
            <g className="bar-fill" data-vert="">
              <rect x="200" y="302.4" width="80" height="17.6" fill="var(--ec-ps)" />
              <rect x="200" y="241.1" width="80" height="61.3" fill="var(--ec-mooe)" />
              <rect x="200" y="138.6" width="80" height="102.5" fill="var(--ec-co)" />
            </g>
            {/* 2022 */}
            <g className="bar-fill" data-vert="">
              <rect x="320" y="298.2" width="80" height="21.8" fill="var(--ec-ps)" />
              <rect x="320" y="210.7" width="80" height="87.5" fill="var(--ec-mooe)" />
              <rect x="320" y="167.5" width="80" height="43.2" fill="var(--ec-co)" />
            </g>
            {/* 2023 */}
            <g className="bar-fill" data-vert="">
              <rect x="440" y="297.6" width="80" height="22.4" fill="var(--ec-ps)" />
              <rect x="440" y="183.7" width="80" height="113.9" fill="var(--ec-mooe)" />
              <rect x="440" y="157.3" width="80" height="26.4" fill="var(--ec-co)" />
            </g>
            {/* 2024 */}
            <g className="bar-fill" data-vert="">
              <rect x="560" y="298.3" width="80" height="21.7" fill="var(--ec-ps)" />
              <rect x="560" y="192.3" width="80" height="106.0" fill="var(--ec-mooe)" />
              <rect x="560" y="178.0" width="80" height="14.3" fill="var(--ec-co)" />
            </g>
            {/* 2025 */}
            <g className="bar-fill" data-vert="">
              <rect x="680" y="295.0" width="80" height="25.0" fill="var(--ec-ps)" />
              <rect x="680" y="146.4" width="80" height="148.6" fill="var(--ec-mooe)" />
              <rect x="680" y="94.7" width="80" height="51.7" fill="var(--ec-co)" />
            </g>
            {/* 2026 */}
            <g className="bar-fill" data-vert="">
              <rect x="800" y="293.9" width="80" height="26.1" fill="var(--ec-ps)" />
              <rect x="800" y="125.6" width="80" height="168.3" fill="var(--ec-mooe)" />
              <rect x="800" y="47.9" width="80" height="77.7" fill="var(--ec-co)" />
            </g>
            <g
              style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fill: 'var(--ink-3)' }}
              textAnchor="middle"
            >
              <text x="120" y="345">2020</text>
              <text x="240" y="345">2021</text>
              <text x="360" y="345">2022</text>
              <text x="480" y="345">2023</text>
              <text x="600" y="345">2024</text>
              <text x="720" y="345">2025</text>
              <text x="840" y="345">2026</text>
            </g>
          </svg>
          <div
            style={{ display: 'flex', gap: 24, marginTop: 18, fontFamily: 'var(--font-mono)', fontSize: 12 }}
          >
            <span>
              <span
                style={{
                  display: 'inline-block',
                  width: 10,
                  height: 10,
                  background: 'var(--ec-co)',
                  verticalAlign: 1,
                  marginRight: 6,
                }}
              ></span>
              Capital Outlays
            </span>
            <span>
              <span
                style={{
                  display: 'inline-block',
                  width: 10,
                  height: 10,
                  background: 'var(--ec-mooe)',
                  verticalAlign: 1,
                  marginRight: 6,
                }}
              ></span>
              MOOE — operating
            </span>
            <span>
              <span
                style={{
                  display: 'inline-block',
                  width: 10,
                  height: 10,
                  background: 'var(--ec-ps)',
                  verticalAlign: 1,
                  marginRight: 6,
                }}
              ></span>
              Personnel
            </span>
          </div>

          <p className="dataline" data-anim="fade-up" style={{ ['--delay' as string]: '600ms' }}>
            EXPENSE-CLASS COMPOSITION, FY 2020 – 2026. CAPITAL OUTLAYS PEAK AT ₱6.86B IN 2021 (57% OF THE
            BUDGET) AND CRATER TO ₱0.96B IN 2024 (10%). MOOE CLIMBS FROM ₱4.5B TO ₱11.3B IN THE SAME WINDOW.
          </p>
        </div>
      </section>

      {/* ===== 6 — Pull quote / pivot ===== */}
      <section className="scene bg-paper" data-title="Quote">
        <div className="scene-inner center">
          <p className="tag-line" data-anim="fade-up">
            THE INVERSION
          </p>
          <p
            className="epigraph"
            data-anim="fade-up"
            style={{ ['--delay' as string]: '200ms', maxWidth: '24ch', textAlign: 'center' }}
          >
            A capital budget became an electricity bill.
          </p>
          <p
            className="dataline"
            data-anim="fade-up"
            style={{
              ['--delay' as string]: '400ms',
              textAlign: 'center',
              marginTop: 40,
              maxWidth: '56ch',
            }}
          >
            The 2024 trough was not a one-year accident. From 2022 onwards, more than 80% of the DICT budget
            shifted into MOOE — recurring operating expenses the department doesn’t own and can’t reuse.
            Whatever the 2020 capital plan was, it stopped being executed in 2022.
          </p>
        </div>
      </section>

      {/* ===== 7 — Free Public Internet (the megastat) ===== */}
      <section className="scene bg-ink" data-title="₱5 billion for internet">
        <div className="scene-inner">
          <p className="eyebrow">
            <span className="num">07</span> THE BIGGEST SINGLE PROGRAM
          </p>
          <h2 className="h-2" style={{ color: '#f1ebd9' }} data-anim="fade-up">
            One program, in one bureau, in one fiscal year, will spend
          </h2>
          <p
            className="megastat"
            data-anim="fade-up"
            style={{ ['--delay' as string]: '250ms', color: '#fff' }}
          >
            <span className="peso" style={{ fontSize: '.5em', opacity: 0.6 }}>
              ₱
            </span>
            5.0<span className="unit">B</span>
          </p>
          <p
            className="body"
            data-anim="fade-up"
            style={{ ['--delay' as string]: '450ms', maxWidth: '60ch', color: '#d4cbb0' }}
          >
            That’s the FY 2026 appropriation for{' '}
            <strong style={{ color: '#fff' }}>Free Public Internet Access in Public Places</strong> — a single
            FPAP under the Office of the Secretary. It alone is bigger than the entire NTC, NPC, and CICC
            combined. It is roughly 27% of the department’s total budget.
          </p>
          <p
            className="dataline"
            data-anim="fade-up"
            style={{ ['--delay' as string]: '600ms', color: '#a8a08a' }}
          >
            THE PROGRAM EXPANDED FAST: ₱2.46B IN 2024 → ₱4.71B IN 2025 → ₱5.00B IN 2026. MOST OF IT IS BOOKED
            AS MOOE: AN INTERNET-SUBSCRIPTION LINE ITEM, NOT A NETWORK BUILD.
          </p>

          <div
            className="reading"
            data-anim="fade-up"
            style={{ ['--delay' as string]: '800ms', borderColor: 'rgba(255,255,255,0.4)' }}
          >
            <p className="h" style={{ color: '#fff', opacity: 1 }}>
              WHAT THIS MEANS
            </p>
            <p className="b" style={{ color: '#d4cbb0' }}>
              The department isn’t buying its own connectivity backbone. It is paying private carriers to
              provide free Wi-Fi at public sites, on annual contracts that recur every year. The asset never
              lives on DICT’s balance sheet. The cost compounds.
            </p>
            <p className="b" style={{ color: '#d4cbb0' }}>
              Cancel the program in 2027 and the public-internet network goes dark. Continue it for another
              five years and DICT will have spent more than ₱25 billion without owning a single kilometre of
              fibre.
            </p>
            <p className="b" style={{ marginTop: 16 }}>
              <Link to="/programs?q=internet" className="scene-link-inline" style={{ color: '#fff' }}>
                ↗ Free Public Internet across the years
              </Link>
              <span style={{ opacity: 0.5, padding: '0 10px' }}>·</span>
              <Link to="/data?q=internet" className="scene-link-inline" style={{ color: '#fff' }}>
                ↗ Internet line items in the raw data
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ===== 8 — CICC: spike and retreat ===== */}
      <section className="scene bg-paper-warm" data-title="CICC">
        <div className="scene-inner">
          <p className="eyebrow">
            <span className="num">08</span> A SPIKE, AND A RETREAT
          </p>
          <h2 className="h-1" data-anim="fade-up">
            Cybercrime got a windfall in 2025.
            <br />
            It’s already losing it.
          </h2>
          <p className="body" data-anim="fade-up" style={{ ['--delay' as string]: '200ms', marginTop: 24 }}>
            The Cybercrime Investigation and Coordination Center began life in 2020 with an annual budget of
            ₱11 million. Six years later, in 2025, it commanded ₱1.31 billion — a 117× expansion. Then, before
            the cycle finished playing out, FY 2026 cut it back to ₱579 million. Under the surface: a single
            anti-cybercrime program received a one-time augmentation, and lost it.
          </p>

          <svg
            className="spike-chart"
            viewBox="0 0 800 280"
            preserveAspectRatio="none"
            data-anim="fade-up"
            style={{ ['--delay' as string]: '350ms' }}
          >
            <g style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fill: 'var(--ink-3)' }}>
              <line x1="60" x2="780" y1="240" y2="240" stroke="var(--rule)" />
              <line x1="60" x2="780" y1="190" y2="190" stroke="var(--rule-soft)" />
              <line x1="60" x2="780" y1="140" y2="140" stroke="var(--rule-soft)" />
              <line x1="60" x2="780" y1="90" y2="90" stroke="var(--rule-soft)" />
              <line x1="60" x2="780" y1="40" y2="40" stroke="var(--rule-soft)" />
              <text x="50" y="244" textAnchor="end">0</text>
              <text x="50" y="194" textAnchor="end">₱330M</text>
              <text x="50" y="144" textAnchor="end">₱660M</text>
              <text x="50" y="94" textAnchor="end">₱990M</text>
              <text x="50" y="44" textAnchor="end">₱1.32B</text>
            </g>
            <g className="bar-fill" data-vert="">
              <rect x="92" y="238.3" width="60" height="1.7" fill="var(--accent)" />
              <rect x="195" y="238.2" width="60" height="1.8" fill="var(--accent)" />
              <rect x="298" y="184.3" width="60" height="55.7" fill="var(--accent)" />
              <rect x="401" y="186.3" width="60" height="53.7" fill="var(--accent)" />
              <rect x="504" y="167.8" width="60" height="72.2" fill="var(--accent)" />
              <rect x="607" y="40.0" width="60" height="200" fill="var(--accent)" />
              <rect x="710" y="151.8" width="60" height="88.2" fill="var(--accent)" />
            </g>
            <g style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fill: 'var(--ink-2)' }} textAnchor="middle">
              <text x="122" y="232">₱11M</text>
              <text x="225" y="232">₱12M</text>
              <text x="328" y="178">₱367M</text>
              <text x="431" y="180">₱353M</text>
              <text x="534" y="161">₱475M</text>
              <text x="637" y="32" fontWeight="700" fill="var(--accent-deep)">
                ₱1.31B
              </text>
              <text x="740" y="146">₱579M</text>
            </g>
            <g style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fill: 'var(--ink-3)' }} textAnchor="middle">
              <text x="122" y="266">2020</text>
              <text x="225" y="266">2021</text>
              <text x="328" y="266">2022</text>
              <text x="431" y="266">2023</text>
              <text x="534" y="266">2024</text>
              <text x="637" y="266" fontWeight="700" fill="var(--accent-deep)">
                2025
              </text>
              <text x="740" y="266">2026</text>
            </g>
          </svg>
          <p className="dataline" data-anim="fade-up" style={{ ['--delay' as string]: '600ms' }}>
            CICC TOTAL APPROPRIATION, FY 2020 – 2026. THE 2025 SPIKE IS NOT REPEATED IN THE 2026 GAA. ANY
            MULTI-YEAR PLAN BUILT AGAINST THE SPIKE NOW HAS TO BE COMPRESSED OR DEFERRED.
          </p>

          <p
            className="dataline scene-link-row"
            data-anim="fade-up"
            style={{ ['--delay' as string]: '750ms' }}
          >
            <Link to="/programs?agency=37-004" className="scene-link-inline">
              ↗ CICC programs in the portal
            </Link>
            <span className="scene-link-sep">·</span>
            <Link to="/objects?bureau=37-004" className="scene-link-inline">
              ↗ Every CICC line item
            </Link>
          </p>
        </div>
      </section>

      {/* ===== 9 — Programs that quietly ended ===== */}
      <section className="scene bg-paper" data-title="Programs that ended">
        <div className="scene-inner">
          <p className="eyebrow">
            <span className="num">09</span> WHAT GOT WOUND DOWN
          </p>
          <h2 className="h-1" data-anim="fade-up">
            Some programs didn’t get cut. <br />
            They just stopped showing up.
          </h2>
          <p className="body" data-anim="fade-up" style={{ ['--delay' as string]: '200ms', marginTop: 24 }}>
            Across seven years of GAAs, dozens of named DICT programs appeared, peaked, and quietly vanished —
            not always by official cancellation, often by being merged or renamed into something else,
            sometimes for less money. We followed the program codes that disappear from the books between FY
            2024 and FY 2026, and rebuilt their last-year totals.
          </p>

          <div className="pcards" data-anim="fade-up" style={{ ['--delay' as string]: '350ms' }}>
            <Link to="/data?q=Data+Center" className="pcard pcard-link">
              <p className="num">CODE 310100100002000 · OSEC ↗</p>
              <h3 className="name">National Government Data Center Infrastructure Program</h3>
              <p className="body">
                Last appears in FY 2022 with ₱432M; absent from 2024 onwards. The functions were folded into a
                renamed “ICT Infrastructure” program — at a fraction of the original allocation.
              </p>
              <div className="figrow">
                <span className="l">Last booked</span>
                <span className="v">₱432M · 2022</span>
              </div>
            </Link>

            <Link to="/data?q=Common+Platform" className="pcard pcard-link">
              <p className="num">CODE 310100100003000 · OSEC ↗</p>
              <h3 className="name">Government Common Platform &amp; Shared Services</h3>
              <p className="body">
                Booked at ₱890M in 2021 to consolidate agency systems. By 2026 the line item no longer exists;
                related work appears scattered under three smaller programs.
              </p>
              <div className="figrow">
                <span className="l">Last booked</span>
                <span className="v">₱890M · 2021</span>
              </div>
            </Link>

            <Link to="/programs?q=Broadband" className="pcard pcard-link">
              <p className="num">CODE 310100200001000 · OSEC ↗</p>
              <h3 className="name">National Broadband Plan — Phase I</h3>
              <p className="body">
                Reached ₱2.1B in 2021. Renamed into multiple successor lines and an IBRD loan-financed track,
                most of which obligate at lower per-year amounts than the original programme.
              </p>
              <div className="figrow">
                <span className="l">Last booked</span>
                <span className="v">₱2.10B · 2021</span>
              </div>
            </Link>

            <Link to="/programs?q=ICT+Industry" className="pcard pcard-link">
              <p className="num">CODE 310200100001000 · OSEC ↗</p>
              <h3 className="name">ICT Industry Promotion &amp; Capability Building</h3>
              <p className="body">
                Steady at ₱60–80M through 2023, then drops to ₱9M in 2024 and disappears from the 2026 GAA
                entirely. There is no replacement programme.
              </p>
              <div className="figrow">
                <span className="l">Last booked</span>
                <span className="v">₱9M · 2024</span>
              </div>
            </Link>
          </div>

          <p className="dataline" data-anim="fade-up" style={{ ['--delay' as string]: '600ms' }}>
            A CAVEAT: WE COULD ONLY FOLLOW PROGRAM CODES, NOT WORK PROGRAMMES. SOME OF THESE LIVES MAY HAVE
            CONTINUED UNDER NEW CODES. SEE METHODOLOGY ON THE PORTAL FOR HOW WE MERGED PROGRAM RENAMES.
          </p>
        </div>
      </section>

      {/* ===== 10 — A budget without a balance sheet ===== */}
      <section className="scene bg-gold" data-title="No balance sheet">
        <div className="scene-inner">
          <p className="eyebrow">
            <span className="num">10</span> NO BALANCE SHEET
          </p>
          <h2 className="h-1" data-anim="fade-up" style={{ color: '#fff' }}>
            The General Appropriations Act tells you what was <em>authorised</em>.<br />
            It does not tell you what was <em>built</em>.
          </h2>
          <p
            className="body"
            data-anim="fade-up"
            style={{ ['--delay' as string]: '250ms', marginTop: 28, color: '#f0d6b0' }}
          >
            Every figure on this site is a legal authority to spend, not a record of money out the door. Two
            budgets that look identical can produce wildly different outcomes if one is fully obligated and the
            other is forfeited at year-end. The DBM publishes obligation and disbursement reports separately.
            They are not in this dataset, and reconciling them is materially harder than reading the GAA.
          </p>
          <p
            className="body"
            data-anim="fade-up"
            style={{ ['--delay' as string]: '450ms', marginTop: 24, color: '#f0d6b0' }}
          >
            But the GAA is the document Congress votes on. It is, for most of the public, the only window
            into DICT’s plans before the year begins. What it shows since 2020: a department that has stopped
            trying to own the country’s digital infrastructure, and started renting it, annually, in full.
          </p>
        </div>
      </section>

      {/* ===== 11 — What to watch ===== */}
      <section className="scene bg-paper" data-title="What to watch">
        <div className="scene-inner">
          <p className="eyebrow">
            <span className="num">11</span> WHAT TO WATCH
          </p>
          <h2 className="h-1" data-anim="fade-up">
            Six things we’ll be following.
          </h2>

          <div className="pcards" data-anim="fade-up" style={{ ['--delay' as string]: '250ms' }}>
            <Link to="/programs?agency=37-002" className="pcard pcard-link" style={{ borderColor: 'var(--ink)' }}>
              <p className="num">01 · NTC ↗</p>
              <h3 className="name">Will the regulator ever recover?</h3>
              <p className="body">
                After six straight years below ₱1B, FY 2027 will say whether the 2020 cliff was permanent.
              </p>
            </Link>
            <Link to="/programs?agency=37-004" className="pcard pcard-link" style={{ borderColor: 'var(--ink)' }}>
              <p className="num">02 · CICC ↗</p>
              <h3 className="name">Was the 2025 spike a fluke?</h3>
              <p className="body">
                A 56% retreat in one year usually means a one-off project. We’ll look for the project name in
                2025 disbursement reports.
              </p>
            </Link>
            <Link to="/programs?q=internet" className="pcard pcard-link" style={{ borderColor: 'var(--ink)' }}>
              <p className="num">03 · INTERNET ↗</p>
              <h3 className="name">Free Public Internet — what gets bought?</h3>
              <p className="body">
                A ₱5B annual line item should produce a public list of beneficiary sites. The latest published
                list dates to 2023.
              </p>
            </Link>
            <Link to="/by-year" className="pcard pcard-link" style={{ borderColor: 'var(--ink)' }}>
              <p className="num">04 · CAPEX ↗</p>
              <h3 className="name">Will the 2026 capital lift hold?</h3>
              <p className="body">
                CO bounced back to ₱5.2B in 2026 after two years near zero. Watch obligation rates: a high
                authorised CO that doesn’t obligate is the same as no CO at all.
              </p>
            </Link>
            <Link to="/data?q=loan" className="pcard pcard-link" style={{ borderColor: 'var(--ink)' }}>
              <p className="num">05 · IBRD ↗</p>
              <h3 className="name">The loan-financed broadband track.</h3>
              <p className="body">
                Several DICT programs are now funded through a World Bank loan. This shifts capacity
                off-balance-sheet and creates new repayment liabilities.
              </p>
            </Link>
            <Link to="/programs?agency=37-003" className="pcard pcard-link" style={{ borderColor: 'var(--ink)' }}>
              <p className="num">06 · NPC ↗</p>
              <h3 className="name">Privacy Commission, doubled.</h3>
              <p className="body">
                NPC’s budget jumped 96% in 2024 and held. Quiet, but consequential — and it’s the smallest
                agency to grow without controversy.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 12 — Coda ===== */}
      <section className="scene bg-paper" data-title="Coda" style={{ minHeight: '80vh' }}>
        <div className="scene-inner">
          <div className="coda" style={{ padding: 0 }}>
            <p className="body">
              The DICT budget is, by design, a forecast of digital ambition. Year by year, line by line, it has
              been quietly retitled — from a builder’s ledger to a renter’s subscription. Whether that is a
              sound 21st-century strategy or an abandonment of public capacity is a question the appropriations
              document doesn’t answer.
              <br />
              <br />
              The data is here. The interpretation is yours.
            </p>
            <div className="crosslinks">
              <Link className="cross-link" to="/">
                ↗ EXPLORE THE DATA PORTAL
              </Link>
              <Link className="cross-link" to="/future">
                ↗ READ THE COUNTERPOINT
              </Link>
            </div>
            <p className="meta">
              REPORTED FROM THE GENERAL APPROPRIATIONS ACT · FY 2020 – 2026 · DEPARTMENT 37 · 4 BUREAUS · 91
              PROGRAMS
              <br />
              NOTHING ON THIS PAGE IS A FORECAST. ALL FIGURES ARE LEGAL APPROPRIATIONS, NOT OBLIGATIONS OR
              DISBURSEMENTS.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
