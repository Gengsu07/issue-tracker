"use client";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AssignneSelect = () => {
  const [users, SetUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get<User[]>("/api/user");
      SetUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Assign user</Select.Label>
          {users.map((user) => (
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
