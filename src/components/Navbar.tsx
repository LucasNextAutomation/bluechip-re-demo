"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building2, Search, FileSpreadsheet, Zap } from "lucide-react"

const navItems = [
  { href: "/", label: "Overview", icon: Building2 },
  { href: "/deal-finder", label: "Deal Finder", icon: Search },
  { href: "/underwriting", label: "Underwriting", icon: FileSpreadsheet },
  { href: "/outreach", label: "Outreach", icon: Zap },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#0049B8] flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-sm hidden sm:block">Blue Chip RE</span>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map(item => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? "bg-[#0049B8] text-white"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="hidden md:flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Demo
            </span>
            <span className="text-[#0049B8] font-semibold">NextAutomation</span>
          </div>
        </div>
      </div>
    </nav>
  )
}
