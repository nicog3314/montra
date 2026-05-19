import { useState } from "react";

// Color palette:
// #36413E – Iron Grey
// #ECBEB4 – Cotton Rose
// #869D96 – Muted Teal
// #885053 – Smoky Rose
// #611C35 – Crimson Violet

export default function MontraLanding() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const cards = [
    {
      title: "Expense Tracking",
      description:
        "Visualize your spending patterns with intelligent categorization and real-time insights.",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
          <rect x="6" y="14" width="36" height="26" rx="4" stroke="#885053" strokeWidth="2.5" />
          <path d="M6 20h36" stroke="#885053" strokeWidth="2.5" />
          <circle cx="16" cy="32" r="3" fill="#885053" />
          <path d="M24 29h10M24 35h6" stroke="#885053" strokeWidth="2" strokeLinecap="round" />
          <path d="M16 8v6M24 6v8M32 8v6" stroke="#885053" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: "Fraud Detection",
      description:
        "AI-powered anomaly detection monitors your transactions 24/7 and alerts you to suspicious activity.",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
          <path
            d="M24 6L8 13v12c0 9.4 6.8 18.2 16 20.4C33.2 43.2 40 34.4 40 25V13L24 6z"
            stroke="#885053"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path d="M17 24l5 5 9-9" stroke="#885053" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "Smart Budgeting",
      description:
        "Set dynamic budgets that adapt to your lifestyle and get proactive recommendations to meet your goals.",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
          <circle cx="24" cy="24" r="16" stroke="#885053" strokeWidth="2.5" />
          <path d="M24 14v10l6 4" stroke="#885053" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 8l4 4M36 8l-4 4" stroke="#885053" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        width: "100%",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body, html { width: 100%; overflow-x: hidden; }

        .montra-logo {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 300;
          letter-spacing: 0.25em;
          font-size: 1.1rem;
          color: #ECBEB4;
        }

        .nav-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 400;
          color: #ECBEB4;
          letter-spacing: 0.06em;
          text-decoration: none;
          transition: color 0.2s;
        }
        .nav-link:hover { color: #fff; }

        .teal-stripe {
          background-color: #869D96;
          height: 6px;
          width: 100%;
          flex-shrink: 0;
        }

        .hero-section {
          background: #36413E;
          position: relative;
          overflow: hidden;
          width: 100%;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 60%, rgba(134,157,150,0.18) 0%, transparent 65%);
          pointer-events: none;
        }

        .hero-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 300;
          font-size: clamp(3.5rem, 7vw, 6rem);
          letter-spacing: 0.22em;
          color: #ECBEB4;
          line-height: 1;
          text-align: center;
        }

        .hero-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          font-size: 0.9rem;
          color: #869D96;
          letter-spacing: 0.07em;
          line-height: 1.85;
          text-align: center;
        }

        .cta-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #36413E;
          background: #ECBEB4;
          border: none;
          padding: 0.7rem 1.9rem;
          border-radius: 2px;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }
        .cta-btn:hover { background: #e0a89c; transform: scale(1.02); }

        .outline-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #ECBEB4;
          background: transparent;
          border: 1px solid #ECBEB4;
          padding: 0.7rem 1.9rem;
          border-radius: 2px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, transform 0.15s;
        }
        .outline-btn:hover {
          background: #ECBEB4;
          color: #36413E;
          transform: scale(1.02);
        }

        .cards-section {
          background: #fff;
          width: 100%;
        }

        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .feature-card {
          background: #ECBEB4;
          border-radius: 24px;
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1rem;
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease;
          cursor: default;
        }
        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px rgba(54,65,62,0.18);
        }

        .card-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 400;
          font-size: 1.4rem;
          color: #36413E;
          letter-spacing: 0.05em;
        }

        .card-desc {
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          font-size: 0.82rem;
          color: #611C35;
          line-height: 1.75;
        }

        .footer-bar {
          width: 100%;
          border-top: 1px solid #ECBEB4;
          padding: 1.4rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #fff;
          font-family: 'DM Sans', sans-serif;
        }

        .footer-text {
          font-size: 0.72rem;
          color: #885053;
          letter-spacing: 0.06em;
        }

        .footer-link {
          font-size: 0.72rem;
          color: #885053;
          letter-spacing: 0.06em;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-link:hover { color: #611C35; }
      `}</style>

      {/* ── Top nav bar ── */}
      <header
        style={{
          width: "100%",
          background: "#36413E",
          padding: "0.75rem 2rem",
          minHeight: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}
      >
        <span className="montra-logo">Montra.</span>
        <nav style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <a href="#" className="nav-link">Login</a>
          <span className="nav-link" style={{ opacity: 0.3 }}>|</span>
          <a href="#" className="nav-link">Sign up</a>
        </nav>
      </header>

      {/* Thin white gap matching wireframe */}
      <div style={{ height: 28, background: "#fff", flexShrink: 0 }} />

      {/* Top teal stripe */}
      <div className="teal-stripe" />

      {/* ── Hero ── */}
      <section className="hero-section" style={{ padding: "6rem 2rem" }}>
        <div
          style={{
            maxWidth: 860,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.25rem",
            position: "relative",
            zIndex: 1,
          }}
        >
          <h1 className="hero-title">
            Montra<span style={{ fontStyle: "italic" }}>.</span>
          </h1>
          <p className="hero-subtitle" style={{ maxWidth: 400 }}>
            A Secure Personal Finance and Fraud<br />
            Detection Dashboard.<br />
            Track Smarter. Spend Safer.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
            <button className="cta-btn">Get Started</button>
            <button className="outline-btn">Learn More</button>
          </div>
        </div>
      </section>

      {/* Bottom teal stripe */}
      <div className="teal-stripe" />

      {/* White space before cards */}
      <div style={{ height: 48, background: "#fff", flexShrink: 0 }} />

      {/* ── Feature cards ── */}
      <section className="cards-section" style={{ paddingBottom: "5rem" }}>
        <div className="cards-grid">
          {cards.map((card, i) => (
            <div
              key={i}
              className="feature-card"
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div>{card.icon}</div>
              <p className="card-title">{card.title}</p>
              <p className="card-desc">{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer-bar">
        <span className="footer-text">© 2026 Montra. All rights reserved.</span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["Privacy", "Terms", "Contact"].map((item) => (
            <a key={item} href="#" className="footer-link">{item}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}