import type { Job } from "../types";
import styles from "./JobCard.module.css";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

const priorityStyles: Record<
  string,
  { label: string; background: string; color: string }
> = {
  Low: {
    label: "Low",
    background: "rgba(96, 165, 250, 0.14)",
    color: "#93c5fd",
  },
  Medium: {
    label: "Medium",
    background: "rgba(255, 220, 43, 0.14)",
    color: "#fde68a",
  },
  High: {
    label: "High",
    background: "rgba(239, 68, 68, 0.14)",
    color: "#fca5a5",
  },
};

type JobCardProps = {
  job: Job;
};

function formatRelativeDate(dateString: string, prefix: string) {
  const date = new Date(dateString);
  const today = new Date();

  date.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const differenceInDays = Math.floor(
    (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (differenceInDays <= 0) {
    return `${prefix} today`;
  }

  if (differenceInDays === 1) {
    return `${prefix} yesterday`;
  }

  return `${prefix} ${differenceInDays} days ago`;
}

function formatFollowUpDate(dateString: string | null) {
  if (!dateString) {
    return null;
  }

  const followUp = new Date(dateString);
  const today = new Date();

  followUp.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const difference = Math.floor(
    (followUp.getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (difference === 0) {
    return {
      text: "Follow up today",
      color: "#facc15",
    };
  }

  if (difference < 0) {
    const overdueDays = Math.abs(difference);

    return {
      text: `Overdue by ${overdueDays} day${
        overdueDays === 1 ? "" : "s"
      }`,
      color: "#ef4444",
    };
  }

  return {
    text: `Follow up in ${difference} day${
      difference === 1 ? "" : "s"
    }`,
    color: "#22c55e",
  };
}

export default function JobCard({ job }: JobCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: job.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const priority =
    priorityStyles[job.priority] ?? priorityStyles.Medium;

  const followUp = formatFollowUpDate(job.followUpDate);

  return (
    <article
      ref={setNodeRef}
      className={styles.card}
      style={style}
      {...listeners}
      {...attributes}
    >
      <strong className={styles.company}>
        {job.company || "Unknown Company"}
      </strong>

      <p className={styles.title}>
        {job.title || "Unknown Position"}
      </p>

      <span
        className={styles.priority}
        style={{
          background: priority.background,
          color: priority.color,
        }}
      >
        {priority.label}
      </span>

      {job.location && (
        <p className={styles.meta}>📍 {job.location}</p>
      )}

      {job.salary && (
        <p className={styles.meta}>💰 {job.salary}</p>
      )}

      <div className={styles.dates}>
        <p className={styles.date}>
          📅 {formatRelativeDate(job.applicationDate, "Added")}
        </p>

        <p className={styles.date}>
          ✏️ {formatRelativeDate(job.updatedAt, "Updated")}
        </p>
      </div>

      {followUp && (
        <p
          className={styles.followUp}
          style={{ color: followUp.color }}
        >
          🔔 {followUp.text}
        </p>
      )}
    </article>
  );
}

