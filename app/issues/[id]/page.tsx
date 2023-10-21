import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButtton from "./EditIssueButtton";
import IssueDetail from "./IssueDetail";

interface Props {
  params: { id: string };
}

const DetailIssuePage = async ({ params }: Props) => {
  const Issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!Issue) return notFound();
  return (
    <Grid columns={{ initial: "1", md: "2" }} align="center" gap="3">
      <Box>
        <IssueDetail issue={Issue} />
      </Box>
      <Box>
        <EditIssueButtton IssueId={Issue.id} />
      </Box>
    </Grid>
  );
};

export default DetailIssuePage;
