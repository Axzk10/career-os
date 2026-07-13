import type { Job } from "../types";

type TodaysFocusProps = {
  jobs: Job[];
};

function getDateDifference(dateString: string) {
    const date = new Date(dateString);
    const today = new Date();

    date.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return Math.floor(
        (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
}

export default function TodaysFocus({ jobs }: TodaysFocusProps) {
  const overdueJobs = jobs.filter(
    (job) =>
      job.followUpDate &&
      getDateDifference(job.followUpDate) < 0
  );

  const dueTodayJobs = jobs.filter(
    (job) =>
      job.followUpDate &&
      getDateDifference(job.followUpDate) === 0
  );

  const highPriorityJobs = jobs.filter(
    (job) => job.priority === "High"
  );

  return (
    <section
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: 20,
        marginBottom: 24,
      }}
    >
      <h2 style={{ marginTop: 0 }}>Today&apos;s Focus</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 14,
        }}
      >
        <FocusCard
          label="Overdue Follow-ups"
          value={overdueJobs.length}
          color="#ef4444"
        />

        <FocusCard
          label="Due Today"
          value={dueTodayJobs.length}
          color="#facc15"
        />

        <FocusCard
          label="High Priority"
          value={highPriorityJobs.length}
          color="#c3a0c7"
        />
      </div>
    </section>
  );
}

function FocusCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div
      style={{
        background: "var(--surface-light)",
        border: "1px solid var(--border)",
        borderLeft: `4px solid ${color}`,
        borderRadius: "var(--radius-md)",
        padding: 16,
      }}
    >
      <p style={{ margin: 0, color: "var(--muted)", fontSize: 14 }}>
        {label}
      </p>

      <strong style={{ display: "block", marginTop: 8, fontSize: 28 }}>
        {value}
      </strong>
    </div>
  );
}
