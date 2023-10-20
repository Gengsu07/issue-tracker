import IssueStatusBadge from "@/app/componets/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";

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
      <Card className="prose mt-3">
        <ReactMarkdown children={Issue.description} />
      </Card>
    </div>
  );
};

export default DetailIssuePage;
