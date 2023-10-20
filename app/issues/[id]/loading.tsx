import { Flex, Card, Box } from "@radix-ui/themes";
import { Skeleton } from "@/app/componets";

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
