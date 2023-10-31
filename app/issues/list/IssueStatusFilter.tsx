"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const IssueStatusFilter = () => {
  const searchParams = useSearchParams();
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
        defaultValue={searchParams.get("status") || "All"}
        onValueChange={(status) => {
          const params = new URLSearchParams();
          if (status) params.append("status", status);
          if (searchParams.get("orderBy"))
            params.append("orderBy", searchParams.get("orderBy")!);

          if (status === "All") params.delete("status");
          const query = params.size ? "?" + params.toString() : "All";
          router.push(`/issues/list${query}`);
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
