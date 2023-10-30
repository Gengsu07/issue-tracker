"use client";
import { Skeleton } from "@/app/componets";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AssignneSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUser();

  if (isLoading) return <Skeleton />;
  if (error) return null;

  const assignUser = (userId: string) => {
    axios
      .patch("/api/issue/" + issue.id, {
        assignedToUserId: userId === "unassigned" ? null : userId,
      })
      .catch(() => toast.error("Changes failed to saved"));
  };
  return (
    <>
      <Select.Root
        onValueChange={assignUser}
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

const useUser = () =>
  useQuery({
    queryKey: ["user"],
    queryFn: () => axios.get<User[]>("/api/user").then((resp) => resp.data),
    staleTime: 60 * 1000 * 10,
    retry: 2,
  });

export default AssignneSelect;
