import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

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

  return NextResponse.json(job);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

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
      followUpDate: body.followUpDate
        ? new Date(body.followUpDate)
        : null,
    },
  });

  return NextResponse.json(updatedJob);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.job.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    message: "Job deleted successfully",
  });
}
