import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

const createIssueScheme = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = createIssueScheme.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const newUser = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(newUser, { status: 201 });
}
