import prisma from "@/prisma/client";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();
  return (
    <div>
      <h1>IssuesPage</h1>
      <div className="my-3">
        <Button size="3">
          <Link href={"/issues/new"}>Add New Issue</Link>
        </Button>
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row className="bg-blue-400">
            <Table.ColumnHeaderCell className="text-white">
              Title
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell text-white">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell text-white">
              Created At
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                {issue.title}
                <div className="font-bold block md:hidden">{issue.status}</div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.status}
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuesPage;
