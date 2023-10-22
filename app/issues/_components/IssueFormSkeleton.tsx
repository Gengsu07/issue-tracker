import { Box } from "@radix-ui/themes";
import React from "react";
import Skeleton from "@/app/componets/Skeleton";

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height="2rem" />
      <Skeleton height="23rem" />
    </Box>
  );
};

export default IssueFormSkeleton;
