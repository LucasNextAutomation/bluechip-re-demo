"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Users,
  CalendarCheck,
  MessageCircle,
  BookOpen,
} from "lucide-react";

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.5, delay, ease: [0.0, 0.0, 0.2, 1] as const },
  };
}

function slideLeft(delay = 0) {
  return {
    initial: { opacity: 0, x: -24 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.5, delay, ease: [0.0, 0.0, 0.2, 1] as const },
  };
}

const EYEBROW: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#0049B8",
  marginBottom: "12px",
};

const SECTION_HEADING: React.CSSProperties = {
  fontSize: "28px",
  fontWeight: 700,
  letterSpacing: "-0.025em",
  color: "#0f172a",
  margin: 0,
};

const timelineWeeks = [
  {
    week: 1,
    title: "Kickoff & Discovery",
    build: [
      "Process mapping and workflow audit",
      "AppFolio integration review",
      "Investment criteria and target market definition",
    ],
    deliver: [
      "Data source availability assessment",
      "Architecture blueprint",
      "Integration requirements document",
    ],
  },
  {
    week: 2,
    title: "Off-Market Deal Finder",
    build: [
      "15 data source integrations across 6 counties",
      "Scraping infrastructure and scheduling",
      "AI distress scoring pipeline",
    ],
    deliver: [
      "Initial data flow testing",
      "Sample lead output for calibration",
      "Scoring model review with your team",
    ],
  },
  {
    week: 3,
    title: "AI Underwriting System",
    build: [
      "OM parser and extraction engine",
      "Underwriting model builder with IRR and waterfall",
      "Sensitivity analysis and AI flag system",
    ],
    deliver: [
      "Test with 3 real OMs from your pipeline",
      "Extraction accuracy refinement",
      "Assumption calibration walkthrough",
    ],
  },
  {
    week: 4,
    title: "Outreach Engine",
    build: [
      "Skip trace integration (Tracerfy)",
      "AI sequence builder with personalization",
      "Multi-channel delivery (email + SMS)",
    ],
    deliver: [
      "Draft sequence templates for review",
      "Test with sample leads from pipeline",
      "Notification and tracking configuration",
    ],
  },
  {
    week: 5,
    title: "Integration & Testing",
    build: [
      "End-to-end pipeline testing with real market data",
      "AI model fine-tuning and edge case handling",
      "Performance optimization pass",
    ],
    deliver: [
      "Full pipeline walkthrough with your team",
      "Feedback incorporation and refinements",
      "Stress testing with volume scenarios",
    ],
  },
  {
    week: 6,
    title: "Go-Live & Handoff",
    build: [
      "Production deployment on dedicated infrastructure",
      "Monitoring, alerting, and error handling setup",
      "Full documentation and video walkthroughs",
    ],
    deliver: [
      "AppFolio integration verification",
      "Team training session (live)",
      "Ongoing support onboarding",
    ],
  },
];

const partnershipCards = [
  {
    icon: Users,
    title: "Dedicated Team",
    description: "Your project team throughout the entire engagement, focused exclusively on Blue Chip RE.",
  },
  {
    icon: CalendarCheck,
    title: "Weekly Updates",
    description: "Written progress reports every Friday with demos and next-week milestones.",
  },
  {
    icon: MessageCircle,
    title: "Direct Communication",
    description: "Priority access to your project team throughout the engagement with fast response times.",
  },
  {
    icon: BookOpen,
    title: "Knowledge Transfer",
    description: "Full documentation, video walkthroughs, and a live training session — all yours to keep.",
  },
];

const investmentLines = [
  { label: "Off-Market Deal Finder", detail: "15 sources, 6 counties, AI scoring", value: "$4,000" },
  { label: "AI Underwriting Assistant", detail: "OM parsing, model builder, sensitivity", value: "$2,500" },
  { label: "Automated Outreach Engine", detail: "Skip trace, sequences, multi-channel", value: "$2,000" },
  { label: "First-Collaboration Discount", detail: "", value: "-$500" },
];

export default function CollaborationPage() {
  return (
    <div style={{ backgroundColor: "#ffffff" }}>

      {/* Back nav */}
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "32px 40px 0" }}>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "13px",
            fontWeight: 500,
            color: "#0049B8",
            textDecoration: "none",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.6"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
        >
          <ArrowLeft size={14} />
          Overview
        </Link>
      </div>

      {/* Hero */}
      <section style={{ padding: "100px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.0, 0.0, 0.2, 1] }}
          >
            {/* Logo lockup */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "48px",
              }}
            >
              <Image
                src="/logos/nextautomation.png"
                alt="NextAutomation"
                width={150}
                height={26}
                style={{
                  height: "24px",
                  width: "auto",
                  objectFit: "contain",
                  display: "block",
                  filter: "brightness(0) saturate(100%)",
                }}
                priority
              />
              <span
                style={{
                  width: "1px",
                  height: "24px",
                  backgroundColor: "#d1d5db",
                  display: "inline-block",
                  flexShrink: 0,
                  margin: "0 20px",
                }}
              />
              <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "32px", height: "32px" }}>
                <circle cx="60" cy="60" r="58" stroke="#3B4559" strokeWidth="2.5" fill="white" />
                <line x1="60" y1="30" x2="60" y2="90" stroke="#3B4559" strokeWidth="1.5" />
                <text x="38" y="52" textAnchor="middle" fill="#3B4559" fontFamily="Inter, system-ui, sans-serif" fontSize="18" fontWeight="400" letterSpacing="2">b</text>
                <text x="38" y="78" textAnchor="middle" fill="#3B4559" fontFamily="Inter, system-ui, sans-serif" fontSize="18" fontWeight="400" letterSpacing="2">r</text>
                <text x="82" y="52" textAnchor="middle" fill="#3B4559" fontFamily="Inter, system-ui, sans-serif" fontSize="18" fontWeight="400" letterSpacing="2">c</text>
                <text x="82" y="78" textAnchor="middle" fill="#3B4559" fontFamily="Inter, system-ui, sans-serif" fontSize="18" fontWeight="400" letterSpacing="2">a</text>
              </svg>
            </div>

            {/* Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                borderRadius: "999px",
                background: "rgba(0,73,184,0.07)",
                border: "1px solid rgba(0,73,184,0.16)",
                marginBottom: "32px",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#0049B8",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                  color: "#0049B8",
                }}
              >
                NextAutomation x Blue Chip RE
              </span>
            </div>

            <h1
              style={{
                fontSize: "clamp(36px, 5vw, 48px)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
                color: "#0f172a",
                marginBottom: "20px",
              }}
            >
              Collaboration Framework
            </h1>

            <p
              style={{
                fontSize: "18px",
                color: "#64748b",
                lineHeight: 1.65,
                fontWeight: 400,
                maxWidth: "540px",
                margin: "0 auto",
              }}
            >
              A structured 6-week engagement to build, test, and deploy your complete acquisition system.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vertical Timeline */}
      <section
        style={{
          padding: "100px 40px",
          backgroundColor: "#f6f7f8",
          borderTop: "1px solid #e8eaed",
          borderBottom: "1px solid #e8eaed",
        }}
      >
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <motion.div {...fadeUp(0)} style={{ marginBottom: "56px" }}>
            <p style={EYEBROW}>6-Week Deployment</p>
            <h2 style={SECTION_HEADING}>Engagement Timeline</h2>
            <p
              style={{
                fontSize: "15px",
                color: "#64748b",
                lineHeight: 1.65,
                marginTop: "12px",
                maxWidth: "520px",
              }}
            >
              Week 1 is dedicated to discovery and scoping. Weeks 2 through 6 deliver
              working systems with your team reviewing progress every step of the way.
            </p>
          </motion.div>

          <div style={{ position: "relative", paddingLeft: "28px" }}>
            {/* Vertical spine */}
            <div
              style={{
                position: "absolute",
                left: "7px",
                top: "8px",
                bottom: "8px",
                width: "2px",
                background: "linear-gradient(to bottom, #0049B8, rgba(0,73,184,0.20))",
                borderRadius: "1px",
              }}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {timelineWeeks.map((w, i) => (
                <motion.div
                  key={w.week}
                  {...slideLeft(i * 0.08)}
                  style={{ position: "relative" }}
                >
                  {/* Timeline dot */}
                  <div
                    style={{
                      position: "absolute",
                      left: "-28px",
                      top: "28px",
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      background: "#0049B8",
                      border: "3px solid #f6f7f8",
                      boxShadow: "0 0 0 2px rgba(0,73,184,0.20)",
                      zIndex: 1,
                    }}
                  />

                  {/* Week card */}
                  <div
                    style={{
                      borderRadius: "12px",
                      background: "#ffffff",
                      border: "1px solid #e8eaed",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                      overflow: "hidden",
                      display: "flex",
                    }}
                  >
                    {/* Blue accent bar */}
                    <div
                      style={{
                        width: "4px",
                        minWidth: "4px",
                        maxWidth: "4px",
                        background: "#0049B8",
                        flexShrink: 0,
                        borderRadius: "12px 0 0 12px",
                      }}
                    />

                    <div style={{ flex: 1, padding: "28px 32px" }}>
                      <div style={{ marginBottom: "20px" }}>
                        <p
                          style={{
                            fontSize: "11px",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase" as const,
                            color: "#0049B8",
                            margin: "0 0 6px 0",
                          }}
                        >
                          Week {w.week}
                        </p>
                        <h3
                          style={{
                            fontSize: "20px",
                            fontWeight: 700,
                            letterSpacing: "-0.02em",
                            color: "#0f172a",
                            margin: 0,
                          }}
                        >
                          {w.title}
                        </h3>
                      </div>

                      {/* Two-column BUILD / DELIVER */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1px 1fr",
                          gap: "0",
                        }}
                      >
                        <div style={{ paddingRight: "24px" }}>
                          <p
                            style={{
                              fontSize: "10px",
                              fontWeight: 700,
                              letterSpacing: "0.12em",
                              textTransform: "uppercase" as const,
                              color: "#0049B8",
                              margin: "0 0 12px 0",
                            }}
                          >
                            Build
                          </p>
                          <ul
                            style={{
                              listStyle: "none",
                              margin: 0,
                              padding: 0,
                              display: "flex",
                              flexDirection: "column",
                              gap: "8px",
                            }}
                          >
                            {w.build.map((item) => (
                              <li
                                key={item}
                                style={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                  gap: "8px",
                                  fontSize: "14px",
                                  color: "#0f172a",
                                  lineHeight: 1.55,
                                }}
                              >
                                <span
                                  style={{
                                    width: "5px",
                                    height: "5px",
                                    minWidth: "5px",
                                    borderRadius: "50%",
                                    background: "#0049B8",
                                    marginTop: "7px",
                                    flexShrink: 0,
                                  }}
                                />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div style={{ width: "1px", background: "#e8eaed", alignSelf: "stretch" }} />

                        <div style={{ paddingLeft: "24px" }}>
                          <p
                            style={{
                              fontSize: "10px",
                              fontWeight: 700,
                              letterSpacing: "0.12em",
                              textTransform: "uppercase" as const,
                              color: "#64748b",
                              margin: "0 0 12px 0",
                            }}
                          >
                            Deliver
                          </p>
                          <ul
                            style={{
                              listStyle: "none",
                              margin: 0,
                              padding: 0,
                              display: "flex",
                              flexDirection: "column",
                              gap: "8px",
                            }}
                          >
                            {w.deliver.map((item) => (
                              <li
                                key={item}
                                style={{
                                  display: "flex",
                                  alignItems: "flex-start",
                                  gap: "8px",
                                  fontSize: "14px",
                                  color: "#475569",
                                  lineHeight: 1.55,
                                }}
                              >
                                <span
                                  style={{
                                    width: "5px",
                                    height: "5px",
                                    minWidth: "5px",
                                    borderRadius: "50%",
                                    background: "#94a3b8",
                                    marginTop: "7px",
                                    flexShrink: 0,
                                  }}
                                />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Grid */}
      <section style={{ padding: "100px 40px" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <motion.div {...fadeUp(0)} style={{ marginBottom: "56px" }}>
            <p style={EYEBROW}>What You Get</p>
            <h2 style={SECTION_HEADING}>Partnership Structure</h2>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
            }}
          >
            {partnershipCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  {...fadeUp(i * 0.06)}
                  style={{
                    borderRadius: "12px",
                    border: "1px solid #e8eaed",
                    padding: "28px 24px",
                    background: "#fff",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                    transition: "box-shadow 0.2s ease, transform 0.2s ease",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.boxShadow = "0 4px 20px rgba(0,73,184,0.10), 0 1px 4px rgba(0,0,0,0.05)";
                    el.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
                    el.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: "rgba(0,73,184,0.07)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "18px",
                    }}
                  >
                    <Icon style={{ width: "18px", height: "18px", color: "#0049B8" }} />
                  </div>
                  <p
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "#0f172a",
                      margin: "0 0 6px 0",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {card.title}
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#64748b",
                      lineHeight: 1.55,
                      margin: 0,
                    }}
                  >
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Investment Card */}
      <section
        style={{
          padding: "100px 40px",
          backgroundColor: "#f6f7f8",
          borderTop: "1px solid #e8eaed",
          borderBottom: "1px solid #e8eaed",
        }}
      >
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <motion.div {...fadeUp(0)} style={{ marginBottom: "56px", textAlign: "center" }}>
            <p style={{ ...EYEBROW, textAlign: "center" }}>Investment Summary</p>
            <h2 style={{ ...SECTION_HEADING, textAlign: "center" }}>Engagement Terms</h2>
          </motion.div>

          <motion.div
            {...fadeUp(0.1)}
            style={{
              maxWidth: "560px",
              margin: "0 auto",
              borderRadius: "16px",
              background: "#0f172a",
              boxShadow: "0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)",
              padding: "40px",
            }}
          >
            {/* Hero price */}
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.10em",
                  textTransform: "uppercase" as const,
                  color: "rgba(255,255,255,0.40)",
                  margin: "0 0 12px 0",
                }}
              >
                Complete System Bundle
              </p>
              <p
                style={{
                  fontSize: "56px",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  color: "#ffffff",
                  lineHeight: 1,
                  margin: 0,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                $8,000
              </p>
            </div>

            {/* Line items */}
            <div style={{ marginBottom: "24px" }}>
              {investmentLines.map((row) => (
                <div
                  key={row.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: 600,
                        color: row.value.startsWith("-") ? "rgba(255,255,255,0.50)" : "rgba(255,255,255,0.85)",
                      }}
                    >
                      {row.label}
                    </span>
                    {row.detail && (
                      <span
                        style={{
                          fontSize: "13px",
                          color: "rgba(255,255,255,0.40)",
                          marginLeft: "8px",
                        }}
                      >
                        {row.detail}
                      </span>
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      color: row.value.startsWith("-") ? "#22c55e" : "#ffffff",
                      letterSpacing: "-0.02em",
                      flexShrink: 0,
                    }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Payment terms */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: "16px",
                borderTop: "2px solid rgba(255,255,255,0.14)",
                marginBottom: "28px",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.50)",
                }}
              >
                50% upfront to start
              </span>
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                }}
              >
                $4,000
              </span>
            </div>

            <div style={{ height: "1px", background: "rgba(255,255,255,0.08)", marginBottom: "24px" }} />

            {/* Monthly */}
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.10em",
                  textTransform: "uppercase" as const,
                  color: "rgba(255,255,255,0.40)",
                  margin: "0 0 8px 0",
                }}
              >
                Ongoing Maintenance
              </p>
              <p
                style={{
                  fontSize: "28px",
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "-0.03em",
                  margin: "0 0 4px 0",
                }}
              >
                $600<span style={{ fontSize: "16px", fontWeight: 500, color: "rgba(255,255,255,0.50)" }}> /month</span>
              </p>
              <p
                style={{
                  fontSize: "13px",
                  color: "rgba(255,255,255,0.40)",
                  margin: 0,
                }}
              >
                + ~$150-200/mo data costs (skip trace, SMS, public records)
              </p>
            </div>

            {/* Ownership checklist */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                borderTop: "1px solid rgba(255,255,255,0.08)",
                paddingTop: "24px",
              }}
            >
              {[
                "Full code ownership \u2014 delivered to your repository",
                "Complete documentation and video walkthroughs",
                "Live training session with your team",
              ].map((line) => (
                <div
                  key={line}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <span
                    style={{
                      color: "#0049B8",
                      fontWeight: 700,
                      fontSize: "14px",
                      flexShrink: 0,
                      marginTop: "1px",
                      lineHeight: 1.5,
                    }}
                  >
                    &#10003;
                  </span>
                  <span
                    style={{
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.65)",
                      lineHeight: 1.55,
                    }}
                  >
                    {line}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid #e8eaed",
          paddingTop: "40px",
          paddingBottom: "40px",
          backgroundColor: "#ffffff",
        }}
      >
        <p
          style={{
            fontSize: "11px",
            color: "#94a3b8",
            textAlign: "center",
            margin: 0,
            letterSpacing: "0.04em",
          }}
        >
          &copy; 2026 NextAutomation
        </p>
      </footer>
    </div>
  );
}
