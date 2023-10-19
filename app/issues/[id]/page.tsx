import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const DetailIssuePage = async ({ params }: Props) => {
  if (params.id !== "number") notFound();
  const Issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!Issue) return notFound();

  return (
    <div>
      <p>{Issue.title}</p>
      <p>{Issue.description}</p>
      <p>{Issue.status}</p>
      <p>{Issue.createdAt.toDateString()}</p>
    </div>
  );
};

export default DetailIssuePage;
