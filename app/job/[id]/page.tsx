"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import type { Job } from "../../types";
import Toast from "../../components/Toast";

export default function JobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [job, setJob] = useState<Job | null>(null);

  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [toast, setToast] = useState("");

  useEffect(() => {
    async function loadJob() {
      const res = await fetch(`/api/jobs/${id}`);

      if (!res.ok) {
        console.error("Failed to load job.");
        return;
      }

      const data: Job = await res.json();

      setJob(data);
      setCompany(data.company || "");
      setTitle(data.title || "");
      setStatus(data.status || "");
      setPriority(data.priority || "Medium");
      setLocation(data.location || "");
      setSalary(data.salary || "");
      setUrl(data.url || "");
      setNotes(data.notes || "");
      setFollowUpDate(
        data.followUpDate
          ? new Date(data.followUpDate).toISOString().slice(0, 10)
          : ""
      );
    }

    loadJob();
  }, [id]);

  async function saveJob() {
    const response = await fetch(`/api/jobs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        company,
        title,
        status,
        priority,
        location,
        salary,
        url,
        notes,
        followUpDate: followUpDate || null,
      }),
    });

    if (!response.ok) {
      console.error("Failed to save job.");
      return;
    }

    const updatedJob: Job = await response.json();
    setJob(updatedJob);

    setToast("Job saved successfully!");

    setTimeout(() => {
      setToast("");
    }, 3000);
  }

  if (!job) return <main style={{ padding: 32 }}>Loading...</main>;

  return (
    <main style={{ padding: 32 }}>
      <Link
        href="/"
        style={{
          color: "var(--yellow)",
          textDecoration: "none",
          fontWeight: 700,
        }}
      >
        ← Back to Dashboard
      </Link>

      <section
        style={{
          marginTop: 24,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          padding: 24,
          maxWidth: 920,
        }}
      >
        <p style={{ color: "var(--yellow)", margin: 0, fontWeight: 700 }}>
          Job Details
        </p>

        <h1 style={{ margin: "8px 0 4px", fontSize: 34 }}>
          {company || "Unknown Company"}
        </h1>

        <p style={{ margin: 0, color: "var(--muted)" }}>
          {title || "Unknown Position"}
        </p>

        <hr
          style={{
            border: 0,
            borderTop: "1px solid var(--border)",
            margin: "24px 0",
          }}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          <Field label="Company">
            <input value={company} onChange={(e) => setCompany(e.target.value)} />
          </Field>

          <Field label="Job Title">
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </Field>

          <Field label="Status">
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option>Saved</option>
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
          </Field>

          <Field label="Priority">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </Field>

          <Field label="Follow-up Date">
            <input
              type="date"
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
            />
          </Field>

          <Field label="Location">
            <input value={location} onChange={(e) => setLocation(e.target.value)} />
          </Field>

          <Field label="Salary">
            <input value={salary} onChange={(e) => setSalary(e.target.value)} />
          </Field>

          <Field label="Job URL">
            <input value={url} onChange={(e) => setUrl(e.target.value)} />
          </Field>
        </div>

        <div style={{ marginTop: 20 }}>
          <Field label="Notes">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{ width: "100%", minHeight: 180, resize: "vertical" }}
            />
          </Field>
        </div>

        <button onClick={saveJob} style={{ marginTop: 20 }}>
          Save Changes
        </button>
      </section>
      
      {toast && (
        <Toast
          message={toast}
          type="success"
        />  
      )}
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label style={{ display: "grid", gap: 8 }}>
      <span style={{ color: "var(--muted)", fontSize: 14 }}>{label}</span>
      {children}
    </label>
  );
}