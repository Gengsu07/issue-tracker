import { Flex } from "@radix-ui/themes";
import LatestIssue from "./LatestIssue";
import Pagination from "./issues/_components/Pagination";
import IssueStatusFilter from "./issues/list/IssueStatusFilter";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";

export default async function Home() {
  const open_issues = await prisma.issue.count({
    where: { status: "OPEN" },
  });
  const inprogress_issues = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed_issues = await prisma.issue.count({
    where: { status: "CLOSED" },
  });
  return (
    <div>
      <IssueSummary
        open={open_issues}
        in_progress={inprogress_issues}
        closed={closed_issues}
      />
    </div>
  );
}
