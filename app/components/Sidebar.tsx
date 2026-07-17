"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
 Home,
  FileText,
  BarChart3,
  Brain,
  Settings,
  FileStack,
} from "lucide-react";

const links = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/resumes", label: "Resumes", icon: FileText },
  { href: "/cover-letters", label: "Cover Letters", icon: FileStack },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/ai", label: "AI Tools", icon: Brain },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 240,
        height: "100vh",
        padding: 20,
        background: "var(--surface)",
        borderRight: "1px solid var(--border)",
      }}
    >
      <Link
        href="/"
        style={{
          display: "block",
          marginBottom: 28,
          color: "var(--text)",
          textDecoration: "none",
          fontSize: 22,
          fontWeight: 800,
        }}
      >
        CareerOS
      </Link>

      <nav
        style={{
          display: "grid",
          gap: 8,
        }}
      >
        {links.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);

          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "11px 12px",
                color: isActive ? "var(--text)" : "var(--muted)",
                background: isActive
                  ? "rgba(138, 88, 141, 0.22)"
                  : "transparent",
                border: isActive
                  ? "1px solid rgba(195, 160, 199, 0.24)"
                  : "1px solid transparent",
                borderRadius: "var(--radius-sm)",
                textDecoration: "none",
                fontWeight: isActive ? 700 : 500,
                transition: "var(--transition-fast)",
              }}
            >
              {isActive && (
                <span
                  style={{
                    position: "absolute",
                    left: -20,
                    width: 4,
                    height: 24,
                    borderRadius: "0 999px 999px 0",
                    background: "var(--yellow)",
                  }}
                />
              )}

              <Icon size={18} />

              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
