"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Input radius="large" placeholder="Issue title" />
      <SimpleMDE placeholder="Issue description" />
      <Button variant="solid" size={"3"}>
        Submit New Issue
      </Button>
    </div>
  );
};

export default NewIssuePage;
