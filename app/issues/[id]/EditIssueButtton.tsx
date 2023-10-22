import { Pencil1Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const EditIssueButtton = ({ IssueId }: { IssueId: number }) => {
  return (
    <Button variant="solid" color="blue">
      <Pencil1Icon />
      <Link href={`/issues/${IssueId}/edit`}>Edit Issue</Link>
    </Button>
  );
};

export default EditIssueButtton;
