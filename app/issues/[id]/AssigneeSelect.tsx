"use client";
import { Select } from "@radix-ui/themes";
import React from "react";

const AssignneSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Assign user</Select.Label>
          <Select.Item value="1">Sugeng Wahyudi</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssignneSelect;
