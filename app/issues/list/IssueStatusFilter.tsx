"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const IssueStatusFilter = () => {
  const statuses: { label: string; value?: Status }[] = [
    { label: "All" },
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
  ];
  const router = useRouter();
  return (
    <div>
      <Select.Root
        onValueChange={(status) => {
          status == "All"
            ? router.push(`/issues/list`)
            : router.push(`/issues/list?status=${status}`);
        }}
      >
        <Select.Trigger placeholder="Filter Issue Status.." />
        <Select.Content>
          {statuses.map((status) => (
            <Select.Item key={status.value || ""} value={status.value || "All"}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </div>
  );
};

export default IssueStatusFilter;
