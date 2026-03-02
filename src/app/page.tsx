"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Search, FileSpreadsheet, Zap, Building2, ArrowRight, CheckCircle2 } from "lucide-react"

const systems = [
  {
    href: "/deal-finder",
    title: "Off-Market Deal Finder",
    price: "$5,000",
    icon: Search,
    description: "Daily monitoring of 12+ public record sources across 6 counties. AI scores every lead 0-10 based on your criteria.",
    features: ["12 data sources scanned daily", "AI distress scoring 0-10", "Owner skip tracing included", "Full financial analysis per deal"],
    gradient: "from-blue-500/10 to-blue-600/5",
    border: "hover:border-blue-300",
    accent: "text-blue-600",
  },
  {
    href: "/underwriting",
    title: "AI Underwriting Assistant",
    price: "$2,000",
    icon: FileSpreadsheet,
    description: "Upload an OM. AI extracts every number, populates your Excel model, and flags assumptions it's not confident about.",
    features: ["Upload OM → auto-extract data", "Populates your exact Excel model", "IRR, DSCR, waterfall calcs", "AI flags uncertain assumptions"],
    gradient: "from-purple-500/10 to-purple-600/5",
    border: "hover:border-purple-300",
    accent: "text-purple-600",
  },
  {
    href: "/outreach",
    title: "Automated Outreach Engine",
    price: "$1,500",
    icon: Zap,
    description: "Skip trace owners, send personalized email and SMS sequences, track responses — all automated from your deal pipeline.",
    features: ["Auto skip tracing", "4-touch email + SMS sequence", "AI-personalized messages", "Open/reply tracking + CRM"],
    gradient: "from-emerald-500/10 to-emerald-600/5",
    border: "hover:border-emerald-300",
    accent: "text-emerald-600",
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0049B8]/5 via-transparent to-transparent" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto px-4 relative">
          <div className="text-center">
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
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight"
            >
              AI-Powered Multifamily<br />
              <span className="text-[#0049B8]">Acquisition System</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Three systems working together to find off-market deals, underwrite them instantly, and reach owners automatically — built for Class C/B- multifamily, 5-50 units, Boston metro & Southern NH.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center gap-6 text-sm text-gray-400"
            >
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                12 sources monitored
              </span>
              <span>6 counties</span>
              <span>47 deals found</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* System Cards */}
      <section className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Three Systems, One Pipeline</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Each system is built and delivered independently. Start with one or take all three.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {systems.map((sys, i) => (
              <motion.div
                key={sys.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                <Link href={sys.href} className="block group">
                  <div className={`relative bg-white rounded-2xl border border-gray-200 ${sys.border} p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${sys.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-white transition-colors">
                          <sys.icon className={`w-6 h-6 ${sys.accent}`} />
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-[#0049B8]">{sys.price}</div>
                          <div className="text-[10px] text-gray-400 uppercase">one-time build</div>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">{sys.title}</h3>
                      <p className="text-sm text-gray-500 mb-4 leading-relaxed">{sys.description}</p>

                      <div className="space-y-2 mb-6">
                        {sys.features.map((f, j) => (
                          <div key={j} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className={`w-4 h-4 ${sys.accent} flex-shrink-0`} />
                            <span className="text-gray-600">{f}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-sm font-medium text-[#0049B8] group-hover:gap-3 transition-all">
                        View Live Demo <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bundle */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-[#0049B8] to-blue-700 rounded-2xl p-8 text-center text-white"
          >
            <h3 className="text-2xl font-bold mb-2">Full System Bundle</h3>
            <p className="text-blue-100 mb-4">All three systems working together — find deals, underwrite them, and reach owners automatically.</p>
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-lg text-blue-200 line-through">$8,500</span>
              <span className="text-4xl font-bold">$7,500</span>
              <span className="text-blue-200 text-sm">one-time</span>
            </div>
            <p className="text-sm text-blue-200">+ $600/month hosting & monitoring</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-400 mb-1">Demo for Blue Chip RE Advisors — Data is simulated for demonstration purposes</p>
          <p className="text-sm text-[#0049B8] font-medium">Powered by NextAutomation</p>
        </div>
      </footer>
    </div>
  )
}
