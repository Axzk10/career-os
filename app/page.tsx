"use client";

import { useEffect, useState } from "react";
import type { DragEndEvent } from "@dnd-kit/core";
import DashboardHeader from "./components/DashboardHeader";
import Hero from "./components/Hero";
import NewApplicationForm from "./components/NewApplicationForm";
import SearchBar from "./components/SearchBar";
import StatCard from "./components/StatCard";
import type { Job } from "./types";
import KanbanBoard from "./components/KanbanBoard";
import TodaysFocus from "./components/TodaysFocus";

const columns = ["Saved", "Applied", "Interview", "Offer", "Rejected"];

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Saved");
  const [search, setSearch] = useState("");
  const [formError, setFormError] = useState("");

  async function loadJobs() {
    const response = await fetch("/api/jobs");

    if (!response.ok) {
      console.error("Failed to load jobs.");
      return;
    }

    const data: Job[] = await response.json();
    setJobs(data);
  }

  useEffect(() => {
    loadJobs();
  }, []);

  async function addJob(event: React.FormEvent) {
    event.preventDefault();

    const trimmedCompany = company.trim();
    const trimmedTitle = title.trim();

    if (!trimmedCompany || !trimmedTitle) {
      setFormError("Please enter both a company name and job title.");
      return;
    }

    setFormError("");

    const response = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company: trimmedCompany,
        title: trimmedTitle,
        status,
      }),
    });

    if (!response.ok) {
      setFormError("The job could not be added. Please try again.");
      return;
    }

    setCompany("");
    setTitle("");
    setStatus("Saved");

    await loadJobs();
  }

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const jobId = String(active.id);
    const newStatus = String(over.id);

    if (!columns.includes(newStatus)) return;

    const currentJob = jobs.find((job) => job.id === jobId);

    if (!currentJob || currentJob.status === newStatus) return;

    setJobs((previousJobs) =>
      previousJobs.map((job) =>
        job.id === jobId ? { ...job, status: newStatus } : job
      )
    );

    const response = await fetch(`/api/jobs/${jobId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    });

    if (!response.ok) {
      setJobs((previousJobs) =>
        previousJobs.map((job) =>
          job.id === jobId
            ? { ...job, status: currentJob.status }
            : job
        )
      );

      console.error("Failed to update the job status.");
    }
  }

  const filteredJobs = jobs.filter((job) => {
    const query = search.trim().toLowerCase();

    return (
      job.company.toLowerCase().includes(query) ||
      job.title.toLowerCase().includes(query) ||
      job.location?.toLowerCase().includes(query)
    );
  });

  const appliedCount = jobs.filter(
    (job) => job.status === "Applied"
  ).length;

  const interviewCount = jobs.filter(
    (job) => job.status === "Interview"
  ).length;

  const offerCount = jobs.filter(
    (job) => job.status === "Offer"
  ).length;

  return (
    <main style={{ padding: 32 }}>
      <DashboardHeader />

      <Hero
        totalJobs={jobs.length}
        interviews={interviewCount}
        offers={offerCount}
      />

      <TodaysFocus jobs={jobs} />
      
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <StatCard label="Total Jobs" value={jobs.length} />
        <StatCard label="Applied" value={appliedCount} />
        <StatCard label="Interviews" value={interviewCount} />
        <StatCard label="Offers" value={offerCount} />
      </section>

      <NewApplicationForm
        company={company}
        setCompany={setCompany}
        title={title}
        setTitle={setTitle}
        status={status}
        setStatus={setStatus}
        columns={columns}
        formError={formError}
        clearError={() => setFormError("")}
        onSubmit={addJob}
      />

      <SearchBar value={search} onChange={setSearch} />

      <KanbanBoard
        jobs={filteredJobs}
        columns={columns}
        onDragEnd={handleDragEnd}
      />  
    </main>
  );
}
