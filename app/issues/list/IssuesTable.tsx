import { LinkComponent, IssueStatusBadge } from "@/app/componets";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import React from "react";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}
interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssuesTable = ({ searchParams, issues }: Props) => {
  return (
    <div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columnConfig.map((col) => (
              <Table.ColumnHeaderCell key={col.value} className={col.className}>
                <NextLink
                  href={{
                    query: { ...searchParams, orderBy: col.value },
                  }}
                >
                  {col.label}
                </NextLink>
                {col.value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <LinkComponent href={`/issues/${issue.id}`}>
                  {issue.title}
                </LinkComponent>
                <div className="font-bold block mt-1 md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
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

const columnConfig: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Title", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnName = columnConfig.map((col) => col.value);
export default IssuesTable;
