import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const jobs = await prisma.job.findMany({
    orderBy: {
      position: "asc",
    },
  });

  return NextResponse.json(jobs);
}

export async function POST(req: Request) {
  const data = await req.json();

  const jobs = await prisma.job.findMany({
    select: {
      id: true,
      company: true,
      title: true,
      status: true,
      priority: true,
      location: true,
      salary: true,
      url: true,
      notes: true,
      applicationDate: true,
    },
  });
  return NextResponse.json(job);
}

