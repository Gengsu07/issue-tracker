import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButtton from "./EditIssueButtton";
import IssueDetail from "./IssueDetail";
import DeleteIssueButton from "./DeleteIssueButton";
import AuthOptions from "@/app/api/auth/AuthOptions";
import { getServerSession } from "next-auth";
import AssignneSelect from "./AssigneeSelect";
import { cache } from "react";

interface Props {
  params: { id: string };
}

const fetchIssue = cache((id: number) =>
  prisma.issue.findUnique({ where: { id: id } })
);
const DetailIssuePage = async ({ params }: Props) => {
  const session = await getServerSession(AuthOptions);

  const Issue = await fetchIssue(parseInt(params.id));

  if (!Issue) return notFound();
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="3">
      <Box className="md:col-span-4">
        <IssueDetail issue={Issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="3" className="mt-10">
            <AssignneSelect issue={Issue} />
            <EditIssueButtton IssueId={Issue.id} />
            <DeleteIssueButton issueId={Issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssue(parseInt(params.id));
  return {
    title: "Issue Detail Page",
    description: issue?.title,
    applicationName: "Gengsu-IssueTracker",
    authors: [{ name: "Sugeng Wahyudi" }],
    keywords: "Track your Organization Development Issues",
  };
}
export default DetailIssuePage;
