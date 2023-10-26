import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { IssueScheme } from "../../validationSchema";
import { getServerSession } from "next-auth";
import AuthOptions from "../auth/AuthOptions";

export async function POST(req: NextRequest) {
  const session = await getServerSession(AuthOptions)
  if (!session) return NextResponse.json({},{status:401})   
  const body = await req.json();
  const validation = IssueScheme.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newUser = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(newUser, { status: 201 });
}
