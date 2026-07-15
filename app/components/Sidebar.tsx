import link from "next/link";

const links = [
  { href: "/", label: "Dashboard", icon: "🏠" },
  { href: "/resumes", label: "Resumes", icon: "📄" },
  { href: "/cover-letters", label: "Cover Letters", icon: "📝" },
  { href: "/analytics", label: "Analytics", icon: "📊" },
  { href: "/ai", label: "AI Tools", icon: "🤖" },
  { href: "/settings", label: "Settings", icon: "⚙️" },
];

export default function Sidebar() {
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
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 12px",
              color: "var(--muted)",
              textDecoration: "none",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}