"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, FileSpreadsheet, Zap, Menu, X } from "lucide-react"

function BCRALogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="58" stroke="#3B4559" strokeWidth="2.5" fill="white" />
      <line x1="60" y1="30" x2="60" y2="90" stroke="#3B4559" strokeWidth="1.5" />
      <text x="38" y="52" textAnchor="middle" fill="#3B4559" fontFamily="Inter, system-ui, sans-serif" fontSize="18" fontWeight="400" letterSpacing="2">b</text>
      <text x="38" y="78" textAnchor="middle" fill="#3B4559" fontFamily="Inter, system-ui, sans-serif" fontSize="18" fontWeight="400" letterSpacing="2">r</text>
      <text x="82" y="52" textAnchor="middle" fill="#3B4559" fontFamily="Inter, system-ui, sans-serif" fontSize="18" fontWeight="400" letterSpacing="2">c</text>
      <text x="82" y="78" textAnchor="middle" fill="#3B4559" fontFamily="Inter, system-ui, sans-serif" fontSize="18" fontWeight="400" letterSpacing="2">a</text>
    </svg>
  )
}

const navItems = [
  { href: "/", label: "Overview" },
  { href: "/deal-finder", label: "Deal Finder", icon: Search },
  { href: "/underwriting", label: "Underwriting", icon: FileSpreadsheet },
  { href: "/outreach", label: "Outreach", icon: Zap },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <BCRALogo className="w-9 h-9" />
            <div className="hidden sm:block">
              <span className="text-sm font-semibold text-gray-900 tracking-tight">Blue Chip RE Advisors</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map(item => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? "bg-gray-900 text-white"
                      : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {item.icon && <item.icon className="w-3.5 h-3.5" />}
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-xs text-gray-400">
              Built by <span className="text-[#0049B8] font-medium">NextAutomation</span>
            </span>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-50 text-gray-400"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 space-y-0.5">
            {navItems.map(item => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? "bg-gray-900 text-white"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.label}
                </Link>
              )
            })}
            <div className="pt-3 mt-2 border-t border-gray-100 px-4 text-xs text-gray-400">
              Built by <span className="text-[#0049B8] font-medium">NextAutomation</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
