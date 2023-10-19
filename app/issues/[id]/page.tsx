import IssueStatusBadge from "@/app/componets/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const DetailIssuePage = async ({ params }: Props) => {
  const Issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!Issue) return notFound();

  return (
    <div>
      <Heading>{Issue.title}</Heading>
      <Flex gap="2">
        <IssueStatusBadge status={Issue.status} />
        <p>{Issue.createdAt.toDateString()}</p>
      </Flex>
      <Card className="mt-3">
        <p>{Issue.description}</p>
      </Card>
    </div>
  );
};

export default DetailIssuePage;
