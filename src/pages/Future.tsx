import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useScrollytelling } from '../lib/scrollytelling';
import SiteFooter from '../components/SiteFooter';

const PAGE_STYLES = `
  .future-page {
    --teal: #1d6f9a;
    --teal-deep: #0d4f73;
    --ec-co: #1d6f9a;
  }

  .future-page .progress {
    position: fixed; top: 0; left: 0; height: 3px; width: 0;
    background: var(--slate); z-index: 100;
    transition: width 80ms linear;
  }
  .future-page .chrome {
    position: fixed; top: 0; left: 0; right: 0; z-index: 95;
    pointer-events: none; padding: 18px 28px;
    display: flex; justify-content: space-between;
    font-family: var(--font-mono); font-size: 10px;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--ink-3);
  }
  .future-page .chrome a { pointer-events: auto; color: inherit; text-decoration: none; border-bottom: 1px solid currentColor; padding-bottom: 1px; }

  .future-page .dataline {
    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.04em;
    color: var(--ink-3); margin-top: 22px; max-width: 60ch;
  }
  .future-page .bg-ink .dataline,
  .future-page .bg-slate .dataline { color: rgba(244,240,232,0.7); }

  .future-page .bg-slate { background: var(--slate-deep); color: #f4f0e8; }
  .future-page .bg-slate .lede { color: #d8d2c0; }
  .future-page .bg-slate .body { color: #c8c2b0; }

  .future-page .big-num {
    font-family: var(--font-display);
    font-weight: 600;
    font-size: clamp(120px, 24vw, 380px);
    line-height: 0.82;
    letter-spacing: -0.02em;
    margin: 0;
  }
  .future-page .big-num .small { font-size: 0.32em; opacity: 0.7; vertical-align: 0.4em; margin-left: 0.1em; }

  .future-page .strip {
    display: grid; grid-template-columns: repeat(4, 1fr);
    border-top: 1.5px solid currentColor; border-bottom: 1.5px solid currentColor;
    margin-top: 56px;
  }
  .future-page .strip > div { padding: 22px 24px; border-right: 1px solid currentColor; }
  .future-page .strip > div:last-child { border-right: none; }
  .future-page .strip .v {
    font-family: var(--font-display); font-weight: 500;
    font-size: clamp(38px, 4.5vw, 64px); line-height: 0.95; letter-spacing: -0.01em;
    margin: 0;
  }
  .future-page .strip .l {
    font-family: var(--font-mono); font-size: 10px;
    letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.7;
    margin: 12px 0 0;
  }

  .future-page .promises {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 0;
    border-top: 1.5px solid currentColor; margin-top: 48px;
  }
  .future-page .promise {
    padding: 32px 28px 28px;
    border-right: 1px solid currentColor;
    border-bottom: 1.5px solid currentColor;
  }
  .future-page .promise:nth-child(3n) { border-right: none; }
  .future-page .promise .num {
    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.18em;
    text-transform: uppercase; opacity: 0.6; margin: 0 0 18px;
  }
  .future-page .promise h3 {
    font-family: var(--font-display); font-weight: 500;
    font-size: clamp(28px, 2.8vw, 40px); line-height: 1.05; letter-spacing: -0.005em;
    margin: 0 0 14px;
  }
  .future-page .promise p {
    font-family: var(--font-serif); font-size: 16px; line-height: 1.55;
    margin: 0; color: var(--ink-2); max-width: 30ch;
  }
  .future-page .bg-slate .promise p { color: #c8c2b0; }
  .future-page .promise .figrow {
    display: flex; justify-content: space-between; align-items: baseline;
    margin-top: 22px; padding-top: 14px; border-top: 1px solid currentColor;
    opacity: 0.85;
  }
  .future-page .promise .figrow .v { font-family: var(--font-mono); font-weight: 600; font-size: 18px; }
  .future-page .promise .figrow .l { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; opacity: 0.7; }

  .future-page .traj { width: 100%; height: 360px; margin-top: 40px; }
  .future-page .traj text { font-family: var(--font-mono); font-size: 11px; }

  .future-page .pull {
    font-family: var(--font-serif); font-style: italic; font-weight: 300;
    font-size: clamp(28px, 3.4vw, 50px);
    line-height: 1.18; letter-spacing: -0.005em;
    max-width: 22ch; margin: 0;
  }

  .future-page .reach-grid {
    display: grid; grid-template-columns: repeat(20, 1fr);
    gap: 4px; margin-top: 28px; max-width: 720px;
  }
  .future-page .reach-grid .dot {
    aspect-ratio: 1; background: var(--rule);
    transition: background .8s var(--delay, 0ms) ease-out;
  }
  .future-page .in .reach-grid .dot.on { background: var(--teal); }
  .future-page .in .reach-grid .dot.warm { background: var(--ochre); }

  .future-page .coda {
    padding: 140px 6vw 120px; background: var(--paper);
    text-align: center;
  }
  .future-page .coda .body {
    max-width: 60ch; margin: 0 auto;
    font-family: var(--font-serif); font-style: italic; font-weight: 300;
    font-size: 22px; line-height: 1.5; color: var(--ink-2);
  }
  .future-page .coda .meta {
    margin-top: 56px; font-family: var(--font-mono);
    font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--ink-3);
  }
  .future-page .coda .crosslinks { display: flex; justify-content: center; gap: 16px; margin-top: 32px; }
  .future-page .coda .cross-link {
    border: 1px solid var(--ink); padding: 12px 20px; background: var(--paper);
    font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.1em;
    text-transform: uppercase; color: var(--ink); text-decoration: none;
    transition: background .12s, color .12s;
  }
  .future-page .coda .cross-link:hover { background: var(--ink); color: var(--paper); }
`;

function useReachGrid() {
  useEffect(() => {
    const grid = document.querySelector<HTMLElement>('.reach-grid');
    if (!grid || grid.childElementCount > 0) return;
    grid.innerHTML = '';
    const total = 200;
    for (let i = 0; i < total; i++) {
      const d = document.createElement('div');
      d.className = 'dot';
      const m = i % 7;
      if (m === 4) d.classList.add('warm');
      else if (m !== 5 && m !== 6) d.classList.add('on');
      d.style.setProperty('--delay', i * 6 + 'ms');
      grid.appendChild(d);
    }
  }, []);
}

export default function Future() {
  useScrollytelling();
  useReachGrid();

  return (
    <div className="future-page">
      <style>{PAGE_STYLES}</style>

      <div className="progress"></div>
      <div className="chrome">
        <span>A BUDGET FOR THE DIGITAL FUTURE</span>
        <span>
          <Link to="/">↗ DATA PORTAL</Link>
        </span>
      </div>
      <div className="piprail"></div>

      {/* ===== 1 — Cover ===== */}
      <section className="scene bg-paper" data-title="Cover">
        <div className="scene-inner center">
          <p className="eyebrow">
            <span className="num">01</span> A BUDGET STORY · FY 2020 – 2026
          </p>
          <h1
            className="h-display"
            style={{ fontStyle: 'normal', textTransform: 'uppercase', letterSpacing: '-0.02em' }}
            data-anim="fade-up"
          >
            A Budget for the<br />Digital Future
          </h1>
          <p
            className="lede"
            data-anim="fade-up"
            style={{
              ['--delay' as string]: '250ms',
              maxWidth: '54ch',
              textAlign: 'center',
              fontStyle: 'italic',
            }}
          >
            In the seven fiscal years from 2020 to 2026, the Department of Information and Communications
            Technology grew from an ₱11.3-billion line item into the country’s ₱18.2-billion engine for digital
            transformation. This is the story of where the money is going next.
          </p>
          <p
            className="dataline"
            data-anim="fade-up"
            style={{ ['--delay' as string]: '450ms', textAlign: 'center' }}
          >
            SOURCE: GENERAL APPROPRIATIONS ACT · DEPT 37 · FY 2020 – 2026
          </p>
        </div>
      </section>

      {/* ===== 2 — The headline ===== */}
      <section className="scene bg-paper-warm" data-title="₱18.2 billion">
        <div className="scene-inner">
          <p className="eyebrow">
            <span className="num">02</span> THE NUMBER
          </p>
          <p className="kicker" data-anim="fade-up" style={{ marginBottom: 0 }}>
            FY 2026 APPROPRIATION
          </p>
          <h2
            className="big-num"
            data-anim="fade-up"
            style={{ ['--delay' as string]: '150ms', color: 'var(--slate-deep)' }}
          >
            ₱
            <span className="tick" data-target="18.22" data-decimals="2" data-dur="1800">
              0.00
            </span>
            <span className="small">B</span>
          </h2>
          <p className="lede" data-anim="fade-up" style={{ ['--delay' as string]: '350ms', marginTop: 32 }}>
            That’s 61 percent more than DICT spent in 2020 — a faster ramp than national appropriations,
            faster than inflation, faster than population. After two flat years and a 2024 dip, the
            department’s budget has accelerated into the largest authorisation it has ever held.
          </p>
          <div
            className="strip"
            data-anim="fade-up"
            style={{ ['--delay' as string]: '500ms', borderColor: 'var(--ink)' }}
          >
            <div>
              <p className="v">
                ₱11.3<span style={{ fontSize: '.5em' }}>B</span>
              </p>
              <p className="l">FY 2020</p>
            </div>
            <div>
              <p className="v">
                +₱6.9<span style={{ fontSize: '.5em' }}>B</span>
              </p>
              <p className="l">added by FY 2026</p>
            </div>
            <div>
              <p className="v">
                +61<span style={{ fontSize: '.5em' }}>%</span>
              </p>
              <p className="l">growth · seven years</p>
            </div>
            <div>
              <p className="v">
                +21<span style={{ fontSize: '.5em' }}>%</span>
              </p>
              <p className="l">2025 → 2026 alone</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3 — Trajectory chart ===== */}
      <section className="scene bg-paper" data-title="The trajectory">
        <div className="scene-inner">
          <p className="eyebrow">
            <span className="num">03</span> THE TRAJECTORY
          </p>
          <h2 className="h-1" data-anim="fade-up">
            A seven-year arc, in seven bars.
          </h2>
          <p
            className="body"
            data-anim="fade-up"
            style={{ ['--delay' as string]: '200ms', marginTop: 24, fontFamily: 'var(--font-serif)' }}
          >
            Each bar is a single fiscal year of the General Appropriations Act, restricted to Department 37.
            The figure is in pesos, in billions. The 2024 dip — a result of post-pandemic fiscal tightening —
            is the only down year in the series.
          </p>

          <svg
            className="traj"
            viewBox="0 0 900 360"
            preserveAspectRatio="none"
            data-anim="fade-up"
            style={{ ['--delay' as string]: '350ms' }}
          >
            <g style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fill: 'var(--ink-3)' }}>
              <line x1="60" x2="880" y1="320" y2="320" stroke="var(--rule)" />
              <line x1="60" x2="880" y1="245" y2="245" stroke="var(--rule-soft)" />
              <line x1="60" x2="880" y1="170" y2="170" stroke="var(--rule-soft)" />
              <line x1="60" x2="880" y1="95" y2="95" stroke="var(--rule-soft)" />
              <line x1="60" x2="880" y1="20" y2="20" stroke="var(--rule-soft)" />
              <text x="50" y="324" textAnchor="end">0</text>
              <text x="50" y="249" textAnchor="end">5B</text>
              <text x="50" y="174" textAnchor="end">10B</text>
              <text x="50" y="99" textAnchor="end">15B</text>
              <text x="50" y="24" textAnchor="end">20B</text>
            </g>
            <g className="bar-fill" data-vert="">
              <rect x="92" y="150" width="80" height="170" fill="var(--slate)" />
              <rect x="212" y="138.1" width="80" height="181.9" fill="var(--slate)" />
              <rect x="332" y="167" width="80" height="153" fill="var(--slate)" />
              <rect x="452" y="156.8" width="80" height="163.2" fill="var(--slate)" />
              <rect x="572" y="177.4" width="80" height="142.6" fill="var(--slate)" />
              <rect x="692" y="93.5" width="80" height="226.5" fill="var(--slate)" />
              <rect x="812" y="46.7" width="80" height="273.3" fill="var(--accent)" />
            </g>
            <g
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '18px',
                fontWeight: 500,
                fill: 'var(--ink)',
              }}
              textAnchor="middle"
            >
              <text x="132" y="142">₱11.3B</text>
              <text x="252" y="130">₱12.1B</text>
              <text x="372" y="159">₱10.2B</text>
              <text x="492" y="148">₱10.9B</text>
              <text x="612" y="170">₱9.5B</text>
              <text x="732" y="86">₱15.1B</text>
              <text x="852" y="38" fill="var(--accent-deep)" fontWeight="600">
                ₱18.2B
              </text>
            </g>
            <g style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fill: 'var(--ink-3)' }} textAnchor="middle">
              <text x="132" y="345">2020</text>
              <text x="252" y="345">2021</text>
              <text x="372" y="345">2022</text>
              <text x="492" y="345">2023</text>
              <text x="612" y="345">2024</text>
              <text x="732" y="345">2025</text>
              <text x="852" y="345" fill="var(--accent-deep)" fontWeight="600">
                2026
              </text>
            </g>
          </svg>
          <p className="dataline" data-anim="fade-up" style={{ ['--delay' as string]: '600ms' }}>
            DICT TOTAL APPROPRIATION · FY 2020 – 2026 · IN PESOS BILLIONS · GENERAL APPROPRIATIONS ACT
          </p>
        </div>
      </section>

      {/* ===== 4 — Pull / promise ===== */}
      <section className="scene bg-slate" data-title="A budget is a promise">
        <div className="scene-inner center">
          <p className="kicker" data-anim="fade-up" style={{ color: '#a8b8c8' }}>
            A NATION’S BUDGET IS, IN THE END
          </p>
          <p
            className="pull"
            data-anim="fade-up"
            style={{
              ['--delay' as string]: '150ms',
              color: '#f4f0e8',
              textAlign: 'center',
              maxWidth: '22ch',
            }}
          >
            A schedule of promises about the kind of country it intends to be.
          </p>
          <p
            className="dataline"
            data-anim="fade-up"
            style={{
              ['--delay' as string]: '350ms',
              color: 'rgba(244,240,232,0.7)',
              textAlign: 'center',
              maxWidth: '54ch',
            }}
          >
            The DICT’s ₱18-billion FY 2026 promise breaks down into six big commitments — public connectivity,
            cybersecurity, privacy, regulation, government services, and human capital. Each one is a line in
            the GAA. Each one will be measured.
          </p>
        </div>
      </section>

      {/* ===== 5 — The six promises ===== */}
      <section className="scene bg-paper" data-title="Six promises">
        <div className="scene-inner">
          <p className="eyebrow">
            <span className="num">05</span> THE SIX PROMISES
          </p>
          <h2 className="h-1" data-anim="fade-up">
            Where the ₱18.2 billion goes.
          </h2>
          <p
            className="body"
            data-anim="fade-up"
            style={{
              ['--delay' as string]: '200ms',
              marginTop: 24,
              maxWidth: '62ch',
              fontFamily: 'var(--font-serif)',
            }}
          >
            Six commitments account for nearly the entire FY 2026 budget. The largest is also the most visible:
            free public Wi-Fi at thousands of beneficiary sites. The smallest, line for line, may be the most
            consequential — privacy and cybercrime regulators that didn’t exist a decade ago.
          </p>

          <div
            className="promises"
            data-anim="fade-up"
            style={{ ['--delay' as string]: '350ms', borderColor: 'var(--ink)' }}
          >
            <Link to="/programs?q=internet" className="promise promise-link">
              <p className="num">01 · ₱5.0B ↗</p>
              <h3>Free Public Internet</h3>
              <p>
                Connectivity at public places — schools, plazas, transport terminals — paid for through annual
                carrier subscriptions.
              </p>
              <div className="figrow">
                <span className="l">share of FY26</span>
                <span className="v">27%</span>
              </div>
            </Link>
            <Link to="/programs?q=Network" className="promise promise-link">
              <p className="num">02 · ₱4.5B ↗</p>
              <h3>Government Networks &amp; Cloud</h3>
              <p>
                The shared connectivity backbone, data-centre operations, and the gov-cloud platform that hosts
                agency systems.
              </p>
              <div className="figrow">
                <span className="l">share of FY26</span>
                <span className="v">25%</span>
              </div>
            </Link>
            <Link to="/programs?q=Digital+Government" className="promise promise-link">
              <p className="num">03 · ₱2.8B ↗</p>
              <h3>Digital Government Services</h3>
              <p>
                e-Gov apps, the National ID integration layer, eGovPH, and the long-running national broadband
                initiative.
              </p>
              <div className="figrow">
                <span className="l">share of FY26</span>
                <span className="v">15%</span>
              </div>
            </Link>
            <Link to="/programs?q=ICT" className="promise promise-link">
              <p className="num">04 · ₱1.4B ↗</p>
              <h3>ICT Industry &amp; Talent</h3>
              <p>
                Capability-building, startup grants, and digital-skills programmes that prepare the workforce
                for the next decade.
              </p>
              <div className="figrow">
                <span className="l">share of FY26</span>
                <span className="v">8%</span>
              </div>
            </Link>
            <Link to="/programs?agency=37-004" className="promise promise-link">
              <p className="num">05 · ₱1.0B ↗</p>
              <h3>Cybersecurity &amp; Cybercrime</h3>
              <p>
                The CICC’s investigation centre, the National Cybersecurity Plan, and incident-response
                capacity across critical sectors.
              </p>
              <div className="figrow">
                <span className="l">share of FY26</span>
                <span className="v">5%</span>
              </div>
            </Link>
            <Link to="/programs?agency=37-003" className="promise promise-link">
              <p className="num">06 · ₱1.2B ↗</p>
              <h3>Privacy &amp; Telecom Regulation</h3>
              <p>
                The two independent commissions — NPC and NTC — that protect citizens and license the
                country’s carriers.
              </p>
              <div className="figrow">
                <span className="l">share of FY26</span>
                <span className="v">7%</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== 6 — Connectivity at scale ===== */}
      <section className="scene bg-slate" data-title="Connectivity at scale">
        <div className="scene-inner">
          <p className="eyebrow">
            <span className="num">06</span> CONNECTIVITY AT SCALE
          </p>
          <h2 className="h-1" data-anim="fade-up" style={{ color: '#f4f0e8' }}>
            ₱5 billion is the price of a connected country.
          </h2>
          <p
            className="body"
            data-anim="fade-up"
            style={{
              ['--delay' as string]: '200ms',
              marginTop: 24,
              maxWidth: '60ch',
              fontFamily: 'var(--font-serif)',
            }}
          >
            The largest single FPAP in the FY 2026 GAA is the Free Public Internet Access programme — a
            ₱5-billion annual commitment to keep public Wi-Fi running at schools, government offices, and
            transport hubs across every region of the country.
          </p>

          <div className="reach-grid" data-anim="fade-up" style={{ ['--delay' as string]: '400ms' }}></div>

          <p
            className="dataline"
            data-anim="fade-up"
            style={{ ['--delay' as string]: '700ms', color: 'rgba(244,240,232,0.7)' }}
          >
            EACH SQUARE REPRESENTS A CLUSTER OF BENEFICIARY SITES (ILLUSTRATIVE). LIT SQUARES INDICATE THE
            PORTION ACTIVE UNDER THE FY 2026 SUBSCRIPTION ENVELOPE. SOURCE: PROGRAM CODE 320200200001000.
          </p>

          <p
            className="dataline scene-link-row"
            data-anim="fade-up"
            style={{ ['--delay' as string]: '850ms' }}
          >
            <Link to="/programs?q=internet" className="scene-link-inline" style={{ color: '#fff' }}>
              ↗ Free Public Internet across the years
            </Link>
            <span className="scene-link-sep" style={{ color: 'rgba(244,240,232,0.5)' }}>·</span>
            <Link to="/data?q=internet" className="scene-link-inline" style={{ color: '#fff' }}>
              ↗ Internet line items in the raw data
            </Link>
          </p>
        </div>
      </section>

      {/* ===== 7 — Capital returns ===== */}
      <section className="scene bg-paper-warm" data-title="Capital returns">
        <div className="scene-inner">
          <p className="eyebrow">
            <span className="num">07</span> CAPITAL RETURNS
          </p>
          <h2 className="h-1" data-anim="fade-up">
            After two lean years, capital outlays are back.
          </h2>
          <p
            className="body"
            data-anim="fade-up"
            style={{
              ['--delay' as string]: '200ms',
              marginTop: 24,
              maxWidth: '60ch',
              fontFamily: 'var(--font-serif)',
            }}
          >
            Capital Outlays — the budget category for things you can build, own and depreciate — bottomed at{' '}
            <strong>₱0.96B in FY 2024</strong>. The FY 2026 GAA brings them back to <strong>₱5.20B</strong>.
            Most of that lift funds the IBRD-loan-financed broadband expansion and a wave of regional
            data-centre upgrades.
          </p>

          <div
            className="strip"
            data-anim="fade-up"
            style={{ ['--delay' as string]: '350ms', borderColor: 'var(--ink)' }}
          >
            <div>
              <p className="v">
                ₱0.96<span style={{ fontSize: '.5em' }}>B</span>
              </p>
              <p className="l">FY 2024 trough</p>
            </div>
            <div>
              <p className="v">
                ₱3.46<span style={{ fontSize: '.5em' }}>B</span>
              </p>
              <p className="l">FY 2025</p>
            </div>
            <div>
              <p className="v">
                ₱5.20<span style={{ fontSize: '.5em' }}>B</span>
              </p>
              <p className="l">FY 2026</p>
            </div>
            <div>
              <p className="v">×5.4</p>
              <p className="l">two-year recovery</p>
            </div>
          </div>

          <p className="dataline" data-anim="fade-up" style={{ ['--delay' as string]: '500ms' }}>
            CAPITAL OUTLAYS — ALL DICT BUREAUS · APPROPRIATIONS, NOT YET OBLIGATIONS · OBLIGATION RATES
            PUBLISHED SEPARATELY BY DBM
          </p>

          <p
            className="dataline scene-link-row"
            data-anim="fade-up"
            style={{ ['--delay' as string]: '650ms' }}
          >
            <Link to="/by-year" className="scene-link-inline">
              ↗ Capital outlays in the by-year breakdown
            </Link>
          </p>
        </div>
      </section>

      {/* ===== 8 — Privacy, quietly compounding ===== */}
      <section className="scene bg-paper" data-title="Privacy, compounding">
        <div className="scene-inner">
          <p className="eyebrow">
            <span className="num">08</span> PRIVACY, COMPOUNDING
          </p>
          <h2 className="h-1" data-anim="fade-up">
            The quietest budget line is also the fastest-growing institution.
          </h2>
          <p
            className="body"
            data-anim="fade-up"
            style={{
              ['--delay' as string]: '200ms',
              marginTop: 24,
              maxWidth: '60ch',
              fontFamily: 'var(--font-serif)',
            }}
          >
            The National Privacy Commission’s appropriation grew from ₱235M in 2020 to ₱441M in 2026 — a 88%
            expansion that took place without a single high-profile policy fight. With the Data Privacy Act
            now a decade old, the NPC quietly took on enforcement against a digital economy that didn’t exist
            when it was first chartered.
          </p>

          <div
            className="strip"
            data-anim="fade-up"
            style={{ ['--delay' as string]: '350ms', borderColor: 'var(--ink)' }}
          >
            <div>
              <p className="v">
                ₱235<span style={{ fontSize: '.5em' }}>M</span>
              </p>
              <p className="l">FY 2020</p>
            </div>
            <div>
              <p className="v">
                ₱448<span style={{ fontSize: '.5em' }}>M</span>
              </p>
              <p className="l">FY 2024 · first jump</p>
            </div>
            <div>
              <p className="v">
                ₱441<span style={{ fontSize: '.5em' }}>M</span>
              </p>
              <p className="l">FY 2026</p>
            </div>
            <div>
              <p className="v">
                +88<span style={{ fontSize: '.5em' }}>%</span>
              </p>
              <p className="l">7-year growth</p>
            </div>
          </div>

          <p className="dataline" data-anim="fade-up" style={{ ['--delay' as string]: '500ms' }}>
            NATIONAL PRIVACY COMMISSION — TOTAL APPROPRIATION · 2024 INCLUDES A ONE-OFF ₱100M
            ENFORCEMENT-CAPACITY UPLIFT WHICH WAS PARTIALLY ROLLED BACK IN 2025.
          </p>

          <p
            className="dataline scene-link-row"
            data-anim="fade-up"
            style={{ ['--delay' as string]: '650ms' }}
          >
            <Link to="/programs?agency=37-003" className="scene-link-inline">
              ↗ NPC programs in the portal
            </Link>
            <span className="scene-link-sep">·</span>
            <Link to="/objects?bureau=37-003" className="scene-link-inline">
              ↗ Every NPC line item
            </Link>
          </p>
        </div>
      </section>

      {/* ===== 9 — Cybersecurity comes online ===== */}
      <section className="scene bg-paper-warm" data-title="Cybersecurity">
        <div className="scene-inner">
          <p className="eyebrow">
            <span className="num">09</span> CYBERSECURITY COMES ONLINE
          </p>
          <h2 className="h-1" data-anim="fade-up">
            A new institution, built in seven years.
          </h2>
          <p
            className="body"
            data-anim="fade-up"
            style={{
              ['--delay' as string]: '200ms',
              marginTop: 24,
              maxWidth: '60ch',
              fontFamily: 'var(--font-serif)',
            }}
          >
            The Cybercrime Investigation and Coordination Center began the period with ₱11M and a small office.
            In 2025 it commanded ₱1.31B — financed partly by a one-time mission-specific augmentation. Even
            after a 56% rollback to ₱579M in 2026, the agency operates at <strong>51× its 2020 size</strong> —
            the fastest institutional build-out anywhere in the DICT.
          </p>

          <div
            className="strip"
            data-anim="fade-up"
            style={{ ['--delay' as string]: '350ms', borderColor: 'var(--ink)' }}
          >
            <div>
              <p className="v">
                ₱11<span style={{ fontSize: '.5em' }}>M</span>
              </p>
              <p className="l">FY 2020 · founding</p>
            </div>
            <div>
              <p className="v">
                ₱1.31<span style={{ fontSize: '.5em' }}>B</span>
              </p>
              <p className="l">FY 2025 · peak</p>
            </div>
            <div>
              <p className="v">
                ₱579<span style={{ fontSize: '.5em' }}>M</span>
              </p>
              <p className="l">FY 2026 · steady</p>
            </div>
            <div>
              <p className="v">×51</p>
              <p className="l">7-year multiple</p>
            </div>
          </div>

          <p
            className="dataline scene-link-row"
            data-anim="fade-up"
            style={{ ['--delay' as string]: '500ms' }}
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

      {/* ===== 10 — A digital decade ===== */}
      <section className="scene bg-slate" data-title="A digital decade">
        <div className="scene-inner center">
          <p className="kicker" data-anim="fade-up" style={{ color: '#a8b8c8' }}>
            LOOKING AHEAD
          </p>
          <p
            className="pull"
            data-anim="fade-up"
            style={{
              ['--delay' as string]: '150ms',
              color: '#f4f0e8',
              textAlign: 'center',
              maxWidth: '26ch',
            }}
          >
            A digital decade does not get budgeted in a single year — but in 2026 it gets seriously funded.
          </p>
          <p
            className="dataline"
            data-anim="fade-up"
            style={{
              ['--delay' as string]: '350ms',
              color: 'rgba(244,240,232,0.7)',
              textAlign: 'center',
              maxWidth: '56ch',
              marginTop: 36,
            }}
          >
            The capital book is rebuilding. Privacy and cybercrime have institutional weight. The
            free-public-internet programme is keeping connectivity in the public square. Whether each promise
            is fully delivered is a question for the obligation reports — but the appropriation is on the
            books.
          </p>
        </div>
      </section>

      {/* ===== 11 — Coda ===== */}
      <section className="scene bg-paper" data-title="Coda" style={{ minHeight: '80vh' }}>
        <div className="scene-inner">
          <div className="coda" style={{ padding: 0, background: 'transparent' }}>
            <p className="body">
              Every figure on this page is an appropriation — Congress’s authority to spend, recorded in the
              General Appropriations Act. Whether the programmes that follow it deliver the country a
              connected, privacy-respecting, secure digital decade is now a matter of execution.
              <br />
              <br />
              The promise has been costed. The work begins.
            </p>
            <div className="crosslinks">
              <Link className="cross-link" to="/">
                ↗ EXPLORE THE DATA
              </Link>
              <Link className="cross-link" to="/review">
                ↗ READ THE REVIEW
              </Link>
            </div>
            <p className="meta">
              SOURCED FROM THE GENERAL APPROPRIATIONS ACT · FY 2020 – 2026 · DEPARTMENT 37
              <br />
              ALL FIGURES ARE LEGAL APPROPRIATIONS. OBLIGATION AND DISBURSEMENT FIGURES ARE PUBLISHED
              SEPARATELY BY DBM.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
