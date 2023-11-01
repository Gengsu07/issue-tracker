import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import React from "react";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const totalPage = Math.ceil(itemCount / pageSize);
  return (
    <Flex align="center" gap="2">
      <Text>
        Page {currentPage} of {totalPage}
      </Text>
      <Button variant="soft" disabled={currentPage <= 2}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button variant="soft" disabled={currentPage === 1}>
        <ChevronLeftIcon />
      </Button>
      <Button variant="soft" disabled={currentPage === totalPage}>
        <ChevronRightIcon />
      </Button>
      <Button variant="soft" disabled={currentPage >= totalPage - 2}>
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
