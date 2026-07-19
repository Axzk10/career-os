"use client";

// ======================================================
// IMPORTS
// ======================================================

import { useEffect, useState, use } from "react";
import Link from "next/link";
import type { Job } from "../../types";
import Toast from "../../components/Toast";

// ======================================================
// CONSTANTS
// ======================================================

const statuses = [
  "Saved",
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
];

const priorities = ["Low", "Medium", "High"];

// ======================================================
// PAGE COMPONENT
// ======================================================

export default function JobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ======================================================
  // ROUTE PARAMS
  // ======================================================

  const { id } = use(params);

  // ======================================================
  // JOB DATA STATE
  // ======================================================

  const [job, setJob] = useState<Job | null>(null);

  // ======================================================
  // FORM STATE
  // ======================================================

  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");

  // ======================================================
  // UI STATE
  // ======================================================

  const [toast, setToast] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // ======================================================
  // LOAD JOB
  // ======================================================

  useEffect(() => {
    async function loadJob() {
      const response = await fetch(`/api/jobs/${id}`);

      if (!response.ok) {
        console.error("Failed to load job.");
        return;
      }

      const data: Job = await response.json();

      setJob(data);
      setCompany(data.company || "");
      setTitle(data.title || "");
      setStatus(data.status || "Saved");
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

  // ======================================================
  // SAVE JOB
  // ======================================================

  async function saveJob() {
    setIsSaving(true);

    try {
      const response = await fetch(`/api/jobs/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
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
        throw new Error("Failed to save job.");
      }

      const updatedJob: Job = await response.json();

      setJob(updatedJob);
      setToast("Job saved successfully!");

      setTimeout(() => {
        setToast("");
      }, 3000);
    } catch (error) {
      console.error(error);
      setToast("Could not save the job.");

      setTimeout(() => {
        setToast("");
      }, 3000);
    } finally {
      setIsSaving(false);
    }
  }

  // ======================================================
  // LOADING STATE
  // ======================================================

  if (!job) {
    return (
      <main style={{ padding: 32 }}>
        <p style={{ color: "var(--muted)" }}>Loading job...</p>
      </main>
    );
  }

  // ======================================================
  // PAGE UI
  // ======================================================

  return (
    <main
      style={{
        width: "100%",
        maxWidth: 1100,
        margin: "0 auto",
        padding: 32,
      }}
    >
      {/* ==================================================
          BACK LINK
      ================================================== */}

      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 24,
          color: "var(--muted)",
          textDecoration: "none",
          fontWeight: 600,
        }}
      >
        ← Back to Dashboard
      </Link>

      {/* ==================================================
          JOB DETAILS CARD
      ================================================== */}

      <section
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          padding: 28,
        }}
      >
        {/* ================================================
            PAGE HEADER
        ================================================ */}

        <header>
          <p
            style={{
              margin: 0,
              color: "var(--yellow)",
              fontWeight: 700,
            }}
          >
            Job Details
          </p>

          <h1
            style={{
              margin: "10px 0 4px",
              fontSize: 36,
            }}
          >
            {company || "Unknown Company"}
          </h1>

          <p
            style={{
              margin: 0,
              color: "var(--muted)",
              fontSize: 18,
            }}
          >
            {title || "Unknown Position"}
          </p>

          {/* ==============================================
              STATUS AND PRIORITY BADGES
          ============================================== */}

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginTop: 18,
            }}
          >
            <Badge
              label={status || "Saved"}
              background="rgba(59, 130, 246, 0.14)"
              color="#93c5fd"
            />

            <Badge
              label={`${priority || "Medium"} Priority`}
              background="rgba(234, 179, 8, 0.14)"
              color="#fde047"
            />
          </div>
        </header>

        <hr
          style={{
            border: 0,
            borderTop: "1px solid var(--border)",
            margin: "28px 0",
          }}
        />

        {/* ==================================================
            APPLICATION DETAILS SECTION
        ================================================== */}

        <FormSection
          title="Application Details"
          description="Update the role, company, status, and priority."
        >
          <div style={formGridStyle}>
            <Field label="Company">
              <input
                value={company}
                onChange={(event) => setCompany(event.target.value)}
              />
            </Field>

            <Field label="Job Title">
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </Field>

            <Field label="Status">
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                {statuses.map((statusOption) => (
                  <option key={statusOption} value={statusOption}>
                    {statusOption}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Priority">
              <select
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
              >
                {priorities.map((priorityOption) => (
                  <option key={priorityOption} value={priorityOption}>
                    {priorityOption}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </FormSection>

        {/* ==================================================
            OPPORTUNITY DETAILS SECTION
        ================================================== */}

        <FormSection
          title="Opportunity Details"
          description="Store practical information about the role."
        >
          <div style={formGridStyle}>
            <Field label="Follow-up Date">
              <input
                type="date"
                value={followUpDate}
                onChange={(event) =>
                  setFollowUpDate(event.target.value)
                }
              />
            </Field>

            <Field label="Location">
              <input
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              />
            </Field>

            <Field label="Salary">
              <input
                value={salary}
                onChange={(event) => setSalary(event.target.value)}
                placeholder="For example, £35,000"
              />
            </Field>

            <Field label="Job URL">
              <input
                type="url"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                placeholder="https://..."
              />
            </Field>
          </div>
        </FormSection>

        {/* ==================================================
            NOTES SECTION
        ================================================== */}

        <FormSection
          title="Notes"
          description="Keep interview preparation, recruiter updates, and next steps together."
        >
          <Field label="Application Notes">
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Add recruiter notes, interview preparation, follow-up details, or next steps..."
              style={{
                width: "100%",
                minHeight: 190,
                resize: "vertical",
              }}
            />
          </Field>
        </FormSection>

        {/* ==================================================
            ACTION BAR
        ================================================== */}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 12,
            marginTop: 32,
            paddingTop: 24,
            borderTop: "1px solid var(--border)",
          }}
        >
          <Link
            href="/"
            style={{
              padding: "11px 16px",
              color: "var(--muted)",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Cancel
          </Link>

          <button
            type="button"
            onClick={saveJob}
            disabled={isSaving}
            style={{
              minWidth: 140,
              opacity: isSaving ? 0.7 : 1,
              cursor: isSaving ? "not-allowed" : "pointer",
            }}
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </section>

      {/* ==================================================
          TOAST MESSAGE
      ================================================== */}

      {toast && (
        <Toast
          message={toast}
          type={
            toast === "Job saved successfully!"
              ? "success"
              : "error"
          }
        />
      )}
    </main>
  );
}

// ======================================================
// FORM SECTION COMPONENT
// ======================================================

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        marginBottom: 30,
      }}
    >
      <div
        style={{
          marginBottom: 18,
        }}
      >
        <h2
          style={{
            margin: "0 0 4px",
            fontSize: 19,
          }}
        >
          {title}
        </h2>

        <p
          style={{
            margin: 0,
            color: "var(--muted)",
            fontSize: 14,
          }}
        >
          {description}
        </p>
      </div>

      {children}
    </section>
  );
}

// ======================================================
// FIELD COMPONENT
// ======================================================

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label
      style={{
        display: "grid",
        gap: 8,
      }}
    >
      <span
        style={{
          color: "var(--muted)",
          fontSize: 14,
          fontWeight: 500,
        }}
      >
        {label}
      </span>

      {children}
    </label>
  );
}

// ======================================================
// BADGE COMPONENT
// ======================================================

function Badge({
  label,
  background,
  color,
}: {
  label: string;
  background: string;
  color: string;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "6px 11px",
        background,
        color,
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 700,
      }}
    >
      {label}
    </span>
  );
}

// ======================================================
// SHARED STYLES
// ======================================================

const formGridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 18,
};
