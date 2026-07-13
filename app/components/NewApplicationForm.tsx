type NewApplicationFormProps = {
  company: string;
  setCompany: (value: string) => void;

  title: string;
  setTitle: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  columns: string[];

  formError: string;
  clearError: () => void;

  onSubmit: (e: React.FormEvent) => void;
};

export default function NewApplicationForm({
  company,
  setCompany,
  title,
  setTitle,
  status,
  setStatus,
  columns,
  formError,
  clearError,
  onSubmit,
}: NewApplicationFormProps) {
  return (
    <>
      <h2 style={{ marginBottom: 6 }}>New Application</h2>

      <p
        style={{
          color: "var(--muted)",
          marginTop: 0,
          marginBottom: 14,
        }}
      >
        Track a new opportunity in your pipeline.
      </p>

      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          gap: 10,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          padding: 16,
          borderRadius: 14,
          marginBottom: 24,
        }}
      >
        <input
          placeholder="Company"
          value={company}
          onChange={(e) => {
            setCompany(e.target.value);

            if (formError) {
              clearError();
            }
          }}
        />

        <input
          placeholder="Job Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);

            if (formError) {
              clearError();
            }
          }}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {columns.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <button type="submit">
          + Add Job
        </button>
      </form>

      {formError && (
        <div
          role="alert"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: -12,
            marginBottom: 20,
            padding: "14px 16px",
            maxWidth: 520,
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.35)",
            borderLeft: "4px solid #ef4444",
            borderRadius: "var(--radius-md)",
            color: "#fca5a5",
            fontSize: 14,
          }}
        >
          <span style={{ fontSize: 18 }}>⚠️</span>

          <div>
            <strong>Missing information</strong>
            <div>Please enter both a company name and job title.</div>
          </div>
        </div>
      )}
    </>
  );
}
