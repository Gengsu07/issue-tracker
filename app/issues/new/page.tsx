"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Input radius="large" placeholder="Issue title" />
      <TextArea variant="surface" size={"3"} placeholder="Issue description" />
      <Button variant="solid" size={"3"}>
        Submit New Issue
      </Button>
    </div>
  );
};

export default NewIssuePage;
