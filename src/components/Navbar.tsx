"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

interface SubLink {
  href: string;
  label: string;
}

interface NavItem {
  href: string;
  label: string;
  sub?: SubLink[];
}

const NAV_LINKS: NavItem[] = [
  { href: "/", label: "Overview" },
  {
    href: "/deal-finder",
    label: "Deal Finder",
    sub: [
      { href: "/deal-finder", label: "Live Demo" },
      { href: "/deal-finder/how-it-works", label: "How It Works" },
    ],
  },
  {
    href: "/underwriting",
    label: "Underwriting",
    sub: [
      { href: "/underwriting", label: "Live Demo" },
      { href: "/underwriting/how-it-works", label: "How It Works" },
    ],
  },
  {
    href: "/outreach",
    label: "Outreach",
    sub: [
      { href: "/outreach", label: "Live Demo" },
      { href: "/outreach/how-it-works", label: "How It Works" },
    ],
  },
  { href: "/collaboration", label: "Collaboration" },
];

function NavLink({
  item,
  active,
}: {
  item: NavItem;
  active: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hasSub = item.sub && item.sub.length > 0;

  function handleMouseEnter() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHovered(true);
    if (hasSub) setDropdownOpen(true);
  }

  function handleMouseLeave() {
    setHovered(false);
    if (hasSub) {
      timeoutRef.current = setTimeout(() => setDropdownOpen(false), 150);
    }
  }

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={item.href}
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          gap: "3px",
          padding: "0 14px",
          height: "64px",
          lineHeight: "64px",
          fontSize: "13px",
          fontWeight: active ? "600" : "400",
          color: active ? "#0049B8" : hovered ? "#0f172a" : "#64748b",
          letterSpacing: "0.01em",
          whiteSpace: "nowrap",
          transition: "color 0.2s ease",
          textDecoration: "none",
        }}
      >
        {item.label}
        {hasSub && (
          <svg
            width="8"
            height="5"
            viewBox="0 0 8 5"
            fill="none"
            style={{
              marginTop: "1px",
              opacity: 0.5,
              transition: "transform 0.2s ease",
              transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <path
              d="M1 1L4 4L7 1"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </Link>

      {/* Active indicator */}
      {active && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "14px",
            right: "14px",
            height: "2px",
            background: "#0049B8",
            borderRadius: "2px 2px 0 0",
          }}
        />
      )}

      {/* Dropdown */}
      {hasSub && dropdownOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            paddingTop: "4px",
            zIndex: 100,
          }}
        >
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e8eaed",
              borderRadius: "10px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)",
              padding: "6px",
              minWidth: "160px",
            }}
          >
            {item.sub!.map((sub) => (
              <Link
                key={sub.href}
                href={sub.href}
                style={{
                  display: "block",
                  padding: "8px 14px",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "#0f172a",
                  textDecoration: "none",
                  borderRadius: "6px",
                  transition: "background 0.15s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "#f6f7f8";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                }}
              >
                {sub.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        height: "64px",
        borderBottom: "1px solid #e8eaed",
        background: scrolled ? "rgba(255,255,255,0.92)" : "#ffffff",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "background 0.2s ease, backdrop-filter 0.2s ease",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 40px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left: Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexShrink: 0,
            padding: "8px 0",
            textDecoration: "none",
          }}
        >
          <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "28px", height: "28px" }}>
            <circle cx="60" cy="60" r="58" stroke="#3B4559" strokeWidth="2.5" fill="white" />
            <line x1="60" y1="30" x2="60" y2="90" stroke="#3B4559" strokeWidth="1.5" />
            <text x="38" y="52" textAnchor="middle" fill="#3B4559" fontFamily="Inter, system-ui, sans-serif" fontSize="18" fontWeight="400" letterSpacing="2">b</text>
            <text x="38" y="78" textAnchor="middle" fill="#3B4559" fontFamily="Inter, system-ui, sans-serif" fontSize="18" fontWeight="400" letterSpacing="2">r</text>
            <text x="82" y="52" textAnchor="middle" fill="#3B4559" fontFamily="Inter, system-ui, sans-serif" fontSize="18" fontWeight="400" letterSpacing="2">c</text>
            <text x="82" y="78" textAnchor="middle" fill="#3B4559" fontFamily="Inter, system-ui, sans-serif" fontSize="18" fontWeight="400" letterSpacing="2">a</text>
          </svg>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#0f172a",
              letterSpacing: "-0.01em",
            }}
          >
            Blue Chip RE Advisors
          </span>
        </Link>

        {/* Center: Nav links (desktop) */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0",
          }}
        >
          {NAV_LINKS.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              active={
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(item.href + "/")
              }
            />
          ))}
        </nav>

        {/* Right: NextAutomation pill */}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "11.5px",
            fontWeight: "600",
            color: "#0049B8",
            letterSpacing: "0.03em",
            flexShrink: 0,
            background: "rgba(0,73,184,0.06)",
            border: "1px solid rgba(0,73,184,0.18)",
            padding: "5px 14px",
            borderRadius: "100px",
          }}
        >
          <span
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "9999px",
              backgroundColor: "#0049B8",
              flexShrink: 0,
            }}
          />
          NextAutomation
        </span>
      </div>

      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        style={{
          display: "none",
          position: "absolute",
          top: "18px",
          right: "16px",
          padding: "8px",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          color: "#64748b",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          {mobileOpen ? (
            <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          ) : (
            <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          )}
        </svg>
      </button>
    </header>
  );
}
