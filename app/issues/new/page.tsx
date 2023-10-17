"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueScheme } from "@/app/validationSchema";
import ErrorMessage from "@/app/componets/ErrorMessage";
import Spinner from "@/app/componets/Spinner";

type Issue = z.infer<typeof createIssueScheme>;

const NewIssuePage = () => {
  const router = useRouter();
  const [error, setError] = useState<Issue>({ title: "", description: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Issue>({
    resolver: zodResolver(createIssueScheme),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      await axios.post("/api/issue", data);
      setIsSubmitting(false);
      router.push("/issues");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const [titleErr, descErr] = [
          error.response?.data.title?._errors,
          error.response?.data.description?._errors,
        ];
        setError({ title: titleErr, description: descErr });
        setIsSubmitting(false);
      }
    }
  });
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
      <form className=" space-y-3" onSubmit={onSubmit}>
        <TextField.Input
          radius="large"
          placeholder="Issue title"
          {...register("title")}
        />

        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Issue description" {...field} />
          )}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button variant="solid" size={"3"}>
          Submit New Issue
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
