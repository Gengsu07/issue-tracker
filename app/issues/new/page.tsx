"use client";
import { Button, TextField } from "@radix-ui/themes";
import axios from "axios";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface Issue {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<Issue>();
  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issue", data);
        router.push("/issues");
      })}
    >
      <TextField.Input
        radius="large"
        placeholder="Issue title"
        {...register("title")}
      />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Issue description" {...field} />
        )}
      />

      <Button variant="solid" size={"3"}>
        Submit New Issue
      </Button>
    </form>
  );
};

export default NewIssuePage;
