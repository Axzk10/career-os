import JobCard from "./JobCard";
import type { Job } from "../types";
import { useDroppable } from "@dnd-kit/core";

const statusStyles: Record<string, { dot: string; badge: string }> = {
  Saved: {
    dot: "#ffdc2b",
    badge: "rgba(255, 220, 43, 0.18)",
  },
  Applied: {
    dot: "#60a5fa",
    badge: "rgba(96, 165, 250, 0.18)",
  },
  Interview: {
    dot: "#8a588d",
    badge: "rgba(138, 88, 141, 0.22)",
  },
  Offer: {
    dot: "#22c55e",
    badge: "rgba(34, 197, 94, 0.18)",
  },
  Rejected: {
    dot: "#ef4444",
    badge: "rgba(239, 68, 68, 0.18)",
  },
};

type KanbanColumnProps = {
  title: string;
  jobs: Job[];
};

export default function KanbanColumn({ title, jobs }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: title,
  });

  const style = statusStyles[title] ?? statusStyles.Saved;

  return (
    <div
      ref={setNodeRef}
      style={{
        flex: 1,
        minHeight: 460,
        background: isOver 
        ? "rgba(138, 88, 141, 0.12)"
        : "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 16,
        padding: 14,
      }}
    >
      <h3
        style={{
          marginTop: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: style.dot,
            }}
          />
          {title}
        </span>

        <span
          style={{
            background: style.badge,
            color: style.dot,
            borderRadius: 999,
            padding: "2px 8px",
            fontSize: 12,
          }}
        >
          {jobs.length}
        </span>
      </h3>

     {jobs.length === 0 ? (
      <div
        style={{
          marginTop: 18,
          padding: "24px 12px",
          border: "1px dashed var(--border)",
          borderRadius: "var(--radius-md)",
          textAlign: "center",
          color: "var(--muted)",
          fontSize: 14,
        }}
      >
        <p style={{ margin: 0, fontWeight: 700 }}>
          No jobs yet
        </p>

        <p style={{ margin: "6px 0 0" }}>
          Drag a job here or add a new application.
        </p>
      </div>
    ) : (
      jobs.map((job) => (
        <a
          key={job.id}
          href={`/job/${job.id}`}
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <JobCard job={job} />
        </a>
      ))
    )}
    </div>
  );
}
