"use client";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/app/componets";

const AssignneSelect = () => {
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
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Assign user</Select.Label>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.email}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssignneSelect;
