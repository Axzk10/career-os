export default function DashboardHeader() {
  return (
    <header style={{ marginBottom: 28 }}>
      <p
        style={{
          color: "var(--yellow)",
          margin: 0,
          fontWeight: 700,
        }}
      >
        CareerOS
      </p>

      <h1 style={{ margin: "6px 0", fontSize: 36 }}>
        CareerOS
      </h1>

      <p style={{ color: "var(--muted)", margin: 0 }}>
        Track applications, notes, documents, and interview progress.
      </p>
    </header>
  );
}

