import { IssueStatusBadge } from "@/app/componets";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Pencil1Icon } from "@radix-ui/react-icons";

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
        <Heading>{Issue.title}</Heading>
        <Flex gap="2" className="mt-2">
          <IssueStatusBadge status={Issue.status} />
          <p>{Issue.createdAt.toDateString()}</p>
        </Flex>
        <Card className="prose mt-3">
          <ReactMarkdown children={Issue.description} />
        </Card>
      </Box>
      <Box>
        <Link href={`/issues/${Issue.id}/edit`}>
          <Button variant="solid" color="blue">
            <Pencil1Icon />
            Edit Issue
          </Button>
        </Link>
      </Box>
    </Grid>
  );
};

export default DetailIssuePage;
