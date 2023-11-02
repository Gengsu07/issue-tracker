import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import IssueBarChart from "./IssueBarChart";
import IssueSummary from "./IssueSummary";
import LatestIssue from "./LatestIssue";
import { Metadata } from "next";

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
export const metadata: Metadata = {
  title: "Dashboard Issue Tracker",
  description: "Track KPI and Summary of your organization development issues",
  applicationName: "Gengsu-IssueTracker",
  authors: [{ name: "Sugeng Wahyudi" }],
  keywords: "Track your Organization Development Issues",
};
