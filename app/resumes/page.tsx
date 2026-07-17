"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";

type Resume = {
  id: string;
  name: string;
  filePath: string;
  createdAt: string;
};

export default function ResumesPage() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function loadResumes() {
    const response = await fetch("/api/resumes");

    if (!response.ok) {
      setError("Could not load resumes.");
      return;
    }

    const data: Resume[] = await response.json();
    setResumes(data);
  }

  useEffect(() => {
    loadResumes();
  }, []);

  async function addResume(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Please enter a resume name.");
      return;
    }

    if (!file) {
      setError("Please choose a PDF file.");
      return;
    }

    setError("");
    setIsUploading(true);

    try {
      const formData = new FormData();

      formData.append("name", trimmedName);
      formData.append("file", file);

      const response = await fetch("/api/resumes", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Could not upload the resume.");
        return;
      }

      setName("");
      setFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      await loadResumes();
    } catch (uploadError) {
      console.error(uploadError);
      setError("Something went wrong while uploading the resume.");
    } finally {
      setIsUploading(false);
    }
  }

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

      <header
        style={{
          marginTop: 24,
          marginBottom: 24,
        }}
      >
        <p
          style={{
            margin: 0,
            color: "var(--yellow)",
            fontWeight: 700,
          }}
        >
          CareerOS
        </p>

        <h1
          style={{
            margin: "8px 0 6px",
            fontSize: 36,
          }}
        >
          Resume Library
        </h1>

        <p
          style={{
            margin: 0,
            color: "var(--muted)",
          }}
        >
          Upload and organise different resume versions for your applications.
        </p>
      </header>

      <Card
        style={{
          marginBottom: 24,
        }}
      >
        <h2 style={{ marginTop: 0 }}>Upload Resume</h2>

        <form
          onSubmit={addResume}
          style={{
            display: "grid",
            gap: 18,
            maxWidth: 520,
          }}
        >
          <Input
            id="resume-name"
            label="Resume name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);

              if (error) {
                setError("");
              }
            }}
            placeholder="Software Engineer Resume"
            required
          />

          <label
            htmlFor="resume-file"
            style={{
              display: "grid",
              gap: 8,
            }}
          >
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "var(--text)",
              }}
            >
              PDF file
            </span>

            <input
              ref={fileInputRef}
              id="resume-file"
              type="file"
              accept="application/pdf,.pdf"
              onChange={(event) => {
                setFile(event.target.files?.[0] ?? null);

                if (error) {
                  setError("");
                }
              }}
            />
          </label>

          {file && (
            <p
              style={{
                margin: 0,
                color: "var(--muted)",
                fontSize: 14,
              }}
            >
              Selected file: {file.name}
            </p>
          )}

          {error && (
            <p
              role="alert"
              style={{
                margin: 0,
                color: "#fca5a5",
                fontSize: 14,
              }}
            >
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={isUploading}
            style={{
              width: "fit-content",
            }}
          >
            {isUploading ? "Uploading..." : "Upload Resume"}
          </Button>
        </form>
      </Card>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 16,
        }}
      >
        {resumes.length === 0 ? (
          <Card
            style={{
              borderStyle: "dashed",
              color: "var(--muted)",
            }}
          >
            No resumes saved yet.
          </Card>
        ) : (
          resumes.map((resume) => (
            <Card key={resume.id}>
              <div
                style={{
                  fontSize: 28,
                  marginBottom: 12,
                }}
              >
                📄
              </div>

              <h3
                style={{
                  margin: "0 0 8px",
                }}
              >
                {resume.name}
              </h3>

              <a
                href={resume.filePath}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-block",
                  marginBottom: 12,
                  color: "var(--yellow)",
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
                Open PDF →
              </a>

              <small
                style={{
                  display: "block",
                  color: "var(--muted)",
                }}
              >
                Added {new Date(resume.createdAt).toLocaleDateString()}
              </small>
            </Card>
          ))
        )}
      </section>
    </main>
  );
}
