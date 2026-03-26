"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, FileSpreadsheet, Zap, ArrowRight, Database, MapPin, Cpu, DollarSign } from "lucide-react";

const systems = [
  {
    href: "/deal-finder",
    howItWorksHref: "/deal-finder/how-it-works",
    title: "Off-Market Deal Finder",
    icon: Search,
    description:
      "Custom data aggregator scanning 15 sources across 6 counties. AI scores every lead and surfaces the highest-priority opportunities daily.",
    highlights: ["15 live data sources", "AI distress scoring", "Skip tracing included"],
  },
  {
    href: "/underwriting",
    howItWorksHref: "/underwriting/how-it-works",
    title: "AI Underwriting Assistant",
    icon: FileSpreadsheet,
    description:
      "Upload an offering memorandum. AI extracts every number, populates your model, and flags assumptions it\u2019s not confident about.",
    highlights: ["Auto-extract from OM", "IRR & waterfall calcs", "AI flags for review"],
  },
  {
    href: "/outreach",
    howItWorksHref: "/outreach/how-it-works",
    title: "Automated Outreach Engine",
    icon: Zap,
    description:
      "Skip trace owners, send personalized sequences, and track every touchpoint \u2014 4-touch over 14 days, fully automated.",
    highlights: ["4-touch sequences", "Personalized messaging", "Open & reply tracking"],
  },
];

const stats = [
  { icon: Database, label: "Data Sources", value: "15", detail: "Public records" },
  { icon: MapPin, label: "Target Counties", value: "6", detail: "MA & NH" },
  { icon: Cpu, label: "AI Systems", value: "3", detail: "End-to-end" },
  { icon: DollarSign, label: "Investment", value: "$8,000", detail: "All systems" },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: [0.0, 0.0, 0.2, 1] as const },
  };
}

export default function LandingPage() {
  return (
    <div style={{ backgroundColor: "#ffffff" }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", padding: "100px 40px 80px", textAlign: "center", overflow: "hidden" }}>
        {/* Subtle radial glow */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "900px",
            height: "900px",
            background: "radial-gradient(circle, rgba(0,73,184,0.04) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: "720px", margin: "0 auto", position: "relative" }}>
          {/* BCRA Logo */}
          <motion.div {...fadeUp(0)} style={{ display: "flex", justifyContent: "center", marginBottom: "40px" }}>
            <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "72px", height: "72px" }}>
              <circle cx="60" cy="60" r="58" stroke="#3B4559" strokeWidth="2.5" fill="white" />
              <line x1="60" y1="30" x2="60" y2="90" stroke="#3B4559" strokeWidth="1.5" />
              <text x="38" y="52" textAnchor="middle" fill="#3B4559" fontFamily="Inter, system-ui, sans-serif" fontSize="18" fontWeight="400" letterSpacing="2">b</text>
              <text x="38" y="78" textAnchor="middle" fill="#3B4559" fontFamily="Inter, system-ui, sans-serif" fontSize="18" fontWeight="400" letterSpacing="2">r</text>
              <text x="82" y="52" textAnchor="middle" fill="#3B4559" fontFamily="Inter, system-ui, sans-serif" fontSize="18" fontWeight="400" letterSpacing="2">c</text>
              <text x="82" y="78" textAnchor="middle" fill="#3B4559" fontFamily="Inter, system-ui, sans-serif" fontSize="18" fontWeight="400" letterSpacing="2">a</text>
            </svg>
          </motion.div>

          {/* Eyebrow badge */}
          <motion.div {...fadeUp(0.06)} style={{ display: "flex", justifyContent: "center", marginBottom: "28px" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 16px",
                borderRadius: "999px",
                background: "rgba(0,73,184,0.06)",
                border: "1px solid rgba(0,73,184,0.14)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
                color: "#0049B8",
              }}
            >
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0049B8", flexShrink: 0 }} />
              Blue Chip RE Advisors
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.12)}
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.08,
              color: "#0f172a",
              marginBottom: "20px",
            }}
          >
            Your Multifamily{"\n"}Acquisition System
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            {...fadeUp(0.18)}
            style={{
              fontSize: "18px",
              color: "#64748b",
              lineHeight: 1.65,
              fontWeight: 400,
              maxWidth: "520px",
              margin: "0 auto 32px",
            }}
          >
            Three AI-powered systems working together &mdash; find off-market deals,
            underwrite them instantly, and reach owners automatically.
          </motion.p>

          {/* Market tags */}
          <motion.div
            {...fadeUp(0.24)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "24px",
              fontSize: "13px",
              color: "#94a3b8",
              fontWeight: 500,
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e" }} />
              Class C/B- multifamily
            </span>
            <span>5&ndash;50 units</span>
            <span>Boston metro &amp; Southern NH</span>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ROW ────────────────────────────────────────────────────── */}
      <section style={{ padding: "0 40px 80px" }}>
        <div
          style={{
            maxWidth: "820px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
          }}
        >
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                {...fadeUp(0.28 + i * 0.05)}
                style={{
                  textAlign: "center",
                  padding: "24px 16px",
                  borderRadius: "14px",
                  border: "1px solid #e8eaed",
                  background: "#ffffff",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                  transition: "box-shadow 0.2s ease, transform 0.2s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.boxShadow = "0 4px 16px rgba(0,73,184,0.08), 0 1px 3px rgba(0,0,0,0.04)";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.03)";
                  el.style.transform = "translateY(0)";
                }}
              >
                <Icon style={{ width: "18px", height: "18px", color: "#0049B8", margin: "0 auto 10px", opacity: 0.7 }} />
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: 800,
                    color: "#0f172a",
                    letterSpacing: "-0.03em",
                    margin: "0 0 2px",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {s.value}
                </p>
                <p style={{ fontSize: "12px", fontWeight: 600, color: "#0f172a", margin: "0 0 2px", letterSpacing: "0.01em" }}>
                  {s.label}
                </p>
                <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0 }}>{s.detail}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── DIVIDER ──────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <div style={{ height: "1px", background: "linear-gradient(to right, transparent, #e8eaed, transparent)" }} />
      </div>

      {/* ── SYSTEM CARDS ─────────────────────────────────────────────────── */}
      <section style={{ padding: "80px 40px 100px" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <motion.div {...fadeUp(0.1)} style={{ textAlign: "center", marginBottom: "56px" }}>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
                color: "#0049B8",
                marginBottom: "12px",
              }}
            >
              Explore the Platform
            </p>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: 700,
                letterSpacing: "-0.025em",
                color: "#0f172a",
                margin: 0,
              }}
            >
              Three Systems, One Pipeline
            </h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {systems.map((sys, i) => {
              const Icon = sys.icon;
              return (
                <motion.div
                  key={sys.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 + 0.08 * i, ease: [0.0, 0.0, 0.2, 1] }}
                  style={{
                    borderRadius: "16px",
                    border: "1px solid #e8eaed",
                    background: "#ffffff",
                    padding: "32px 28px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                    transition: "box-shadow 0.25s ease, transform 0.25s ease, border-color 0.25s ease",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.boxShadow = "0 8px 28px rgba(0,73,184,0.10), 0 2px 8px rgba(0,0,0,0.04)";
                    el.style.transform = "translateY(-4px)";
                    el.style.borderColor = "rgba(0,73,184,0.20)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
                    el.style.transform = "translateY(0)";
                    el.style.borderColor = "#e8eaed";
                  }}
                >
                  {/* Icon */}
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: "rgba(0,73,184,0.06)",
                      border: "1px solid rgba(0,73,184,0.10)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "24px",
                    }}
                  >
                    <Icon style={{ width: "20px", height: "20px", color: "#0049B8" }} />
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: "17px",
                      fontWeight: 700,
                      color: "#0f172a",
                      margin: "0 0 8px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {sys.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#64748b",
                      lineHeight: 1.65,
                      margin: "0 0 20px",
                    }}
                  >
                    {sys.description}
                  </p>

                  {/* Highlights */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px" }}>
                    {sys.highlights.map((h) => (
                      <div key={h} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span
                          style={{
                            width: "5px",
                            height: "5px",
                            borderRadius: "50%",
                            background: "#0049B8",
                            flexShrink: 0,
                            opacity: 0.5,
                          }}
                        />
                        <span style={{ fontSize: "13px", color: "#475569", fontWeight: 500 }}>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "auto" }}>
                    <Link
                      href={sys.href}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "#0049B8",
                        textDecoration: "none",
                      }}
                    >
                      Live Demo
                      <ArrowRight style={{ width: "13px", height: "13px" }} />
                    </Link>
                    <Link
                      href={sys.howItWorksHref}
                      style={{
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#94a3b8",
                        textDecoration: "none",
                        transition: "color 0.15s ease",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#475569"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#94a3b8"; }}
                    >
                      How It Works
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── COLLABORATION CTA ────────────────────────────────────────────── */}
      <section
        style={{
          padding: "100px 40px",
          backgroundColor: "#f6f7f8",
          borderTop: "1px solid #e8eaed",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.0, 0.0, 0.2, 1] }}
          >
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
                color: "#0049B8",
                marginBottom: "16px",
              }}
            >
              Next Steps
            </p>
            <h2
              style={{
                fontSize: "clamp(24px, 3.5vw, 32px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "#0f172a",
                marginBottom: "16px",
                lineHeight: 1.15,
              }}
            >
              Ready to Build Your System?
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#64748b",
                lineHeight: 1.65,
                marginBottom: "32px",
                maxWidth: "480px",
                margin: "0 auto 32px",
              }}
            >
              A structured 6-week engagement to design, build, and deploy all three
              systems &mdash; with your team reviewing progress every step of the way.
            </p>
            <Link
              href="/collaboration"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "#0049B8",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: 600,
                padding: "14px 28px",
                borderRadius: "12px",
                textDecoration: "none",
                transition: "background 0.2s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "#003d99";
                el.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "#0049B8";
                el.style.transform = "translateY(0)";
              }}
            >
              View Collaboration Framework
              <ArrowRight style={{ width: "15px", height: "15px" }} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer
        style={{
          borderTop: "1px solid #e8eaed",
          padding: "32px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "960px",
          margin: "0 auto",
        }}
      >
        <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0 }}>
          Interactive demo &mdash; data is simulated for demonstration purposes
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "11px", color: "#94a3b8" }}>Built by</span>
          <Image
            src="/logos/nextautomation.png"
            alt="NextAutomation"
            width={100}
            height={16}
            style={{ height: "14px", width: "auto", objectFit: "contain", filter: "brightness(0) saturate(100%)", opacity: 0.45 }}
          />
        </div>
      </footer>
    </div>
  );
}
