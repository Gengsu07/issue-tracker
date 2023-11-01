import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import { IssueStatusBadge, LinkComponent } from "../../componets";
import IssueAction from "./IssueAction";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "../_components/Pagination";

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    page: string;
  };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };

  const orderBy = columnConfig
    .map((col) => col.value)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const currentPage = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const itemCount = await prisma.issue.count({ where });

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  });

  return (
    <div>
      <h1>IssuesPage</h1>
      <div className="my-3">
        <IssueAction />
      </div>

      <Pagination
        currentPage={currentPage}
        pageSize={20}
        itemCount={itemCount}
      />
    </div>
  );
};
export const dynamic = "force-dynamic";
export default IssuesPage;
