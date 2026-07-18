"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  BarChart3,
  BriefcaseBusiness,
  CalendarClock,
  Trophy,
} from "lucide-react";
import Card from "../components/ui/Card";
import StatusChart from "../components/charts/StatusChart";

type Job = {
  id: string;
  company: string;
  title: string;
  status: string;
  priority?: string | null;
  createdAt: string;
  applicationDate?: string | null;
  followUpDate?: string | null;
};

function formatStatus(status: string) {
  return status
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function AnalyticsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadJobs() {
      try {
        const response = await fetch("/api/jobs");

        if (!response.ok) {
          throw new Error("Could not load application data.");
        }

        const data: Job[] = await response.json();
        setJobs(data);
      } catch (loadError) {
        console.error(loadError);
        setError("Could not load your analytics.");
      } finally {
        setIsLoading(false);
      }
    }

    loadJobs();
  }, []);

  const analytics = useMemo(() => {
    const now = new Date();

    const startOfWeek = new Date(now);
    const day = startOfWeek.getDay();
    const differenceFromMonday = day === 0 ? -6 : 1 - day;

    startOfWeek.setDate(startOfWeek.getDate() + differenceFromMonday);
    startOfWeek.setHours(0, 0, 0, 0);

    const applicationsThisWeek = jobs.filter((job) => {
      const dateValue = job.applicationDate ?? job.createdAt;
      const applicationDate = new Date(dateValue);

      return applicationDate >= startOfWeek;
    }).length;

    const interviews = jobs.filter((job) =>
      job.status.toLowerCase().includes("interview")
    ).length;

    const offers = jobs.filter((job) =>
      job.status.toLowerCase().includes("offer")
    ).length;

    const overdueFollowUps = jobs.filter((job) => {
      if (!job.followUpDate) {
        return false;
      }

      const followUpDate = new Date(job.followUpDate);
      followUpDate.setHours(23, 59, 59, 999);

      return followUpDate < now;
    }).length;

    const highPriority = jobs.filter(
      (job) => job.priority?.toLowerCase() === "high"
    ).length;

    const responseRate =
      jobs.length > 0
        ? Math.round(((interviews + offers) / jobs.length) * 100)
        : 0;

    const statusCounts = jobs.reduce<Record<string, number>>((counts, job) => {
      counts[job.status] = (counts[job.status] ?? 0) + 1;
      return counts;
    }, {});

    const statusEntries = Object.entries(statusCounts).sort(
      (first, second) => second[1] - first[1]
    );

    const statusChartData = statusEntries.map(([status, count]) => ({
      status: formatStatus(status),
      count,
    }));

    return {
      applicationsThisWeek,
      interviews,
      offers,
      overdueFollowUps,
      highPriority,
      responseRate,
      statusChartData,
    };
  }, [jobs]);

  if (isLoading) {
    return (
      <main style={{ padding: 32 }}>
        <p style={{ color: "var(--muted)" }}>Loading analytics...</p>
      </main>
    );
  }

  return (
    <main
      style={{
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        padding: 32,
      }}
    >
      <header
        style={{
          marginBottom: 28,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "var(--yellow)",
            fontWeight: 700,
          }}
        >
          <BarChart3 size={20} />
          CareerOS Analytics
        </div>

        <h1
          style={{
            margin: "10px 0 6px",
            fontSize: 36,
          }}
        >
          Job Search Performance
        </h1>

        <p
          style={{
            margin: 0,
            color: "var(--muted)",
          }}
        >
          Understand your progress and identify what needs your attention.
        </p>
      </header>

      {error && (
        <Card
          style={{
            marginBottom: 24,
            borderColor: "rgba(239, 68, 68, 0.45)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "#fca5a5",
            }}
          >
            <AlertCircle size={18} />
            {error}
          </div>
        </Card>
      )}

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <MetricCard
          label="Total Applications"
          value={jobs.length}
          description="Applications being tracked"
          icon={<BriefcaseBusiness size={20} />}
        />

        <MetricCard
          label="This Week"
          value={analytics.applicationsThisWeek}
          description="Applications added this week"
          icon={<CalendarClock size={20} />}
        />

        <MetricCard
          label="Interviews"
          value={analytics.interviews}
          description="Applications reaching interview"
          icon={<BarChart3 size={20} />}
        />

        <MetricCard
          label="Offers"
          value={analytics.offers}
          description="Applications reaching offer"
          icon={<Trophy size={20} />}
        />
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <Card>
          <p
            style={{
              margin: "0 0 8px",
              color: "var(--muted)",
              fontSize: 14,
            }}
          >
            Interview response rate
          </p>

          <strong
            style={{
              display: "block",
              marginBottom: 16,
              fontSize: 36,
            }}
          >
            {analytics.responseRate}%
          </strong>

          <div
            style={{
              height: 10,
              overflow: "hidden",
              background: "var(--surface-light)",
              borderRadius: 999,
            }}
          >
            <div
              style={{
                width: `${Math.min(analytics.responseRate, 100)}%`,
                height: "100%",
                background: "var(--yellow)",
                borderRadius: 999,
                transition: "width 0.3s ease",
              }}
            />
          </div>

          <p
            style={{
              margin: "12px 0 0",
              color: "var(--muted)",
              fontSize: 13,
            }}
          >
            Percentage of applications that have reached interview or offer.
          </p>
        </Card>

        <Card>
          <h2
            style={{
              margin: "0 0 18px",
              fontSize: 18,
            }}
          >
            Attention required
          </h2>

          <div
            style={{
              display: "grid",
              gap: 14,
            }}
          >
            <AttentionRow
              label="Overdue follow-ups"
              value={analytics.overdueFollowUps}
              valueColor={
                analytics.overdueFollowUps > 0 ? "#fca5a5" : "var(--text)"
              }
            />

            <AttentionRow
              label="High-priority applications"
              value={analytics.highPriority}
              valueColor="#fde047"
            />

            <AttentionRow
              label="Applications without progress"
              value={Math.max(
                jobs.length - analytics.interviews - analytics.offers,
                0
              )}
            />
          </div>
        </Card>
      </section>

      <Card>
        <h2
          style={{
            margin: "0 0 6px",
            fontSize: 20,
          }}
        >
          Applications by status
        </h2>

        <p
          style={{
            margin: "0 0 24px",
            color: "var(--muted)",
            fontSize: 14,
          }}
        >
          See where your applications currently sit in the hiring pipeline.
        </p>

        <StatusChart data={analytics.statusChartData} />
      </Card>
    </main>
  );
}

type MetricCardProps = {
  label: string;
  value: number;
  description: string;
  icon: React.ReactNode;
};

function MetricCard({
  label,
  value,
  description,
  icon,
}: MetricCardProps) {
  return (
    <Card>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 16,
          marginBottom: 18,
        }}
      >
        <span
          style={{
            color: "var(--muted)",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          {label}
        </span>

        <span
          style={{
            display: "grid",
            placeItems: "center",
            width: 38,
            height: 38,
            color: "var(--yellow)",
            background: "rgba(234, 179, 8, 0.1)",
            borderRadius: 10,
          }}
        >
          {icon}
        </span>
      </div>

      <strong
        style={{
          display: "block",
          marginBottom: 6,
          fontSize: 32,
        }}
      >
        {value}
      </strong>

      <span
        style={{
          color: "var(--muted)",
          fontSize: 13,
        }}
      >
        {description}
      </span>
    </Card>
  );
}

type AttentionRowProps = {
  label: string;
  value: number;
  valueColor?: string;
};

function AttentionRow({
  label,
  value,
  valueColor = "var(--text)",
}: AttentionRowProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 16,
        paddingBottom: 14,
        borderBottom: "1px solid var(--border)",
      }}
    >
      <span
        style={{
          color: "var(--muted)",
        }}
      >
        {label}
      </span>

      <strong
        style={{
          color: valueColor,
          fontSize: 18,
        }}
      >
        {value}
      </strong>
    </div>
  );
}