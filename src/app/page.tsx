"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search, Building2, AlertTriangle, TrendingUp, MapPin,
  ChevronRight, Filter, Clock, Database, Activity,
  DollarSign, Users, FileText, BarChart3, Eye, X,
  ArrowUpRight, Phone, Mail, ExternalLink, Zap
} from "lucide-react"
import { mockDeals, dashboardStats, type Deal } from "@/data/deals"

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 8 ? "bg-red-500/20 text-red-400 border-red-500/30"
    : score >= 6 ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
    : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${color}`}>
      {score.toFixed(1)}
    </span>
  )
}

function StatusBadge({ status }: { status: Deal["status"] }) {
  const styles = {
    new: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    contacted: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    underwriting: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    passed: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider border ${styles[status]}`}>
      {status}
    </span>
  )
}

function formatCurrency(n: number) {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`
  return `$${n}`
}

function DealDetailModal({ deal, onClose }: { deal: Deal; onClose: () => void }) {
  const totalRevenue = deal.unitMix.reduce((sum, u) => sum + u.count * u.rent * 12, 0)
  const totalExpenses = deal.expenses.reduce((sum, e) => sum + e.annual, 0)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 backdrop-blur-sm overflow-y-auto py-8 px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-5xl bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 rounded-t-2xl px-6 py-4 flex items-start justify-between z-10">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-xs font-mono text-slate-500">{deal.id}</span>
              <StatusBadge status={deal.status} />
              <ScoreBadge score={deal.distressScore} />
            </div>
            <h2 className="text-xl font-bold text-white">{deal.address}</h2>
            <p className="text-sm text-slate-400">{deal.city}, {deal.state} — {deal.county} County</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { label: "Units", value: deal.units.toString(), icon: Building2 },
              { label: "Class", value: deal.class, icon: BarChart3 },
              { label: "Est. Value", value: formatCurrency(deal.estimatedValue), icon: DollarSign },
              { label: "$/Unit", value: formatCurrency(deal.pricePerUnit), icon: TrendingUp },
              { label: "Cap Rate", value: `${deal.capRate}%`, icon: Activity },
              { label: "Value-Add", value: `+${deal.valueAddUpside}%`, icon: ArrowUpRight },
            ].map(m => (
              <div key={m.label} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <m.icon className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">{m.label}</span>
                </div>
                <p className="text-lg font-bold text-white">{m.value}</p>
              </div>
            ))}
          </div>

          {/* Distress Signals */}
          <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4">
            <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5" />
              Distress Signals — Score {deal.distressScore}/10
            </h3>
            <div className="space-y-2">
              {deal.distressSignals.map((signal, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                  <span className="text-sm text-slate-300">{signal}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Financial Analysis */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
              <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5" />
                Financial Analysis
              </h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase">Current NOI</p>
                    <p className="text-base font-bold text-white">{formatCurrency(deal.currentNOI)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase">Pro Forma NOI</p>
                    <p className="text-base font-bold text-emerald-400">{formatCurrency(deal.proFormaNOI)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase">Cap Rate</p>
                    <p className="text-base font-bold text-white">{deal.capRate}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase">Pro Forma Cap</p>
                    <p className="text-base font-bold text-emerald-400">{deal.proFormaCapRate}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase">IRR (5yr)</p>
                    <p className="text-base font-bold text-white">{deal.irr5yr}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase">Equity Multiple</p>
                    <p className="text-base font-bold text-white">{deal.equityMultiple}x</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase">Cash-on-Cash</p>
                    <p className="text-base font-bold text-white">{deal.cashOnCash}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase">DSCR</p>
                    <p className="text-base font-bold text-white">{deal.dscr}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Owner Info */}
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
              <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Users className="w-3.5 h-3.5" />
                Owner Intelligence
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] text-slate-500 uppercase">Owner</p>
                  <p className="text-sm font-semibold text-white">{deal.ownerName}</p>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-400">{deal.ownerType}</span>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase">Mailing Address</p>
                  <p className="text-sm text-slate-300">{deal.ownerAddress}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase">Ownership</p>
                  <p className="text-sm text-slate-300">{deal.ownershipYears} years (since {deal.lastSaleDate.slice(0, 4)})</p>
                </div>
                {deal.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    <p className="text-sm text-slate-300">{deal.phone}</p>
                    <span className="text-[10px] text-slate-600">via Tracerfy</span>
                  </div>
                )}
                {deal.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <p className="text-sm text-slate-300">{deal.email}</p>
                  </div>
                )}
                <div>
                  <p className="text-[10px] text-slate-500 uppercase">Tax Status</p>
                  <p className={`text-sm font-medium ${deal.taxStatus.startsWith("Current") ? "text-emerald-400" : "text-red-400"}`}>
                    {deal.taxStatus}
                  </p>
                </div>
                {deal.mortgageBalance !== null && (
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase">Mortgage Balance</p>
                    <p className="text-sm text-slate-300">{formatCurrency(deal.mortgageBalance)}</p>
                  </div>
                )}
                {deal.mortgageBalance === null && (
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase">Mortgage</p>
                    <p className="text-sm font-medium text-emerald-400">Free & Clear — no mortgage on record</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Unit Mix & Expenses */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">Unit Mix — {deal.units} Total</h3>
              <div className="space-y-2">
                {deal.unitMix.map((u, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">{u.type} x{u.count}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-white font-medium">${u.count * u.rent * 12 > 0 ? (u.count * u.rent).toLocaleString() : 0}/mo</span>
                      <span className="text-slate-500 text-xs">(${u.rent}/unit)</span>
                    </div>
                  </div>
                ))}
                <div className="pt-2 mt-2 border-t border-slate-700/50 flex items-center justify-between text-sm font-bold">
                  <span className="text-slate-300">Total Gross Revenue</span>
                  <span className="text-white">{formatCurrency(totalRevenue)}/yr</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">HUD Fair Market Rent (avg)</span>
                  <span className="text-emerald-400 font-medium">${deal.fairMarketRent}/mo — +{deal.valueAddUpside}% upside</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
              <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-3">Operating Expenses</h3>
              <div className="space-y-2">
                {deal.expenses.map((e, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">{e.category}</span>
                    <span className="text-white font-medium">{formatCurrency(e.annual)}</span>
                  </div>
                ))}
                <div className="pt-2 mt-2 border-t border-slate-700/50 flex items-center justify-between text-sm font-bold">
                  <span className="text-slate-300">Total Expenses</span>
                  <span className="text-white">{formatCurrency(totalExpenses)}/yr</span>
                </div>
                <div className="flex items-center justify-between text-sm font-bold text-emerald-400">
                  <span>NOI</span>
                  <span>{formatCurrency(totalRevenue - totalExpenses)}/yr</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sources & Liens */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Database className="w-3.5 h-3.5" />
                Data Sources
              </h3>
              <div className="flex flex-wrap gap-2">
                {deal.source.map((s, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-700/50 border border-slate-600/30 text-xs text-slate-300">{s}</span>
                ))}
              </div>
              <p className="text-[10px] text-slate-600 mt-3">Found: {new Date(deal.dateFound).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
            </div>

            {deal.lienHistory.length > 0 && (
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
                <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-3">Lien History</h3>
                <div className="space-y-2">
                  {deal.lienHistory.map((l, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                      <span className="text-sm text-slate-300">{l}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Property Details */}
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Property Details</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div><p className="text-[10px] text-slate-500 uppercase">Year Built</p><p className="text-white font-medium">{deal.yearBuilt}</p></div>
              <div><p className="text-[10px] text-slate-500 uppercase">Building SF</p><p className="text-white font-medium">{deal.sqft.toLocaleString()}</p></div>
              <div><p className="text-[10px] text-slate-500 uppercase">Lot Size</p><p className="text-white font-medium">{deal.lotSize}</p></div>
              <div><p className="text-[10px] text-slate-500 uppercase">Assessed Value</p><p className="text-white font-medium">{formatCurrency(deal.assessedValue)}</p></div>
              <div><p className="text-[10px] text-slate-500 uppercase">Last Sale</p><p className="text-white font-medium">{deal.lastSaleDate}</p></div>
              <div><p className="text-[10px] text-slate-500 uppercase">Last Sale Price</p><p className="text-white font-medium">{formatCurrency(deal.lastSalePrice)}</p></div>
              <div><p className="text-[10px] text-slate-500 uppercase">Avg Rent/Unit</p><p className="text-white font-medium">${deal.rentPerUnit}/mo</p></div>
              <div><p className="text-[10px] text-slate-500 uppercase">FMR Benchmark</p><p className="text-emerald-400 font-medium">${deal.fairMarketRent}/mo</p></div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function DemoPage() {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null)
  const [filterCounty, setFilterCounty] = useState<string>("all")
  const [sortBy, setSortBy] = useState<"distressScore" | "units" | "capRate" | "valueAddUpside">("distressScore")

  const counties = ["all", ...new Set(mockDeals.map(d => `${d.county}, ${d.state}`))]

  const filteredDeals = mockDeals
    .filter(d => filterCounty === "all" || `${d.county}, ${d.state}` === filterCounty)
    .sort((a, b) => b[sortBy] - a[sortBy])

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Top Bar */}
      <div className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0049B8] flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white">Blue Chip RE Advisors</h1>
              <p className="text-[10px] text-slate-500">Off-Market Deal Finder — Demo</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-medium text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live — {dashboardStats.sourcesActive} sources active
            </span>
            <span className="text-[10px] text-slate-600">
              Last scan: {new Date(dashboardStats.lastScanTime).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Deals Found", value: dashboardStats.totalDealsFound.toString(), sub: `${dashboardStats.newThisWeek} new this week`, icon: Search, color: "text-blue-400" },
            { label: "High Distress (8+)", value: dashboardStats.highDistress.toString(), sub: "Immediate opportunities", icon: AlertTriangle, color: "text-red-400" },
            { label: "Total Units", value: dashboardStats.totalUnits.toString(), sub: `${dashboardStats.countiesMonitored} counties monitored`, icon: Building2, color: "text-purple-400" },
            { label: "Avg Cap Rate", value: `${dashboardStats.avgCapRate}%`, sub: "Across all deals", icon: TrendingUp, color: "text-emerald-400" },
          ].map(s => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/50 border border-slate-800 rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <s.icon className={`w-4 h-4 ${s.color}`} />
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">{s.label}</span>
              </div>
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">{s.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* County & Signal Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-900/50 border border-slate-800 rounded-xl p-4"
          >
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" />
              Deals by County
            </h3>
            <div className="space-y-2">
              {dashboardStats.countyBreakdown.map(c => (
                <div key={c.county} className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">{c.county}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full rounded-full bg-[#0049B8]" style={{ width: `${(c.deals / 12) * 100}%` }} />
                    </div>
                    <span className="text-xs text-slate-400 w-20 text-right">{c.deals} deals / {c.units} units</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-slate-900/50 border border-slate-800 rounded-xl p-4"
          >
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5" />
              Signal Breakdown
            </h3>
            <div className="space-y-2">
              {dashboardStats.signalBreakdown.map(s => (
                <div key={s.signal} className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">{s.signal}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full rounded-full bg-red-500/60" style={{ width: `${(s.count / 18) * 100}%` }} />
                    </div>
                    <span className="text-xs text-slate-400 w-6 text-right">{s.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs text-slate-500">Filter:</span>
          </div>
          <select
            value={filterCounty}
            onChange={e => setFilterCounty(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0049B8]"
          >
            {counties.map(c => (
              <option key={c} value={c}>{c === "all" ? "All Counties" : c}</option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as typeof sortBy)}
            className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0049B8]"
          >
            <option value="distressScore">Sort: Distress Score</option>
            <option value="units">Sort: Unit Count</option>
            <option value="capRate">Sort: Cap Rate</option>
            <option value="valueAddUpside">Sort: Value-Add Upside</option>
          </select>
          <span className="text-[10px] text-slate-600 ml-auto">{filteredDeals.length} deals</span>
        </div>

        {/* Deal Cards */}
        <div className="space-y-3">
          {filteredDeals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
              onClick={() => setSelectedDeal(deal)}
              className="group bg-slate-900/50 hover:bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-xl p-4 cursor-pointer transition-all duration-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-slate-600">{deal.id}</span>
                    <StatusBadge status={deal.status} />
                    <ScoreBadge score={deal.distressScore} />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                    {deal.address}
                  </h3>
                  <p className="text-sm text-slate-400">{deal.city}, {deal.state} — {deal.county} County</p>

                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {deal.distressSignals.slice(0, 3).map((s, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-[10px] text-red-400 truncate max-w-[200px]">
                        {s.split("—")[0].trim()}
                      </span>
                    ))}
                    {deal.distressSignals.length > 3 && (
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-500">
                        +{deal.distressSignals.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex-shrink-0 grid grid-cols-3 gap-3 text-right">
                  <div>
                    <p className="text-[10px] text-slate-500">Units</p>
                    <p className="text-sm font-bold text-white">{deal.units}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500">Est. Value</p>
                    <p className="text-sm font-bold text-white">{formatCurrency(deal.estimatedValue)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500">Cap Rate</p>
                    <p className="text-sm font-bold text-white">{deal.capRate}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500">NOI</p>
                    <p className="text-sm font-bold text-white">{formatCurrency(deal.currentNOI)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500">Pro Forma</p>
                    <p className="text-sm font-bold text-emerald-400">{formatCurrency(deal.proFormaNOI)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500">Upside</p>
                    <p className="text-sm font-bold text-emerald-400">+{deal.valueAddUpside}%</p>
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-blue-400 transition-colors mt-2 flex-shrink-0" />
              </div>

              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-800/50">
                <span className="text-[10px] text-slate-600 flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {deal.ownerName}
                </span>
                <span className="text-[10px] text-slate-600 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Owned {deal.ownershipYears}yr
                </span>
                <span className="text-[10px] text-slate-600 flex items-center gap-1">
                  <Database className="w-3 h-3" />
                  {deal.source.length} sources
                </span>
                {deal.phone && (
                  <span className="text-[10px] text-slate-600 flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    Contact found
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 py-6 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-600">
            Demo for Blue Chip RE Advisors — Data is simulated for demonstration purposes
          </p>
          <p className="text-xs text-[#0049B8] font-medium mt-1">
            Powered by NextAutomation — nextautomation.us
          </p>
        </div>
      </div>

      {/* Deal Detail Modal */}
      <AnimatePresence>
        {selectedDeal && (
          <DealDetailModal deal={selectedDeal} onClose={() => setSelectedDeal(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}
