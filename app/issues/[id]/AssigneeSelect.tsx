"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/app/componets";
import toast, { Toaster } from "react-hot-toast";

const AssignneSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => axios.get<User[]>("/api/user").then((resp) => resp.data),
    staleTime: 60 * 1000,
    retry: 2,
  });
  if (isLoading) return <Skeleton />;
  if (error) return null;
  return (
    <>
      <Select.Root
        onValueChange={(userId) => {
          axios
            .patch("/api/issue/" + issue.id, {
              assignedToUserId: userId === "unassigned" ? null : userId,
            })
            .catch(() => toast.error("Changes failed to saved"));
        }}
        defaultValue={issue.assignedToUserId || ""}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Assign user</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.email}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssignneSelect;
