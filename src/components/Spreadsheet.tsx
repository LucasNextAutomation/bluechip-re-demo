"use client"

import { useState } from "react"
import { underwritingDeal } from "@/data/underwriting"

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
}

function pct(n: number) { return `${n.toFixed(1)}%` }

const tabs = ["Assumptions", "Summary", "Unit Mix", "Expenses", "Waterfall", "Cash Flow"] as const
type Tab = typeof tabs[number]

function Cell({ value, input, highlight }: { value: string; input?: boolean; highlight?: boolean }) {
  return (
    <td className={`px-3 py-2 text-sm border-b border-gray-100 ${
      input ? "bg-blue-50 text-blue-900 font-semibold" : highlight ? "bg-emerald-50 text-emerald-700 font-semibold" : "text-gray-700"
    }`}>
      {input && <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5 mb-0.5" />}
      {value}
    </td>
  )
}

function HeaderCell({ children }: { children: React.ReactNode }) {
  return <th className="px-3 py-2 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-200 bg-gray-50">{children}</th>
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <tr><td colSpan={10} className="px-3 pt-4 pb-2 text-xs font-bold text-[#0049B8] uppercase tracking-wider border-b border-gray-200 bg-white">{children}</td></tr>
  )
}

const d = underwritingDeal

function AssumptionsTab() {
  return (
    <table className="w-full">
      <thead><tr><HeaderCell>Parameter</HeaderCell><HeaderCell>Value</HeaderCell><HeaderCell>Notes</HeaderCell></tr></thead>
      <tbody>
        <SectionLabel>Acquisition</SectionLabel>
        <tr><td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">Purchase Price</td><Cell value={fmt(d.assumptions.purchasePrice)} input /><td className="px-3 py-2 text-xs text-gray-400 border-b border-gray-100">{fmt(d.assumptions.purchasePrice / d.property.units)}/unit</td></tr>
        <tr><td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">Closing Costs</td><Cell value={fmt(d.assumptions.closingCosts)} input /><td className="px-3 py-2 text-xs text-gray-400 border-b border-gray-100">3% of purchase</td></tr>
        <tr><td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">Renovation Budget</td><Cell value={fmt(d.assumptions.renovationBudget)} input /><td className="px-3 py-2 text-xs text-gray-400 border-b border-gray-100">${(d.assumptions.renovationBudget / d.property.units).toLocaleString()}/unit</td></tr>
        <tr><td className="px-3 py-2 text-sm text-gray-900 font-semibold border-b border-gray-200">Total Basis</td><td className="px-3 py-2 text-sm text-gray-900 font-bold border-b border-gray-200">{fmt(d.assumptions.totalBasis)}</td><td className="px-3 py-2 text-xs text-gray-400 border-b border-gray-200">{fmt(d.assumptions.totalBasis / d.property.units)}/unit all-in</td></tr>

        <SectionLabel>Financing</SectionLabel>
        <tr><td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">Loan Amount</td><Cell value={fmt(d.assumptions.loanAmount)} input /><td className="px-3 py-2 text-xs text-gray-400 border-b border-gray-100">{d.summary.ltv}% LTV</td></tr>
        <tr><td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">Interest Rate</td><Cell value={pct(d.assumptions.loanRate)} input /><td className="px-3 py-2 text-xs text-gray-400 border-b border-gray-100">Fixed</td></tr>
        <tr><td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">Amortization</td><Cell value={`${d.assumptions.amortization} years`} input /><td className="px-3 py-2 text-xs text-gray-400 border-b border-gray-100">$13,910/mo P&I</td></tr>
        <tr><td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">Hold Period</td><Cell value={`${d.assumptions.holdPeriod} years`} input /><td className="px-3 py-2 text-xs text-gray-400 border-b border-gray-100"></td></tr>
        <tr><td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">Exit Cap Rate</td><Cell value={pct(d.assumptions.exitCapRate)} input /><td className="px-3 py-2 text-xs text-gray-400 border-b border-gray-100"></td></tr>

        <SectionLabel>Operating</SectionLabel>
        <tr><td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">Vacancy Rate</td><Cell value={pct(d.assumptions.vacancyRate)} input /><td className="px-3 py-2 text-xs text-gray-400 border-b border-gray-100">Stabilized</td></tr>
        <tr><td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">Rent Growth (annual)</td><Cell value={pct(d.assumptions.annualRentGrowth)} input /><td className="px-3 py-2 text-xs text-gray-400 border-b border-gray-100"></td></tr>
        <tr><td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">Expense Growth (annual)</td><Cell value={pct(d.assumptions.annualExpenseGrowth)} input /><td className="px-3 py-2 text-xs text-gray-400 border-b border-gray-100"></td></tr>
        <tr><td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">Management Fee</td><Cell value={pct(d.assumptions.managementFee)} input /><td className="px-3 py-2 text-xs text-gray-400 border-b border-gray-100">Of EGI</td></tr>
        <tr><td className="px-3 py-2 text-sm text-gray-500 border-b border-gray-100">CapEx Reserve</td><Cell value={`$${d.assumptions.capexReserve}/unit/yr`} input /><td className="px-3 py-2 text-xs text-gray-400 border-b border-gray-100">{fmt(d.assumptions.capexReserve * d.property.units)}/yr total</td></tr>
      </tbody>
    </table>
  )
}

function SummaryTab() {
  return (
    <div className="p-4 space-y-6">
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "IRR (5yr)", value: pct(d.summary.irr), big: true },
          { label: "Equity Multiple", value: `${d.summary.equityMultiple}x`, big: true },
          { label: "Cash-on-Cash", value: pct(d.summary.cashOnCash), big: true },
          { label: "DSCR", value: d.summary.dscr.toFixed(2) },
          { label: "LTV", value: pct(d.summary.ltv) },
          { label: "Debt Yield", value: pct(d.summary.debtYield) },
        ].map(m => (
          <div key={m.label} className={`rounded-xl border p-4 ${m.big ? "bg-[#0049B8]/5 border-[#0049B8]/20" : "bg-gray-50 border-gray-100"}`}>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">{m.label}</p>
            <p className={`font-bold ${m.big ? "text-2xl text-[#0049B8]" : "text-xl text-gray-900"}`}>{m.value}</p>
          </div>
        ))}
      </div>

      <div>
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Sources & Uses</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl border border-gray-100 p-4">
            <h5 className="text-xs font-semibold text-gray-500 mb-2">Sources</h5>
            {d.sourcesAndUses.sources.map((s, i) => (
              <div key={i} className="flex justify-between text-sm py-1"><span className="text-gray-500">{s.item}</span><span className="font-medium text-gray-900">{fmt(s.amount)}</span></div>
            ))}
            <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between text-sm font-bold">
              <span>Total</span><span>{fmt(d.sourcesAndUses.sources.reduce((s, x) => s + x.amount, 0))}</span>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl border border-gray-100 p-4">
            <h5 className="text-xs font-semibold text-gray-500 mb-2">Uses</h5>
            {d.sourcesAndUses.uses.map((u, i) => (
              <div key={i} className="flex justify-between text-sm py-1"><span className="text-gray-500">{u.item}</span><span className="font-medium text-gray-900">{fmt(u.amount)}</span></div>
            ))}
            <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between text-sm font-bold">
              <span>Total</span><span>{fmt(d.sourcesAndUses.uses.reduce((s, x) => s + x.amount, 0))}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
        <h4 className="text-xs font-bold text-emerald-600 uppercase mb-2">Investment Summary</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div><span className="text-gray-500">Total Equity Required</span></div><div className="font-semibold text-right">{fmt(d.summary.totalEquityRequired)}</div>
          <div><span className="text-gray-500">Year 1 NOI</span></div><div className="font-semibold text-right">{fmt(d.summary.yearOneNOI)}</div>
          <div><span className="text-gray-500">Pro Forma NOI</span></div><div className="font-semibold text-right text-emerald-700">{fmt(d.summary.proFormaNOI)}</div>
          <div><span className="text-gray-500">Exit Value (Yr 5)</span></div><div className="font-semibold text-right">{fmt(d.summary.exitValue)}</div>
          <div><span className="text-gray-500">Total Profit</span></div><div className="font-bold text-right text-emerald-700">{fmt(d.summary.totalProfit)}</div>
        </div>
      </div>
    </div>
  )
}

function UnitMixTab() {
  const byBuilding = ["A", "B"]
  return (
    <table className="w-full">
      <thead>
        <tr>
          <HeaderCell>Building</HeaderCell>
          <HeaderCell>Type</HeaderCell>
          <HeaderCell>Count</HeaderCell>
          <HeaderCell>Sq Ft</HeaderCell>
          <HeaderCell>Current Rent</HeaderCell>
          <HeaderCell>Pro Forma</HeaderCell>
          <HeaderCell>Upside</HeaderCell>
        </tr>
      </thead>
      <tbody>
        {byBuilding.map(b => (
          <>
            <SectionLabel key={`label-${b}`}>Building {b}</SectionLabel>
            {d.unitMix.filter(u => u.building === b).map((u, i) => (
              <tr key={`${b}-${i}`}>
                <td className="px-3 py-2 text-sm text-gray-400 border-b border-gray-100">{b}</td>
                <td className="px-3 py-2 text-sm text-gray-700 font-medium border-b border-gray-100">{u.type}</td>
                <td className="px-3 py-2 text-sm text-gray-700 border-b border-gray-100">{u.count}</td>
                <td className="px-3 py-2 text-sm text-gray-700 border-b border-gray-100">{u.sqft}</td>
                <td className="px-3 py-2 text-sm text-gray-700 border-b border-gray-100">${u.currentRent.toLocaleString()}</td>
                <Cell value={`$${u.proFormaRent.toLocaleString()}`} highlight />
                <td className="px-3 py-2 text-sm text-emerald-600 font-medium border-b border-gray-100">+{Math.round(((u.proFormaRent - u.currentRent) / u.currentRent) * 100)}%</td>
              </tr>
            ))}
          </>
        ))}
        <tr className="bg-gray-50">
          <td colSpan={2} className="px-3 py-2 text-sm font-bold text-gray-900 border-t border-gray-200">Total</td>
          <td className="px-3 py-2 text-sm font-bold text-gray-900 border-t border-gray-200">{d.unitMix.reduce((s, u) => s + u.count, 0)}</td>
          <td className="px-3 py-2 text-sm text-gray-400 border-t border-gray-200">—</td>
          <td className="px-3 py-2 text-sm font-bold text-gray-900 border-t border-gray-200">{fmt(d.unitMix.reduce((s, u) => s + u.count * u.currentRent, 0))}/mo</td>
          <td className="px-3 py-2 text-sm font-bold text-emerald-600 border-t border-gray-200">{fmt(d.unitMix.reduce((s, u) => s + u.count * u.proFormaRent, 0))}/mo</td>
          <td className="px-3 py-2 text-sm font-bold text-emerald-600 border-t border-gray-200">+{Math.round(((d.unitMix.reduce((s, u) => s + u.count * u.proFormaRent, 0) - d.unitMix.reduce((s, u) => s + u.count * u.currentRent, 0)) / d.unitMix.reduce((s, u) => s + u.count * u.currentRent, 0)) * 100)}%</td>
        </tr>
      </tbody>
    </table>
  )
}

function ExpensesTab() {
  const totalCurrent = d.expenses.reduce((s, e) => s + e.current, 0)
  const totalProForma = d.expenses.reduce((s, e) => s + e.proForma, 0)
  return (
    <table className="w-full">
      <thead><tr><HeaderCell>Category</HeaderCell><HeaderCell>Current (Annual)</HeaderCell><HeaderCell>Pro Forma</HeaderCell><HeaderCell>Change</HeaderCell></tr></thead>
      <tbody>
        {d.expenses.map((e, i) => {
          const change = e.proForma - e.current
          return (
            <tr key={i}>
              <td className="px-3 py-2 text-sm text-gray-700 border-b border-gray-100">{e.category}</td>
              <td className="px-3 py-2 text-sm text-gray-700 border-b border-gray-100">{fmt(e.current)}</td>
              <td className="px-3 py-2 text-sm text-gray-700 border-b border-gray-100">{fmt(e.proForma)}</td>
              <td className={`px-3 py-2 text-sm font-medium border-b border-gray-100 ${change < 0 ? "text-emerald-600" : change > 0 ? "text-red-500" : "text-gray-400"}`}>
                {change === 0 ? "—" : change < 0 ? `-${fmt(Math.abs(change))}` : `+${fmt(change)}`}
              </td>
            </tr>
          )
        })}
        <tr className="bg-gray-50">
          <td className="px-3 py-2 text-sm font-bold text-gray-900 border-t border-gray-200">Total Expenses</td>
          <td className="px-3 py-2 text-sm font-bold text-gray-900 border-t border-gray-200">{fmt(totalCurrent)}</td>
          <td className="px-3 py-2 text-sm font-bold text-gray-900 border-t border-gray-200">{fmt(totalProForma)}</td>
          <td className="px-3 py-2 text-sm font-bold text-emerald-600 border-t border-gray-200">{fmt(totalProForma - totalCurrent)}</td>
        </tr>
      </tbody>
    </table>
  )
}

function WaterfallTab() {
  const w = d.waterfall
  return (
    <div className="p-4 space-y-6">
      <div className="bg-gray-50 rounded-xl border border-gray-100 p-4">
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Waterfall Structure</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-gray-500">Preferred Return</span><span className="font-semibold text-gray-900">{w.prefReturn}% annual</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Above Pref Split</span><span className="font-semibold text-gray-900">{w.splitAbovePref.sponsor}/{w.splitAbovePref.lp} (Sponsor/LP)</span></div>
          <div className="border-t border-gray-200 pt-2 mt-2">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">Promote Tiers</p>
            {w.promote.map((p, i) => (
              <div key={i} className="flex justify-between py-0.5"><span className="text-gray-500">Above {p.irr}% IRR</span><span className="font-medium text-gray-700">{p.split.sponsor}/{p.split.lp}</span></div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Annual Distributions</h4>
        <table className="w-full">
          <thead><tr><HeaderCell>Year</HeaderCell><HeaderCell>Cash Flow</HeaderCell><HeaderCell>Pref Paid</HeaderCell><HeaderCell>Sponsor</HeaderCell><HeaderCell>LP</HeaderCell></tr></thead>
          <tbody>
            {w.yearlyDistributions.map(y => (
              <tr key={y.year}>
                <td className="px-3 py-2 text-sm font-medium text-gray-700 border-b border-gray-100">Year {y.year}</td>
                <td className="px-3 py-2 text-sm text-gray-700 border-b border-gray-100">{fmt(y.cashFlow)}</td>
                <td className="px-3 py-2 text-sm text-gray-700 border-b border-gray-100">{fmt(y.prefPaid)}</td>
                <td className="px-3 py-2 text-sm text-[#0049B8] font-medium border-b border-gray-100">{fmt(y.excessToSponsor)}</td>
                <td className="px-3 py-2 text-sm text-emerald-600 font-medium border-b border-gray-100">{fmt(y.excessToLP)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-[#0049B8]/5 border border-[#0049B8]/20 rounded-xl p-4">
        <h4 className="text-xs font-bold text-[#0049B8] uppercase tracking-wider mb-3">Exit Proceeds (Year 5)</h4>
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between"><span className="text-gray-500">Sale Price</span><span className="font-semibold">{fmt(w.exitProceeds.salePrice)}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Loan Payoff</span><span className="text-red-500">({fmt(w.exitProceeds.loanPayoff)})</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Closing Costs</span><span className="text-red-500">({fmt(w.exitProceeds.closingCosts)})</span></div>
          <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold"><span>Net Proceeds</span><span>{fmt(w.exitProceeds.netProceeds)}</span></div>
          <div className="flex justify-between text-[#0049B8]"><span>Sponsor Share</span><span className="font-bold">{fmt(w.exitProceeds.sponsorShare)}</span></div>
          <div className="flex justify-between text-emerald-600"><span>LP Share</span><span className="font-bold">{fmt(w.exitProceeds.lpShare)}</span></div>
        </div>
      </div>
    </div>
  )
}

function CashFlowTab() {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <HeaderCell>Year</HeaderCell>
          <HeaderCell>Revenue</HeaderCell>
          <HeaderCell>Expenses</HeaderCell>
          <HeaderCell>NOI</HeaderCell>
          <HeaderCell>Debt Service</HeaderCell>
          <HeaderCell>Cash Flow</HeaderCell>
        </tr>
      </thead>
      <tbody>
        {d.cashFlowProjection.map(y => (
          <tr key={y.year} className={y.year === 0 ? "bg-gray-50" : ""}>
            <td className="px-3 py-2 text-sm font-medium text-gray-700 border-b border-gray-100">{y.year === 0 ? "Acquisition" : `Year ${y.year}`}</td>
            <td className="px-3 py-2 text-sm text-gray-700 border-b border-gray-100">{y.revenue ? fmt(y.revenue) : "—"}</td>
            <td className="px-3 py-2 text-sm text-red-500 border-b border-gray-100">{y.expenses ? `(${fmt(Math.abs(y.expenses))})` : "—"}</td>
            <td className="px-3 py-2 text-sm text-gray-900 font-medium border-b border-gray-100">{y.noi ? fmt(y.noi) : "—"}</td>
            <td className="px-3 py-2 text-sm text-red-500 border-b border-gray-100">({fmt(Math.abs(y.debtService))})</td>
            <td className={`px-3 py-2 text-sm font-bold border-b border-gray-100 ${y.cashFlow < 0 ? "text-red-500" : "text-emerald-600"}`}>
              {y.cashFlow < 0 ? `(${fmt(Math.abs(y.cashFlow))})` : fmt(y.cashFlow)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default function Spreadsheet() {
  const [activeTab, setActiveTab] = useState<Tab>("Assumptions")

  const tabContent: Record<Tab, React.ReactNode> = {
    Assumptions: <AssumptionsTab />,
    Summary: <SummaryTab />,
    "Unit Mix": <UnitMixTab />,
    Expenses: <ExpensesTab />,
    Waterfall: <WaterfallTab />,
    "Cash Flow": <CashFlowTab />,
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Excel-like tab bar */}
      <div className="flex items-center border-b border-gray-200 bg-gray-50 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
              activeTab === tab
                ? "bg-white text-[#0049B8] border-[#0049B8]"
                : "text-gray-500 border-transparent hover:bg-gray-100 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Property header */}
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-900">{d.property.name}</span>
          <span className="text-xs text-gray-400">{d.property.address}</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span>{d.property.units} units</span>
          <span>Class {d.property.class}</span>
          <span>{d.property.buildings} buildings</span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Blue = editable input
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
        {tabContent[activeTab]}
      </div>
    </div>
  )
}
