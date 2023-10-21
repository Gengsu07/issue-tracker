import { Pencil1Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditIssueButtton = ({ IssueId }: { IssueId: number }) => {
  return (
    <Link href={`/issues/${IssueId}/edit`}>
      <Button variant="solid" color="blue">
        <Pencil1Icon />
        Edit Issue
      </Button>
    </Link>
  );
};

export default EditIssueButtton;
