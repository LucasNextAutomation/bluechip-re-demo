"use client";

import Link from "next/link";
import { useState } from "react";

const STEPS = [
  {
    number: 1,
    title: "Document Upload",
    duration: "~5 seconds",
    description:
      "Upload offering memorandums via drag-and-drop. Supports PDF, Word, Excel, and scanned documents of any quality.",
    details: [
      "Handles multi-page scanned PDFs with OCR processing",
      "Extracts data from structured tables, rent rolls, and financial schedules",
      "Supports broker packages, bank offering sheets, and direct-from-owner documents",
    ],
  },
  {
    number: 2,
    title: "AI Data Extraction",
    duration: "~30 seconds",
    description:
      "AI identifies and extracts 40+ key metrics: rent roll, unit mix, operating expenses, NOI, purchase price, debt terms, and capital structure.",
    details: [
      "Per-unit rent roll with current rents, market rents, and vacancy status",
      "Operating expense breakdown with line-item categorization",
      "Debt terms: LTV, interest rate, amortization, maturity, and prepayment penalties",
    ],
  },
  {
    number: 3,
    title: "Market Research & Comps",
    duration: "~60 seconds",
    description:
      "Automated research pulls comparable transactions, submarket fundamentals, and rent comps from public data sources to validate the deal.",
    details: [
      "Recent comparable sales within submarket and MSA",
      "Population growth, employment trends, and median income data",
      "Competing developments and pipeline supply analysis",
    ],
  },
  {
    number: 4,
    title: "Model Population",
    duration: "~90 seconds",
    description:
      "Auto-populates your underwriting model with IRR, DSCR, equity multiple, cash-on-cash returns, sensitivity analysis, and waterfall distributions.",
    details: [
      "7-year pro forma with income growth and expense escalation assumptions",
      "Sensitivity matrix: IRR across multiple exit caps and rent growth scenarios",
      "Waterfall distribution with preferred return, promote tiers, and LP/GP splits",
    ],
  },
  {
    number: 5,
    title: "AI Review & Flags",
    duration: "Immediate",
    description:
      "AI flags assumptions it is not confident about -- vacancy rates, capex reserves, rent growth projections. You review, adjust, and approve before finalizing.",
    details: [
      "Each flag includes the AI's reasoning and suggested adjustment",
      "Side-by-side comparison of OM-stated vs. model-calculated metrics",
      "Inline editing with version history for audit trail",
    ],
  },
];

const DATA_SOURCES = [
  { name: "Claude AI", category: "Intelligence" },
  { name: "Public Records", category: "Ownership" },
  { name: "Census Bureau", category: "Demographics" },
  { name: "CoStar Proxies", category: "Comps" },
  { name: "MLS Data", category: "Rent Comps" },
  { name: "BLS Employment", category: "Economic" },
];

const ARCHITECTURE = [
  {
    label: "Document Input",
    items: ["PDF Parser", "OCR Engine", "Table Detector"],
  },
  {
    label: "Extraction Layer",
    items: ["Entity Recognition", "Financial Normalization", "Schema Mapping"],
  },
  {
    label: "Intelligence Layer",
    items: ["Claude AI Analysis", "Comp Matching", "Risk Assessment"],
  },
  {
    label: "Output Layer",
    items: ["Model Builder", "Flag Generator", "Export Engine"],
  },
];

export default function UnderwritingHowItWorks() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "0 40px" }}>
        {/* Back link */}
        <div style={{ paddingTop: "28px" }}>
          <Link
            href="/underwriting"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              color: "#0049B8",
              textDecoration: "none",
              fontWeight: 500,
              transition: "opacity 0.15s ease",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.65")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 3L5 7L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Underwriting Demo
          </Link>
        </div>

        {/* Header */}
        <div style={{ paddingTop: "48px", paddingBottom: "16px" }}>
          <div
            style={{
              display: "inline-block",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#0049B8",
              background: "rgba(0,73,184,0.06)",
              border: "1px solid rgba(0,73,184,0.15)",
              padding: "5px 12px",
              borderRadius: "100px",
              marginBottom: "20px",
            }}
          >
            AI Underwriting Assistant
          </div>
          <h1
            style={{
              fontSize: "44px",
              fontWeight: 800,
              color: "#0f172a",
              margin: "0 0 16px",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            How It Works
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "#64748b",
              margin: "0 0 8px",
              lineHeight: 1.6,
              fontWeight: 400,
              maxWidth: "560px",
            }}
          >
            From offering memo upload to populated underwriting model in under 5 minutes. Five stages, fully automated.
          </p>
        </div>

        {/* Time indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px", padding: "20px 0 48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#0049B8" }} />
            <span style={{ fontSize: "13px", color: "#64748b", fontWeight: 500 }}>
              Total processing time: ~4 minutes
            </span>
          </div>
          <div style={{ height: "1px", flex: 1, background: "#e8eaed" }} />
        </div>

        {/* Vertical Timeline */}
        <div style={{ position: "relative", paddingBottom: "64px" }}>
          <div
            style={{
              position: "absolute",
              left: "19px",
              top: "20px",
              bottom: "20px",
              width: "2px",
              background: "linear-gradient(to bottom, #0049B8, rgba(0,73,184,0.08))",
              borderRadius: "2px",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {STEPS.map((step) => {
              const isExpanded = expandedStep === step.number;
              return (
                <div
                  key={step.number}
                  style={{ display: "flex", gap: "24px", alignItems: "flex-start", position: "relative" }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "#0049B8",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      fontWeight: 700,
                      flexShrink: 0,
                      position: "relative",
                      zIndex: 1,
                      boxShadow: "0 0 0 5px #ffffff, 0 0 0 6px rgba(0,73,184,0.12)",
                    }}
                  >
                    {step.number}
                  </div>

                  <div
                    onClick={() => setExpandedStep(isExpanded ? null : step.number)}
                    style={{
                      flex: 1,
                      background: "#ffffff",
                      border: "1px solid #e8eaed",
                      borderRadius: "12px",
                      padding: "24px 28px",
                      boxShadow: isExpanded ? "0 4px 12px rgba(0,0,0,0.06)" : "0 1px 3px rgba(0,0,0,0.04)",
                      cursor: "pointer",
                      transition: "box-shadow 0.2s ease, border-color 0.2s ease",
                      borderColor: isExpanded ? "rgba(0,73,184,0.2)" : "#e8eaed",
                    }}
                    onMouseEnter={(e) => {
                      if (!isExpanded) {
                        (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,73,184,0.15)";
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isExpanded) {
                        (e.currentTarget as HTMLDivElement).style.borderColor = "#e8eaed";
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
                      }
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: "16px", fontWeight: 700, color: "#0f172a", margin: "0 0 6px", letterSpacing: "-0.01em" }}>
                          {step.title}
                        </p>
                        <p style={{ fontSize: "14px", color: "#64748b", margin: 0, lineHeight: 1.7 }}>
                          {step.description}
                        </p>
                      </div>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#94a3b8",
                          flexShrink: 0,
                          marginLeft: "16px",
                          marginTop: "2px",
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {step.duration}
                      </span>
                    </div>

                    {isExpanded && (
                      <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid #f0f1f3" }}>
                        <ul style={{ margin: 0, padding: "0 0 0 16px" }}>
                          {step.details.map((detail, i) => (
                            <li
                              key={i}
                              style={{
                                fontSize: "13px",
                                color: "#475569",
                                lineHeight: 1.7,
                                marginBottom: i < step.details.length - 1 ? "6px" : 0,
                              }}
                            >
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Architecture */}
        <div style={{ borderTop: "1px solid #e8eaed", paddingTop: "64px", paddingBottom: "20px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#94a3b8", margin: "0 0 24px" }}>
            System Architecture
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
            {ARCHITECTURE.map((block, idx) => (
              <div key={block.label} style={{ position: "relative" }}>
                <div
                  style={{
                    background: idx === 2 ? "rgba(0,73,184,0.04)" : "#f8fafc",
                    border: `1px solid ${idx === 2 ? "rgba(0,73,184,0.12)" : "#e8eaed"}`,
                    borderRadius: "10px",
                    padding: "20px",
                  }}
                >
                  <p style={{ fontSize: "12px", fontWeight: 700, color: idx === 2 ? "#0049B8" : "#0f172a", margin: "0 0 12px", letterSpacing: "-0.01em" }}>
                    {block.label}
                  </p>
                  {block.items.map((item) => (
                    <p key={item} style={{ fontSize: "12px", color: "#64748b", margin: "0 0 4px", lineHeight: 1.5 }}>
                      {item}
                    </p>
                  ))}
                </div>
                {idx < ARCHITECTURE.length - 1 && (
                  <div style={{ position: "absolute", right: "-9px", top: "50%", transform: "translateY(-50%)", zIndex: 1 }}>
                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                      <path d="M1 1L5 5L1 9" stroke="#cbd5e1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Data Sources */}
        <div style={{ paddingTop: "48px", paddingBottom: "100px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#94a3b8", margin: "0 0 20px" }}>
            Data Sources
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
            {DATA_SOURCES.map((source) => (
              <div
                key={source.name}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#475569",
                  background: "#f8fafc",
                  border: "1px solid #e8eaed",
                  borderRadius: "8px",
                  padding: "10px 16px",
                }}
              >
                <span>{source.name}</span>
                <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: 400 }}>{source.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer style={{ borderTop: "1px solid #e8eaed", paddingTop: "40px", paddingBottom: "40px", background: "#ffffff" }}>
        <p style={{ fontSize: "11px", color: "#94a3b8", textAlign: "center", margin: 0, letterSpacing: "0.04em" }}>
          &copy; 2026 NextAutomation
        </p>
      </footer>
    </div>
  );
}
