import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import Pagination from "../_components/Pagination";
import IssueAction from "./IssueAction";
import IssuesTable, { IssueQuery, columnName } from "./IssuesTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface Props {
  searchParams: IssueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status };

  const orderBy = columnName.includes(searchParams.orderBy)
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
    <Flex gap="3" direction="column">
      <h1>IssuesPage</h1>
      <IssueAction />
      <IssuesTable searchParams={searchParams} issues={issues} />
      <Pagination
        currentPage={currentPage}
        pageSize={10}
        itemCount={itemCount}
      />
    </Flex>
  );
};
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "List of All Issues",
  description: "List of All Issues in your organization development issues",
  applicationName: "Gengsu-IssueTracker",
  authors: [{ name: "Sugeng Wahyudi" }],
  keywords: "Track your Organization Development Issues",
};
export default IssuesPage;
