import { useState } from "react";

export default function MontraLanding() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const cards = [
    {
      title: "Expense Tracking",
      description:
        "Visualize your spending patterns with intelligent categorization and real-time insights.",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
          <rect x="6" y="14" width="36" height="26" rx="4" stroke="#8fa876" strokeWidth="2.5" />
          <path d="M6 20h36" stroke="#8fa876" strokeWidth="2.5" />
          <circle cx="16" cy="32" r="3" fill="#8fa876" />
          <path d="M24 29h10M24 35h6" stroke="#8fa876" strokeWidth="2" strokeLinecap="round" />
          <path d="M16 8v6M24 6v8M32 8v6" stroke="#8fa876" strokeWidth="2.5" strokeLinecap="round" />
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
            stroke="#8fa876"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path d="M17 24l5 5 9-9" stroke="#8fa876" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "Smart Budgeting",
      description:
        "Set dynamic budgets that adapt to your lifestyle and get proactive recommendations to meet your goals.",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
          <circle cx="24" cy="24" r="16" stroke="#8fa876" strokeWidth="2.5" />
          <path d="M24 14v10l6 4" stroke="#8fa876" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 8l4 4M36 8l-4 4" stroke="#8fa876" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <div
      className="min-h-screen bg-white font-sans"
      style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=DM+Sans:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .montra-logo {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 300;
          letter-spacing: 0.25em;
          font-size: 1.05rem;
          color: #2c2c2c;
        }

        .nav-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 400;
          color: #2c2c2c;
          letter-spacing: 0.04em;
          transition: color 0.2s;
        }
        .nav-link:hover { color: #8fa876; }

        .hero-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 300;
          font-size: clamp(3.5rem, 7vw, 6rem);
          letter-spacing: 0.18em;
          color: #3a3a3a;
          line-height: 1;
        }

        .hero-subtitle {
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          font-size: 0.95rem;
          color: #6a6a6a;
          letter-spacing: 0.06em;
          line-height: 1.75;
        }

        .sage-stripe {
          background-color: #a3b48a;
          height: 6px;
          width: 100%;
        }

        .feature-card {
          background: #d8d8d5;
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
          box-shadow: 0 20px 48px rgba(0,0,0,0.10);
        }

        .card-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 400;
          font-size: 1.4rem;
          color: #3a3a3a;
          letter-spacing: 0.05em;
        }

        .card-desc {
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          font-size: 0.82rem;
          color: #6a6a6a;
          line-height: 1.7;
        }

        .cta-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: white;
          background: #8fa876;
          border: none;
          padding: 0.65rem 1.8rem;
          border-radius: 2px;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }
        .cta-btn:hover { background: #7a9663; transform: scale(1.02); }

        .outline-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #8fa876;
          background: transparent;
          border: 1px solid #8fa876;
          padding: 0.65rem 1.8rem;
          border-radius: 2px;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, transform 0.15s;
        }
        .outline-btn:hover {
          background: #8fa876;
          color: white;
          transform: scale(1.02);
        }

        .hero-section {
          background: #d8d8d5;
          position: relative;
          overflow: hidden;
        }

        .hero-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 60% 50%, rgba(163,180,138,0.18) 0%, transparent 70%);
          pointer-events: none;
        }
      `}</style>

      {/* Top nav bar */}
      <header className="w-full bg-[#d4d4d1] px-8 py-3 flex items-center justify-between" style={{ minHeight: 56 }}>
        <span className="montra-logo">Montra.</span>
        <nav className="flex items-center gap-6">
          <a href="#" className="nav-link">Login</a>
          <span className="nav-link opacity-30">|</span>
          <a href="#" className="nav-link">Sign up</a>
        </nav>
      </header>

      {/* Thin white gap (matches wireframe) */}
      <div style={{ height: 28, background: "white" }} />

      {/* Top sage stripe */}
      <div className="sage-stripe" />

      {/* Hero section */}
      <section className="hero-section py-24 px-8">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-5">
          <h1 className="hero-title">Montra<span style={{ fontStyle: "italic", fontWeight: 300 }}>.</span></h1>
          <p className="hero-subtitle max-w-md">
            A Secure Personal Finance and Fraud<br />
            Detection Dashboard.<br />
            Track Smarter. Spend Safer.
          </p>
          <div className="flex gap-3 mt-4">
            <button className="cta-btn">Get Started</button>
            <button className="outline-btn">Learn More</button>
          </div>
        </div>
      </section>

      {/* Bottom sage stripe */}
      <div className="sage-stripe" />

      {/* White space before cards */}
      <div style={{ height: 48, background: "white" }} />

      {/* Feature cards */}
      <section className="bg-white pb-20 px-8">
        <div
          className="grid gap-6 mx-auto"
          style={{
            maxWidth: 1100,
            gridTemplateColumns: "repeat(3, 1fr)",
          }}
        >
          {cards.map((card, i) => (
            <div
              key={i}
              className="feature-card"
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="mb-1">{card.icon}</div>
              <p className="card-title">{card.title}</p>
              <p className="card-desc">{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="w-full border-t border-[#e0e0dd] py-6 px-8 flex items-center justify-between"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <span style={{ fontSize: "0.75rem", color: "#aaa", letterSpacing: "0.06em" }}>
          © 2026 Montra. All rights reserved.
        </span>
        <div className="flex gap-5">
          {["Privacy", "Terms", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              style={{ fontSize: "0.75rem", color: "#aaa", letterSpacing: "0.06em", textDecoration: "none" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#8fa876")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#aaa")}
            >
              {item}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}