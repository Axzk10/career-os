import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

const validStatuses = [
  "Saved",
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
];

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const job = await prisma.job.findUnique({
    where: {
      id,
    },
  });

  if (!job) {
    return NextResponse.json(
      { error: "Job not found." },
      { status: 404 }
    );
  }

  return NextResponse.json(job);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  if (
    body.status !== undefined &&
    !validStatuses.includes(body.status)
  ) {
    return NextResponse.json(
      { error: "Invalid job status." },
      { status: 400 }
    );
  }

  const existingJob = await prisma.job.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  if (!existingJob) {
    return NextResponse.json(
      { error: "Job not found." },
      { status: 404 }
    );
  }

  const updatedJob = await prisma.job.update({
    where: {
      id,
    },
    data: {
      company: body.company,
      title: body.title,
      status: body.status,
      priority: body.priority,
      location: body.location,
      salary: body.salary,
      url: body.url,
      notes: body.notes,

      ...(body.followUpDate !== undefined && {
        followUpDate: body.followUpDate
          ? new Date(body.followUpDate)
          : null,
      }),
    },
  });

  return NextResponse.json(updatedJob);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const existingJob = await prisma.job.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
    },
  });

  if (!existingJob) {
    return NextResponse.json(
      { error: "Job not found." },
      { status: 404 }
    );
  }

  await prisma.job.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    message: "Job deleted successfully.",
  });
}
