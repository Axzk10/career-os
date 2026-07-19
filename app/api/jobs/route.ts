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

  const lastJob = await prisma.job.findFirst({
    orderBy: {
      position: "desc",
    },
    select: {
      position: true,
    },
  });

  const job = await prisma.job.create({
    data: {
      company: data.company,
      title: data.title,
      status: data.status ?? "Saved",
      position: (lastJob?.position ?? -1) + 1,
    },
  });

  return NextResponse.json(job, { status: 201 });
}
