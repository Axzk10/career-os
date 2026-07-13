import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const resumes = await prisma.resume.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(resumes);
}

export async function POST(request: Request) {
  const body = await request.json();

  const name = body.name?.trim();
  const filePath = body.filePath?.trim();

  if (!name || !filePath) {
    return NextResponse.json(
      {
        message: "Resume name and file path are required.",
      },
      {
        status: 400,
      }
    );
  }

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
