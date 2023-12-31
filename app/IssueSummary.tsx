import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  data: { open: number; in_progress: number; closed: number };
}
const IssueSummary = ({ data: { open, in_progress, closed } }: Props) => {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In Progress Issues", value: in_progress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ];
  return (
    <Flex gap="3" justify="between">
      {containers.map((container) => (
        <Card key={container.label} size="2">
          <Flex direction="column" gap="1">
            <Link
              href={`/issues/list?status=${container.status}`}
              className="text-sm font-medium"
            >
              {container.label}
            </Link>
            <Text className="font-bold">{container.value}</Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
