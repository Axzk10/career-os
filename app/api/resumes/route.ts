import { prisma } from "@/prisma";
import { NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function GET() {
  const resumes = await prisma.resume.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(resumes);
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const nameValue = formData.get("name");
  const fileValue = formData.get("file");

  const name =
    typeof nameValue === "string"
      ? nameValue.trim()
      : "";

  if (!name) {
    return NextResponse.json(
      { message: "Please enter a resume name." },
      { status: 400 }
    );
  }

  if (!(fileValue instanceof File)) {
    return NextResponse.json(
      { message: "Please choose a PDF file." },
      { status: 400 }
    );
  }

  if (fileValue.type !== "application/pdf") {
    return NextResponse.json(
      { message: "Only PDF files are allowed." },
      { status: 400 }
    );
  }

  if (fileValue.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { message: "The PDF must be smaller than 5 MB." },
      { status: 400 }
    );
  }

  const safeOriginalName = fileValue.name
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .toLowerCase();

  const storedFileName = `${crypto.randomUUID()}-${safeOriginalName}`;

  const uploadDirectory = path.join(
    process.cwd(),
    "public",
    "uploads",
    "resumes"
  );

  await mkdir(uploadDirectory, {
    recursive: true,
  });

  const bytes = await fileValue.arrayBuffer();
  const buffer = Buffer.from(bytes);

  await writeFile(
    path.join(uploadDirectory, storedFileName),
    buffer
  );

  const filePath = `/uploads/resumes/${storedFileName}`;

  const resume = await prisma.resume.create({
    data: {
      name,
      filePath,
    },
  });

  return NextResponse.json(resume, {
    status: 201,
  });
}
