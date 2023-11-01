import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "./IssueStatusFilter";

const IssueAction = () => {
  return (
    <Flex justify="between">
      <IssueStatusFilter />
      <Button>
        <Link href={"/issues/new"}>Add New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueAction;
