"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Issue {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const [error, setError] = useState<Issue>({ title: "", description: "" });
  const { register, control, handleSubmit } = useForm<Issue>();
  return (
    <div className="max-w-xl">
      {(error.title || error.description) && (
        <Callout.Root variant="soft" color="red" role="alert" className="mb-3">
          <Callout.Text>
            {error.title ? <li>title:{error.title}</li> : null}
            {error.description && <li>description:{error.description}</li>}
          </Callout.Text>
        </Callout.Root>
      )}
      <form
        className=" space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issue", data);
            router.push("/issues");
          } catch (error) {
            if (axios.isAxiosError(error)) {
              const [titleErr, descErr] = [
                error.response?.data.title?._errors,
                error.response?.data.description?._errors,
              ];
              setError({ title: titleErr, description: descErr });
            }
          }
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
    </div>
  );
};

export default NewIssuePage;
