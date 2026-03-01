"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search, Building2, AlertTriangle, TrendingUp, MapPin,
  ChevronRight, ChevronLeft, Filter, Clock, Database, Activity,
  DollarSign, Users, FileText, BarChart3, Eye, X,
  ArrowUpRight, Phone, Mail, Zap, Play, Pause,
  BrainCircuit, Bell, FileSpreadsheet, CheckCircle2, Target
} from "lucide-react"
import { mockDeals, dashboardStats, type Deal } from "@/data/deals"

/* ─────────── Helpers ─────────── */

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 8 ? "bg-red-500/10 text-red-600 border-red-200"
    : score >= 6 ? "bg-amber-500/10 text-amber-600 border-amber-200"
    : "bg-emerald-500/10 text-emerald-600 border-emerald-200"
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${color}`}>
      {score.toFixed(1)}/10
    </span>
  )
}

function StatusBadge({ status }: { status: Deal["status"] }) {
  const styles = {
    new: "bg-blue-500/10 text-blue-600 border-blue-200",
    contacted: "bg-amber-500/10 text-amber-600 border-amber-200",
    underwriting: "bg-purple-500/10 text-purple-600 border-purple-200",
    passed: "bg-gray-500/10 text-gray-500 border-gray-200",
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${styles[status]}`}>
      {status}
    </span>
  )
}

function formatCurrency(n: number) {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`
  return `$${n}`
}

/* ─────────── System Demo Carousel ─────────── */

interface DemoStep {
  title: string
  description: string
  type: "trigger" | "action" | "ai" | "output"
  icon: typeof Search
  integration: string
  mockLines: string[]
  mockType: "dashboard" | "form" | "notification" | "document"
}

const typeColors = {
  trigger: { bg: "from-emerald-500/20 to-emerald-500/5", border: "border-emerald-500/30", text: "text-emerald-600", icon: "#059669" },
  action: { bg: "from-indigo-500/20 to-indigo-500/5", border: "border-indigo-500/30", text: "text-indigo-600", icon: "#6366F1" },
  ai: { bg: "from-blue-500/20 to-blue-500/5", border: "border-blue-500/30", text: "text-blue-600", icon: "#0049B8" },
  output: { bg: "from-red-500/20 to-red-500/5", border: "border-red-500/30", text: "text-red-600", icon: "#DC2626" },
}

const systemDemos = [
  {
    id: "deal-finder",
    title: "Off-Market Deal Finder",
    subtitle: "Daily monitoring of 12+ public record sources across 6 counties. AI scores every lead 0-10 based on your criteria.",
    price: "$5,000",
    icon: Search,
    steps: [
      {
        title: "Data Source Monitoring",
        description: "System scans MA Registry of Deeds, NH Registry of Deeds, MA Land Court, Secretary of State LLC filings, town assessor databases, MassGIS, and NH GRANIT — every day at 6 AM.",
        type: "trigger" as const,
        icon: Database,
        integration: "12 Public Record Sources",
        mockType: "dashboard" as const,
        mockLines: [
          "Suffolk County: 12 new multifamily recordings",
          "Middlesex County: 8 new filings detected",
          "Hillsborough NH: 5 new deed transfers",
          "Essex County: 3 lis pendens + 2 executor deeds"
        ]
      },
      {
        title: "AI Filters & Scores",
        description: "AI cross-references every recording against your criteria: multifamily 5-50 units, Class C or B-minus, secondary markets in Boston metro and Southern NH. Each lead gets a distress score from 0 to 10.",
        type: "ai" as const,
        icon: BrainCircuit,
        integration: "AI Scoring Engine",
        mockType: "form" as const,
        mockLines: [
          "47 Elm St, Nashua NH — 18 units, Class C",
          "Distress score: 8.5/10 (HIGH PRIORITY)",
          "Signals: Tax delinquent 18mo, LLC dissolved, mechanic's lien",
          "Value-add upside: +35% rent increase potential"
        ]
      },
      {
        title: "Property Enrichment",
        description: "System enriches each lead with owner info from town assessors, rent estimates via RentCast, HUD Fair Market Rents, transaction history, and contact data via skip tracing.",
        type: "action" as const,
        icon: FileSpreadsheet,
        integration: "Assessor + RentCast + Skip Trace",
        mockType: "form" as const,
        mockLines: [
          "Owner: Heritage Properties LLC (since 2008)",
          "Mailing: 2847 Palm Beach Blvd, Fort Lauderdale, FL",
          "Units: 18 | Current NOI: $142K | Cap Rate: 7.7%",
          "Phone: (603) 555-0184 | Mortgage: $620K remaining"
        ]
      },
      {
        title: "Deal Alert Delivered",
        description: "Qualified leads delivered to your inbox and deal tracker with full financials, distress signals, owner contact info, and AI-recommended offer range.",
        type: "output" as const,
        icon: Bell,
        integration: "Email + Deal Tracker",
        mockType: "notification" as const,
        mockLines: [
          "NEW OFF-MARKET LEAD — Score 8.5/10",
          "47 Elm St, Nashua NH — 18 units | Class C",
          "Est. value: $1.85M | NOI: $142K | Cap: 7.7%",
          "Owner in FL, tax delinquent, LLC dissolved — motivated"
        ]
      }
    ]
  },
  {
    id: "underwriting",
    title: "AI Underwriting Assistant",
    subtitle: "Upload an offering memorandum. AI extracts every number, populates your Excel model, flags assumptions it's not confident about.",
    price: "$2,000",
    icon: FileText,
    steps: [
      {
        title: "Document Upload",
        description: "Upload an offering memorandum, broker package, or property listing. System accepts PDF, Word, and scanned documents with OCR processing.",
        type: "trigger" as const,
        icon: FileText,
        integration: "Document Upload",
        mockType: "document" as const,
        mockLines: [
          "Offering Memorandum received — 47 pages",
          "Property: 32-unit apartment complex, Lowell MA",
          "Parsing rent roll, expenses, capital plan...",
          "OCR processing scanned pages 12-15..."
        ]
      },
      {
        title: "AI Data Extraction",
        description: "AI extracts rent rolls, operating expenses, NOI, purchase price, loan terms, unit mix, and capital expenditure estimates from every page of the document.",
        type: "ai" as const,
        icon: BrainCircuit,
        integration: "AI Engine",
        mockType: "form" as const,
        mockLines: [
          "Rent roll: 32 units, avg $1,150/mo gross",
          "Operating expenses: $287K annually",
          "Current NOI: $154K | Pro forma NOI: $212K",
          "Confidence: 9/10 — flagged 2 items for review"
        ]
      },
      {
        title: "Excel Model Population",
        description: "Extracted data flows directly into your Excel underwriting model — IRR, DSCR, equity multiple, cash-on-cash, amortization schedule, and waterfall distribution calculations.",
        type: "action" as const,
        icon: FileSpreadsheet,
        integration: "Your Excel Model",
        mockType: "dashboard" as const,
        mockLines: [
          "IRR (5yr): 18.4% | Equity Multiple: 2.1x",
          "DSCR: 1.35 | Cash-on-Cash: 9.2%",
          "Waterfall: 70/30 split after 8% pref return",
          "Amortization: 25yr @ 6.75% — $1,247/mo P&I"
        ]
      },
      {
        title: "Human-in-the-Loop Review",
        description: "AI flags any assumptions it's not 100% confident about and sends you a message asking for confirmation before finalizing the model.",
        type: "output" as const,
        icon: CheckCircle2,
        integration: "Review Dashboard",
        mockType: "notification" as const,
        mockLines: [
          "UNDERWRITING COMPLETE — 2 items flagged",
          "⚠ Vacancy rate assumed 5% — OM states 8%",
          "⚠ CapEx reserve: $500/unit — verify with inspection",
          "Reply to confirm or adjust → model updates instantly"
        ]
      }
    ]
  },
  {
    id: "outreach",
    title: "Automated Outreach Engine",
    subtitle: "Skip trace owners, send personalized email and SMS sequences, track responses — all automated from the leads your Deal Finder surfaces.",
    price: "$1,500",
    icon: Zap,
    steps: [
      {
        title: "Lead Import + Skip Trace",
        description: "System pulls qualified leads from the Deal Finder. Skip tracing enriches each owner with phone, email, mailing address, and entity information.",
        type: "trigger" as const,
        icon: Database,
        integration: "Deal Finder + Skip Trace",
        mockType: "dashboard" as const,
        mockLines: [
          "Importing 12 qualified leads from this week",
          "Skip tracing: 11/12 matches (92% hit rate)",
          "Phone found: 9 | Email found: 7 | Mail: 12",
          "Ready for outreach sequences"
        ]
      },
      {
        title: "AI Personalization",
        description: "AI writes a personalized message for each owner based on their specific situation — distress signals, property details, neighborhood context, and a value proposition tailored to their motivation.",
        type: "ai" as const,
        icon: BrainCircuit,
        integration: "AI Engine",
        mockType: "form" as const,
        mockLines: [
          "Heritage Properties LLC — 47 Elm St, Nashua",
          "Angle: Tax delinquency relief + LLC dissolution",
          "Tone: Professional, direct, investor-to-owner",
          "\"We noticed your property at 47 Elm may be...\""
        ]
      },
      {
        title: "Multi-Channel Delivery",
        description: "Automated sequences via email and SMS with intelligent spacing. Day 1: personalized email. Day 3: SMS follow-up. Day 7: second email. Day 14: final touch.",
        type: "action" as const,
        icon: Zap,
        integration: "Email + SMS",
        mockType: "notification" as const,
        mockLines: [
          "Email #1 sent — personalized investor intro",
          "SMS queued for Day 3 — short direct message",
          "Email #2 queued for Day 7 — market data follow-up",
          "Sequence pauses on reply — flags for manual follow-up"
        ]
      },
      {
        title: "Response Tracking",
        description: "Real-time tracking of opens, clicks, replies, and engagement across all channels. Warm responses flagged immediately for your personal follow-up.",
        type: "output" as const,
        icon: Target,
        integration: "Analytics",
        mockType: "dashboard" as const,
        mockLines: [
          "Open rate: 47% | Reply rate: 12%",
          "3 warm responses — flagged for follow-up",
          "Heritage Properties LLC replied: \"Interested, call me\"",
          "Pipeline value: $4.2M in potential acquisitions"
        ]
      }
    ]
  }
]

function SystemDemoCarousel({ demo }: { demo: typeof systemDemos[0] }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    setCurrentStep(0)
  }, [demo.id])

  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % demo.steps.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [isPlaying, demo.steps.length])

  const step = demo.steps[currentStep]
  const colors = typeColors[step.type]
  const Icon = step.icon

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_rgba(0,73,184,0.12)] p-6 md:p-8">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/30 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />

      {/* Header */}
      <div className="relative flex items-center justify-between mb-6">
        <div className="flex items-center gap-1.5">
          {demo.steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentStep(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentStep ? "w-8 bg-[#0049B8]"
                  : i < currentStep ? "w-2 bg-[#0049B8]/50"
                  : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-base font-semibold text-gray-900">
            Step <span className="text-[#0049B8]">{currentStep + 1}</span> of {demo.steps.length}
          </span>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4 text-gray-500" /> : <Play className="w-4 h-4 text-gray-500" />}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="min-h-[320px] md:min-h-[280px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative"
          >
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${colors.bg} ${colors.border} border flex items-center justify-center`}>
                    <Icon className="w-6 h-6" style={{ color: colors.icon }} />
                  </div>
                  <div>
                    <span className={`text-xs font-medium uppercase tracking-wider ${colors.text}`}>
                      {step.type === "ai" ? "AI Powered" : step.type}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">{step.title}</h3>
                  </div>
                </div>
                <p className="text-gray-500 leading-relaxed">{step.description}</p>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 rounded-full border border-gray-200 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm text-gray-500">
                    Integrates with <span className="font-medium text-gray-900">{step.integration}</span>
                  </span>
                </div>
              </div>

              <div className="relative">
                <div className={`rounded-2xl bg-gradient-to-br ${colors.bg} ${colors.border} border p-4 md:p-5`}>
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-200/50">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <span className="text-xs text-gray-500 ml-2">{step.integration}</span>
                  </div>
                  <div className="space-y-3">
                    {step.mockLines.map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.15 }}
                        className="p-3 rounded-xl bg-white/90 text-gray-700 shadow-sm"
                      >
                        <p className="text-sm font-medium">{line}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="relative flex items-center justify-between mt-8 pt-6 border-t border-gray-200/50">
        <button
          onClick={() => setCurrentStep(prev => (prev - 1 + demo.steps.length) % demo.steps.length)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>
        <div className="flex items-center gap-3">
          {demo.steps.map((s, i) => {
            const StepIcon = s.icon
            return (
              <button
                key={i}
                onClick={() => setCurrentStep(i)}
                className="flex flex-col items-center gap-1"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  i === currentStep
                    ? "bg-[#0049B8] text-white shadow-lg shadow-[#0049B8]/30 scale-110"
                    : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                }`}>
                  <StepIcon className="w-4 h-4" />
                </div>
                <span className={`text-xs font-medium ${i === currentStep ? "text-[#0049B8]" : "text-gray-400"}`}>
                  {i + 1}
                </span>
              </button>
            )
          })}
        </div>
        <button
          onClick={() => setCurrentStep(prev => (prev + 1) % demo.steps.length)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

/* ─────────── Deal Detail Modal ─────────── */

function DealDetailModal({ deal, onClose }: { deal: Deal; onClose: () => void }) {
  const totalRevenue = deal.unitMix.reduce((sum, u) => sum + u.count * u.rent * 12, 0)
  const totalExpenses = deal.expenses.reduce((sum, e) => sum + e.annual, 0)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 backdrop-blur-sm overflow-y-auto py-8 px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        className="relative w-full max-w-5xl bg-white border border-gray-200 rounded-3xl shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-gray-100 rounded-t-3xl px-6 py-4 flex items-start justify-between z-10">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-xs font-mono text-gray-400">{deal.id}</span>
              <StatusBadge status={deal.status} />
              <ScoreBadge score={deal.distressScore} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">{deal.address}</h2>
            <p className="text-sm text-gray-500">{deal.city}, {deal.state} — {deal.county} County</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { label: "Units", value: deal.units.toString(), icon: Building2 },
              { label: "Class", value: deal.class, icon: BarChart3 },
              { label: "Est. Value", value: formatCurrency(deal.estimatedValue), icon: DollarSign },
              { label: "$/Unit", value: formatCurrency(deal.pricePerUnit), icon: TrendingUp },
              { label: "Cap Rate", value: `${deal.capRate}%`, icon: Activity },
              { label: "Value-Add", value: `+${deal.valueAddUpside}%`, icon: ArrowUpRight },
            ].map(m => (
              <div key={m.label} className="bg-gray-50 border border-gray-100 rounded-xl p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <m.icon className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider">{m.label}</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{m.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-red-50 border border-red-100 rounded-xl p-4">
            <h3 className="text-xs font-bold text-red-600 uppercase tracking-wider mb-3 flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5" /> Distress Signals — Score {deal.distressScore}/10
            </h3>
            <div className="space-y-2">
              {deal.distressSignals.map((signal, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{signal}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
              <h3 className="text-xs font-bold text-[#0049B8] uppercase tracking-wider mb-4 flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5" /> Financial Analysis
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Current NOI", value: formatCurrency(deal.currentNOI), highlight: false },
                  { label: "Pro Forma NOI", value: formatCurrency(deal.proFormaNOI), highlight: true },
                  { label: "Cap Rate", value: `${deal.capRate}%`, highlight: false },
                  { label: "Pro Forma Cap", value: `${deal.proFormaCapRate}%`, highlight: true },
                  { label: "IRR (5yr)", value: `${deal.irr5yr}%`, highlight: false },
                  { label: "Equity Multiple", value: `${deal.equityMultiple}x`, highlight: false },
                  { label: "Cash-on-Cash", value: `${deal.cashOnCash}%`, highlight: false },
                  { label: "DSCR", value: `${deal.dscr}`, highlight: false },
                ].map(m => (
                  <div key={m.label}>
                    <p className="text-[10px] text-gray-400 uppercase">{m.label}</p>
                    <p className={`text-base font-bold ${m.highlight ? "text-emerald-600" : "text-gray-900"}`}>{m.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
              <h3 className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Users className="w-3.5 h-3.5" /> Owner Intelligence
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase">Owner</p>
                  <p className="font-semibold text-gray-900">{deal.ownerName}</p>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-200 text-gray-600">{deal.ownerType}</span>
                </div>
                <div><p className="text-[10px] text-gray-400 uppercase">Address</p><p className="text-gray-700">{deal.ownerAddress}</p></div>
                <div><p className="text-[10px] text-gray-400 uppercase">Ownership</p><p className="text-gray-700">{deal.ownershipYears} years</p></div>
                {deal.phone && <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-gray-400" /><span className="text-gray-700">{deal.phone}</span><span className="text-[10px] text-gray-400">via skip trace</span></div>}
                {deal.email && <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-gray-400" /><span className="text-gray-700">{deal.email}</span></div>}
                <div>
                  <p className="text-[10px] text-gray-400 uppercase">Tax Status</p>
                  <p className={`font-medium ${deal.taxStatus.startsWith("Current") ? "text-emerald-600" : "text-red-600"}`}>{deal.taxStatus}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase">Mortgage</p>
                  <p className={deal.mortgageBalance ? "text-gray-700" : "text-emerald-600 font-medium"}>{deal.mortgageBalance ? formatCurrency(deal.mortgageBalance) : "Free & Clear"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
              <h3 className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-3">Unit Mix — {deal.units} Total</h3>
              <div className="space-y-2">
                {deal.unitMix.map((u, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{u.type} x{u.count}</span>
                    <span className="text-gray-900 font-medium">${(u.count * u.rent).toLocaleString()}/mo <span className="text-gray-400 text-xs">(${u.rent}/unit)</span></span>
                  </div>
                ))}
                <div className="pt-2 mt-2 border-t border-gray-200 flex justify-between text-sm font-bold">
                  <span className="text-gray-700">Total Revenue</span><span className="text-gray-900">{formatCurrency(totalRevenue)}/yr</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">HUD FMR (avg)</span><span className="text-emerald-600 font-medium">${deal.fairMarketRent}/mo — +{deal.valueAddUpside}% upside</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
              <h3 className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-3">Operating Expenses</h3>
              <div className="space-y-2">
                {deal.expenses.map((e, i) => (
                  <div key={i} className="flex justify-between text-sm"><span className="text-gray-500">{e.category}</span><span className="text-gray-900 font-medium">{formatCurrency(e.annual)}</span></div>
                ))}
                <div className="pt-2 mt-2 border-t border-gray-200 flex justify-between text-sm font-bold">
                  <span className="text-gray-700">Total</span><span className="text-gray-900">{formatCurrency(totalExpenses)}/yr</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-emerald-600">
                  <span>NOI</span><span>{formatCurrency(totalRevenue - totalExpenses)}/yr</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Data Sources</h3>
            <div className="flex flex-wrap gap-2">
              {deal.source.map((s, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-xs text-gray-600">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─────────── Main Page ─────────── */

export default function DemoPage() {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null)
  const [activeSystem, setActiveSystem] = useState(0)
  const [activeView, setActiveView] = useState<"demos" | "live-feed">("demos")

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero */}
      <section className="relative py-16 md:py-24 border-b overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0049B8]/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-[#0049B8]/10 text-[#0049B8] px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Building2 className="h-4 w-4" />
              Custom Demo for Blue Chip RE Advisors
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              AI-Powered Multifamily<br />
              <span className="text-[#0049B8]">Acquisition System</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-500 mb-4 max-w-2xl mx-auto"
            >
              Three systems working together to find off-market deals, underwrite them instantly, and reach out to owners — built for Class C and B-minus multifamily, 5-50 units, across Boston and Southern New Hampshire.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-2 text-sm text-gray-400"
            >
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                12 sources monitored daily
              </span>
              <span className="text-gray-300">|</span>
              <span>6 counties</span>
              <span className="text-gray-300">|</span>
              <span>Suffolk, Middlesex, Essex, Norfolk, Hillsborough, Rockingham</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 py-3">
            <button
              onClick={() => setActiveView("demos")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeView === "demos"
                  ? "bg-[#0049B8] text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              System Demos
            </button>
            <button
              onClick={() => setActiveView("live-feed")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeView === "live-feed"
                  ? "bg-[#0049B8] text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              Live Deal Feed
            </button>
          </div>
        </div>
      </div>

      {activeView === "demos" && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">How Each System Works</h2>
                <p className="text-gray-500 max-w-2xl mx-auto">
                  Three independent systems that work together. Each one is built and delivered separately — start with the Deal Finder, or take all three.
                </p>
              </div>

              {/* System Tabs */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {systemDemos.map((demo, i) => {
                  const DemoIcon = demo.icon
                  return (
                    <button
                      key={demo.id}
                      onClick={() => setActiveSystem(i)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeSystem === i
                          ? "bg-[#0049B8] text-white"
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      <DemoIcon className="h-4 w-4" />
                      {demo.title}
                    </button>
                  )
                })}
              </div>

              {/* Active Demo Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-[#0049B8]/10 flex items-center justify-center">
                  {(() => { const Icon = systemDemos[activeSystem].icon; return <Icon className="h-7 w-7 text-[#0049B8]" /> })()}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-2xl font-bold text-gray-900">{systemDemos[activeSystem].title}</h3>
                    <div className="text-right flex-shrink-0">
                      <div className="text-lg font-bold text-[#0049B8]">{systemDemos[activeSystem].price}</div>
                      <div className="text-xs text-gray-400">one-time build</div>
                    </div>
                  </div>
                  <p className="text-gray-500">{systemDemos[activeSystem].subtitle}</p>
                </div>
              </div>

              <SystemDemoCarousel demo={systemDemos[activeSystem]} />
            </div>
          </div>
        </section>
      )}

      {activeView === "live-feed" && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {[
                  { label: "Deals Found", value: dashboardStats.totalDealsFound.toString(), sub: `${dashboardStats.newThisWeek} new this week`, icon: Search, color: "text-[#0049B8]" },
                  { label: "High Distress (8+)", value: dashboardStats.highDistress.toString(), sub: "Immediate opportunities", icon: AlertTriangle, color: "text-red-500" },
                  { label: "Total Units", value: dashboardStats.totalUnits.toString(), sub: "6 counties monitored", icon: Building2, color: "text-purple-500" },
                  { label: "Avg Cap Rate", value: `${dashboardStats.avgCapRate}%`, sub: "Across all deals", icon: TrendingUp, color: "text-emerald-500" },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i }}
                    className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <s.icon className={`w-4 h-4 ${s.color}`} />
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider">{s.label}</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{s.sub}</p>
                  </motion.div>
                ))}
              </div>

              {/* County & Signal Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" /> Deals by County
                  </h3>
                  <div className="space-y-2.5">
                    {dashboardStats.countyBreakdown.map(c => (
                      <div key={c.county} className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">{c.county}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-2 rounded-full bg-gray-100 overflow-hidden">
                            <div className="h-full rounded-full bg-[#0049B8]/60" style={{ width: `${(c.deals / 12) * 100}%` }} />
                          </div>
                          <span className="text-xs text-gray-400 w-20 text-right">{c.deals} deals</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5" /> Signal Breakdown
                  </h3>
                  <div className="space-y-2.5">
                    {dashboardStats.signalBreakdown.map(s => (
                      <div key={s.signal} className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">{s.signal}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-24 h-2 rounded-full bg-gray-100 overflow-hidden">
                            <div className="h-full rounded-full bg-red-400/60" style={{ width: `${(s.count / 18) * 100}%` }} />
                          </div>
                          <span className="text-xs text-gray-400 w-6 text-right">{s.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Deal Cards */}
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Deals — Sample Data</h3>
              <div className="space-y-3">
                {mockDeals.map((deal, index) => (
                  <motion.div
                    key={deal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index }}
                    onClick={() => setSelectedDeal(deal)}
                    className="group bg-white hover:bg-gray-50 border border-gray-200 hover:border-[#0049B8]/30 rounded-xl p-4 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-gray-400">{deal.id}</span>
                          <StatusBadge status={deal.status} />
                          <ScoreBadge score={deal.distressScore} />
                        </div>
                        <h3 className="text-base font-bold text-gray-900 group-hover:text-[#0049B8] transition-colors">{deal.address}</h3>
                        <p className="text-sm text-gray-500">{deal.city}, {deal.state} — {deal.county} County</p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {deal.distressSignals.slice(0, 3).map((s, i) => (
                            <span key={i} className="px-2 py-0.5 rounded bg-red-50 border border-red-100 text-[10px] text-red-600 truncate max-w-[200px]">
                              {s.split("—")[0].trim()}
                            </span>
                          ))}
                          {deal.distressSignals.length > 3 && (
                            <span className="px-2 py-0.5 rounded bg-gray-50 text-[10px] text-gray-400">+{deal.distressSignals.length - 3} more</span>
                          )}
                        </div>
                      </div>
                      <div className="flex-shrink-0 grid grid-cols-3 gap-3 text-right">
                        <div><p className="text-[10px] text-gray-400">Units</p><p className="text-sm font-bold text-gray-900">{deal.units}</p></div>
                        <div><p className="text-[10px] text-gray-400">Est. Value</p><p className="text-sm font-bold text-gray-900">{formatCurrency(deal.estimatedValue)}</p></div>
                        <div><p className="text-[10px] text-gray-400">Cap Rate</p><p className="text-sm font-bold text-gray-900">{deal.capRate}%</p></div>
                        <div><p className="text-[10px] text-gray-400">NOI</p><p className="text-sm font-bold text-gray-900">{formatCurrency(deal.currentNOI)}</p></div>
                        <div><p className="text-[10px] text-gray-400">Pro Forma</p><p className="text-sm font-bold text-emerald-600">{formatCurrency(deal.proFormaNOI)}</p></div>
                        <div><p className="text-[10px] text-gray-400">Upside</p><p className="text-sm font-bold text-emerald-600">+{deal.valueAddUpside}%</p></div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#0049B8] transition-colors mt-2 flex-shrink-0" />
                    </div>
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
                      <span className="text-[10px] text-gray-400 flex items-center gap-1"><Users className="w-3 h-3" /> {deal.ownerName}</span>
                      <span className="text-[10px] text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" /> Owned {deal.ownershipYears}yr</span>
                      <span className="text-[10px] text-gray-400 flex items-center gap-1"><Database className="w-3 h-3" /> {deal.source.length} sources</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-gray-400 mb-1">Demo for Blue Chip RE Advisors — Data is simulated for demonstration purposes</p>
          <p className="text-sm text-[#0049B8] font-medium">nextautomation.us</p>
        </div>
      </footer>

      <AnimatePresence>
        {selectedDeal && <DealDetailModal deal={selectedDeal} onClose={() => setSelectedDeal(null)} />}
      </AnimatePresence>
    </div>
  )
}
