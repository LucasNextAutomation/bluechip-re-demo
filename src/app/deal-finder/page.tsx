"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search, Building2, AlertTriangle, TrendingUp, MapPin,
  ChevronRight, Filter, Clock, Database, Activity,
  DollarSign, Users, BarChart3, ArrowUpDown, SlidersHorizontal
} from "lucide-react"
import { mockDeals, dashboardStats, type Deal } from "@/data/deals"
import Navbar from "@/components/Navbar"
import DealSlideout from "@/components/DealSlideout"
import Footer from "@/components/Footer"

function fmt(n: number) {
  if (n >= 1000000) return `$${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `$${(n / 1000).toFixed(0)}K`
  return `$${n}`
}

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 8 ? "bg-red-500/10 text-red-600 border-red-200"
    : score >= 6 ? "bg-amber-500/10 text-amber-600 border-amber-200"
    : "bg-emerald-500/10 text-emerald-600 border-emerald-200"
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border ${color}`}>{score.toFixed(1)}</span>
}

function StatusBadge({ status }: { status: Deal["status"] }) {
  const styles = {
    new: "bg-blue-500/10 text-blue-600 border-blue-200",
    contacted: "bg-amber-500/10 text-amber-600 border-amber-200",
    underwriting: "bg-purple-500/10 text-purple-600 border-purple-200",
    passed: "bg-gray-500/10 text-gray-500 border-gray-200",
  }
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${styles[status]}`}>{status}</span>
}

type SortKey = "distressScore" | "capRate" | "units" | "estimatedValue"

const activityFeed = [
  { time: "3 min ago", text: "2 new filings detected in Suffolk County", type: "new" },
  { time: "18 min ago", text: "Skip trace complete — Heritage Properties LLC", type: "update" },
  { time: "42 min ago", text: "AI scored DEAL-006 at 9.5/10 — HIGH PRIORITY", type: "alert" },
  { time: "1 hr ago", text: "Executor deed filed in Essex County Registry", type: "new" },
  { time: "2 hr ago", text: "Tax lien data refreshed — Hillsborough County", type: "update" },
  { time: "3 hr ago", text: "New lis pendens found — 1456 Dorchester Ave", type: "alert" },
]

export default function DealFinderPage() {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null)
  const [countyFilter, setCountyFilter] = useState("all")
  const [sortBy, setSortBy] = useState<SortKey>("distressScore")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc")
  const [showFilters, setShowFilters] = useState(false)

  const filteredDeals = mockDeals
    .filter(d => countyFilter === "all" || d.county === countyFilter)
    .sort((a, b) => sortDir === "desc" ? b[sortBy] - a[sortBy] : a[sortBy] - b[sortBy])

  const counties = [...new Set(mockDeals.map(d => d.county))]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Off-Market Deal Finder</h1>
            <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {dashboardStats.sourcesActive} data sources active — Last scan: {new Date(dashboardStats.lastScanTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              <span className="text-gray-300">|</span>
              {dashboardStats.countiesMonitored} counties
            </p>
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${showFilters ? "bg-[#0049B8] text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
        </div>

        {/* Filter Bar */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-4"
            >
              <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-wrap items-center gap-4">
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">County</label>
                  <select
                    value={countyFilter}
                    onChange={e => setCountyFilter(e.target.value)}
                    className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700"
                  >
                    <option value="all">All Counties</option>
                    {counties.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 uppercase tracking-wider block mb-1">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as SortKey)}
                    className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700"
                  >
                    <option value="distressScore">Distress Score</option>
                    <option value="capRate">Cap Rate</option>
                    <option value="units">Units</option>
                    <option value="estimatedValue">Value</option>
                  </select>
                </div>
                <button
                  onClick={() => setSortDir(d => d === "desc" ? "asc" : "desc")}
                  className="flex items-center gap-1 px-3 py-1.5 mt-4 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50"
                >
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  {sortDir === "desc" ? "High → Low" : "Low → High"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Total Deals", value: dashboardStats.totalDealsFound.toString(), sub: `${dashboardStats.newThisWeek} new this week`, icon: Search, color: "text-[#0049B8]" },
            { label: "High Distress (8+)", value: dashboardStats.highDistress.toString(), sub: "Immediate opportunities", icon: AlertTriangle, color: "text-red-500" },
            { label: "Total Units", value: dashboardStats.totalUnits.toString(), sub: "Across 6 counties", icon: Building2, color: "text-purple-500" },
            { label: "Avg Cap Rate", value: `${dashboardStats.avgCapRate}%`, sub: "All deals", icon: TrendingUp, color: "text-emerald-500" },
          ].map(s => (
            <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <s.icon className={`w-4 h-4 ${s.color}`} />
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">{s.label}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content — Deal Table */}
          <div className="lg:col-span-3 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                {filteredDeals.length} {filteredDeals.length === 1 ? "Deal" : "Deals"} found
                {countyFilter !== "all" && <span className="text-gray-400 font-normal"> in {countyFilter}</span>}
              </h2>
            </div>

            {filteredDeals.length === 0 && (
              <div className="bg-white border border-dashed border-gray-300 rounded-xl p-12 text-center">
                <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                <h3 className="text-sm font-semibold text-gray-500 mb-1">No deals match your filters</h3>
                <p className="text-xs text-gray-400">Try adjusting your county filter or sort criteria.</p>
                <button onClick={() => setCountyFilter("all")} className="mt-3 text-xs text-[#0049B8] font-medium hover:underline">Clear filters</button>
              </div>
            )}

            {filteredDeals.map((deal, index) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.03 * index }}
                onClick={() => setSelectedDeal(deal)}
                className="group bg-white hover:bg-gray-50 border border-gray-200 hover:border-[#0049B8]/30 rounded-xl p-4 cursor-pointer transition-all shadow-sm hover:shadow-md"
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
                        <span className="px-2 py-0.5 rounded bg-gray-50 text-[10px] text-gray-400">+{deal.distressSignals.length - 3}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0 grid grid-cols-3 gap-3 text-right hidden sm:grid">
                    <div><p className="text-[10px] text-gray-400">Units</p><p className="text-sm font-bold text-gray-900">{deal.units}</p></div>
                    <div><p className="text-[10px] text-gray-400">Value</p><p className="text-sm font-bold text-gray-900">{fmt(deal.estimatedValue)}</p></div>
                    <div><p className="text-[10px] text-gray-400">Cap</p><p className="text-sm font-bold text-gray-900">{deal.capRate}%</p></div>
                    <div><p className="text-[10px] text-gray-400">NOI</p><p className="text-sm font-bold text-gray-900">{fmt(deal.currentNOI)}</p></div>
                    <div><p className="text-[10px] text-gray-400">Pro Forma</p><p className="text-sm font-bold text-emerald-600">{fmt(deal.proFormaNOI)}</p></div>
                    <div><p className="text-[10px] text-gray-400">Upside</p><p className="text-sm font-bold text-emerald-600">+{deal.valueAddUpside}%</p></div>
                  </div>
                  <div className="flex items-center gap-3 sm:hidden text-right flex-shrink-0">
                    <div><p className="text-[10px] text-gray-400">Units</p><p className="text-sm font-bold text-gray-900">{deal.units}</p></div>
                    <div><p className="text-[10px] text-gray-400">Cap</p><p className="text-sm font-bold text-gray-900">{deal.capRate}%</p></div>
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

          {/* Sidebar */}
          <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            {/* County Breakdown */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" /> Deals by County
              </h3>
              <div className="space-y-2.5">
                {dashboardStats.countyBreakdown.map(c => (
                  <div key={c.county}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-700">{c.county}</span>
                      <span className="text-xs text-gray-400">{c.deals}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full rounded-full bg-[#0049B8]/50" style={{ width: `${(c.deals / 12) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Signal Breakdown */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5" /> Signal Types
              </h3>
              <div className="space-y-2">
                {dashboardStats.signalBreakdown.map(s => (
                  <div key={s.signal} className="flex items-center justify-between">
                    <span className="text-xs text-gray-600 truncate max-w-[140px]">{s.signal}</span>
                    <span className="text-xs font-medium text-gray-400 ml-2">{s.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Activity className="w-3.5 h-3.5" /> Source Activity
              </h3>
              <div className="space-y-3">
                {activityFeed.map((a, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                      a.type === "alert" ? "bg-red-500" : a.type === "new" ? "bg-blue-500" : "bg-gray-400"
                    }`} />
                    <div>
                      <p className="text-xs text-gray-700">{a.text}</p>
                      <p className="text-[10px] text-gray-400">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Slideout */}
      <AnimatePresence>
        {selectedDeal && (
          <DealSlideout
            deal={selectedDeal}
            onClose={() => setSelectedDeal(null)}
            onPrev={filteredDeals.indexOf(selectedDeal) > 0 ? () => setSelectedDeal(filteredDeals[filteredDeals.indexOf(selectedDeal) - 1]) : undefined}
            onNext={filteredDeals.indexOf(selectedDeal) < filteredDeals.length - 1 ? () => setSelectedDeal(filteredDeals[filteredDeals.indexOf(selectedDeal) + 1]) : undefined}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
