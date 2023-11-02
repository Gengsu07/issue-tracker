import { Flex, Grid } from "@radix-ui/themes";
import LatestIssue from "./LatestIssue";
import Pagination from "./issues/_components/Pagination";
import IssueStatusFilter from "./issues/list/IssueStatusFilter";
import IssueSummary from "./IssueSummary";
import prisma from "@/prisma/client";
import IssueBarChart from "./IssueBarChart";

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

  const data = {
    open: open_issues,
    in_progress: inprogress_issues,
    closed: closed_issues,
  };
  return (
    <div>
      <Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
        <Flex direction="column" gap={"5"}>
          <IssueSummary data={data} />
          <IssueBarChart data={data} />
        </Flex>
        <LatestIssue />
      </Grid>
    </div>
  );
}
