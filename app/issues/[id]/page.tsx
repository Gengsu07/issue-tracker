import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButtton from "./EditIssueButtton";
import IssueDetail from "./IssueDetail";
import DeleteIssueButton from "./DeleteIssueButton";
import AuthOptions from "@/app/api/auth/AuthOptions";
import { getServerSession } from "next-auth";

interface Props {
  params: { id: string };
}

const DetailIssuePage = async ({ params }: Props) => {
  const session = await getServerSession(AuthOptions);

  const Issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!Issue) return notFound();
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="3">
      <Box className="md:col-span-4">
        <IssueDetail issue={Issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="3">
            <EditIssueButtton IssueId={Issue.id} />
            <DeleteIssueButton issueId={Issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default DetailIssuePage;
