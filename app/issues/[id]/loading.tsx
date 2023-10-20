import IssueStatusBadge from "@/app/componets/IssueStatusBadge";
import { Flex, Card, Box } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingDetailIssue = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex gap="2">
        <Skeleton width="3rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose mt-3">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingDetailIssue;
