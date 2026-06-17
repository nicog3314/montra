"use client";

import { useState } from "react";

const transactions = [
  { icon: "🛍", name: "Whole Foods Market", date: "Jun 11, 2026", amount: -84.20, category: "Groceries" },
  { icon: "🎬", name: "Netflix", date: "Jun 10, 2026", amount: -17.99, category: "Subscriptions" },
  { icon: "🏦", name: "Direct Deposit", date: "Jun 10, 2026", amount: 2650.00, category: "Income" },
  { icon: "⛽", name: "Shell Station", date: "Jun 9, 2026", amount: -62.40, category: "Transportation" },
  { icon: "☕", name: "Starbucks", date: "Jun 9, 2026", amount: -6.75, category: "Dining Out" },
  { icon: "🏠", name: "Rent · Unit 4B", date: "Jun 1, 2026", amount: -1350.00, category: "Housing" },
];

const topSpend = [
  { name: "Housing & Rent", amount: 1350, pct: 82 },
  { name: "Groceries", amount: 312, pct: 55 },
  { name: "Dining Out", amount: 218, pct: 38 },
  { name: "Transportation", amount: 148, pct: 28 },
  { name: "Subscriptions", amount: 87, pct: 18 },
  { name: "Health & Wellness", amount: 60, pct: 13 },
  { name: "Entertainment", amount: 42, pct: 9 },
];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const spending = [1820, 2100, 1650, 2400, 2080, 2341];
const income = [5200, 5200, 5200, 5200, 5200, 5300];
const maxVal = Math.max(...income);

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState("Dashboard");

  return (
    <div style={{ minHeight: "100vh", background: "#f8f6f4", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      {/* Header */}
      <header style={{
        background: "#36413E",
        padding: "0.65rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontWeight: 300,
          letterSpacing: "0.25em",
          fontSize: "1rem",
          color: "#ECBEB4",
        }}>
          Montra.
        </span>

        <nav style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          {["Dashboard", "Transactions", "Budgets", "Reports"].map((item) => (
            <span
              key={item}
              onClick={() => setActiveNav(item)}
              style={{
                fontSize: "0.75rem",
                color: "#ECBEB4",
                opacity: activeNav === item ? 1 : 0.55,
                cursor: "pointer",
                letterSpacing: "0.06em",
                transition: "opacity 0.2s",
              }}
            >
              {item}
            </span>
          ))}
        </nav>

        <div style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "#ECBEB4",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.7rem",
          fontWeight: 500,
          color: "#36413E",
        }}>
          NK
        </div>
      </header>

      {/* Teal stripe */}
      <div style={{ background: "#869D96", height: 4, width: "100%" }} />

      {/* Body */}
      <main style={{ padding: "2rem", maxWidth: 1100, margin: "0 auto" }}>
        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontWeight: 300,
          fontSize: "1.8rem",
          color: "#36413E",
          letterSpacing: "0.05em",
          marginBottom: "0.15rem",
        }}>
          Good morning, Nicole<span style={{ fontStyle: "italic" }}>.</span>
        </p>
        <p style={{ fontSize: "0.72rem", color: "#869D96", letterSpacing: "0.08em", marginBottom: "1.5rem" }}>
          JUNE 2026 · YOUR FINANCIAL OVERVIEW
        </p>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", marginBottom: "1rem" }}>
          {[
            { label: "Total Balance", value: "$12,480", delta: "↑ 4.2% from last month", up: true },
            { label: "Spent This Month", value: "$2,341", delta: "↑ 12% vs. May", up: false },
            { label: "Monthly Budget", value: "$3,000", delta: "$659 remaining", up: true },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "#36413E",
                borderRadius: 16,
                padding: "1rem 1.25rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{
                position: "absolute",
                top: -18,
                right: -18,
                width: 70,
                height: 70,
                borderRadius: "50%",
                background: "rgba(134,157,150,0.18)",
              }} />
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#869D96", marginBottom: "0.3rem" }}>
                {stat.label}
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.8rem", fontWeight: 300, color: "#ECBEB4" }}>
                {stat.value}
              </p>
              <p style={{ fontSize: "0.63rem", color: stat.up ? "#7ec8a0" : "#d4859c", marginTop: "0.15rem" }}>
                {stat.delta}
              </p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div style={{
          background: "#fff",
          borderRadius: 20,
          border: "1px solid #ECBEB4",
          padding: "1.1rem 1.25rem",
          marginBottom: "0.75rem",
        }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", color: "#36413E", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
            Spending this year
          </p>
          <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
            {[{ color: "#885053", label: "Spending" }, { color: "#869D96", label: "Income" }].map((l) => (
              <span key={l.label} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#869D96" }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: l.color }} />
                {l.label}
              </span>
            ))}
          </div>

          {/* Bar chart (pure CSS/SVG — no dependency) */}
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 180, paddingBottom: 24, position: "relative" }}>
            {/* Y-axis guidelines */}
            {[0, 25, 50, 75, 100].map((pct) => (
              <div
                key={pct}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 24 + (pct / 100) * 156,
                  borderTop: "1px solid #f0ecea",
                  fontSize: 10,
                  color: "#c4b8b0",
                  paddingLeft: 2,
                }}
              >
                <span style={{ position: "absolute", left: 0, top: -9 }}>
                  ${Math.round((pct / 100) * maxVal / 1000)}k
                </span>
              </div>
            ))}

            {months.map((month, i) => (
              <div key={month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, height: "100%", justifyContent: "flex-end", paddingLeft: 28 }}>
                <div style={{ display: "flex", gap: 3, alignItems: "flex-end", width: "100%" }}>
                  <div
                    title={`Spending: $${spending[i].toLocaleString()}`}
                    style={{
                      flex: 1,
                      height: Math.round((spending[i] / maxVal) * 156),
                      background: "#885053cc",
                      borderRadius: "4px 4px 0 0",
                      border: "1px solid #885053",
                    }}
                  />
                  <div
                    title={`Income: $${income[i].toLocaleString()}`}
                    style={{
                      flex: 1,
                      height: Math.round((income[i] / maxVal) * 156),
                      background: "#869D9666",
                      borderRadius: "4px 4px 0 0",
                      border: "1px solid #869D96",
                    }}
                  />
                </div>
                <span style={{ fontSize: 11, color: "#869D96", position: "absolute", bottom: 6 }}>{month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          {/* Recent Transactions */}
          <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #ECBEB4", padding: "1.1rem 1.25rem" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", color: "#36413E", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
              Recent Transactions
            </p>
            {transactions.map((tx, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.5rem 0",
                  borderBottom: i < transactions.length - 1 ? "1px solid #f0ecea" : "none",
                }}
              >
                <div style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: "#ECBEB4",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 15,
                  flexShrink: 0,
                }}>
                  {tx.icon}
                </div>
                <div style={{ flex: 1, padding: "0 0.6rem" }}>
                  <p style={{ fontSize: "0.78rem", fontWeight: 400, color: "#36413E" }}>{tx.name}</p>
                  <p style={{ fontSize: "0.65rem", color: "#869D96", marginTop: 1 }}>{tx.date}</p>
                </div>
                <p style={{ fontSize: "0.82rem", fontWeight: 500, color: tx.amount > 0 ? "#5a9475" : "#885053" }}>
                  {tx.amount > 0 ? "+" : "−"}${Math.abs(tx.amount).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          {/* Top Spend */}
          <div style={{ background: "#fff", borderRadius: 20, border: "1px solid #ECBEB4", padding: "1.1rem 1.25rem" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", color: "#36413E", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
              Top Spend This Month
            </p>
            {topSpend.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "0.45rem 0",
                  borderBottom: i < topSpend.length - 1 ? "1px solid #f0ecea" : "none",
                }}
              >
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", color: "#ECBEB4", width: 16, flexShrink: 0 }}>
                  {i + 1}
                </span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "0.73rem", color: "#36413E", marginBottom: 3 }}>{item.name}</p>
                  <div style={{ background: "#f0ecea", borderRadius: 4, height: 5 }}>
                    <div style={{
                      width: `${item.pct}%`,
                      height: 5,
                      borderRadius: 4,
                      background: "linear-gradient(90deg, #885053, #ECBEB4)",
                    }} />
                  </div>
                </div>
                <span style={{ fontSize: "0.72rem", fontWeight: 500, color: "#885053", flexShrink: 0 }}>
                  ${item.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: "1px solid #ECBEB4", marginTop: "1.5rem", paddingTop: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "0.65rem", color: "#885053", letterSpacing: "0.06em" }}>© 2026 Montra. All rights reserved.</span>
          <div style={{ display: "flex", gap: "1rem" }}>
            {["Privacy", "Terms", "Contact"].map((item) => (
              <a key={item} href="#" style={{ fontSize: "0.65rem", color: "#885053", textDecoration: "none", letterSpacing: "0.06em" }}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}