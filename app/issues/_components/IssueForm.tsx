"use client";
import ErrorMessage from "@/app/componets/ErrorMessage";
import Spinner from "@/app/componets/Spinner";
import { IssueScheme } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import React, { forwardRef, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import SimpleMDE from "react-simplemde-editor";

type IssueFormData = z.infer<typeof IssueScheme>;

interface Props {
  issue?: Issue;
}

const IssueForm = ({ issue }: Props) => {
  const router = useRouter();
  const [error, setError] = useState<IssueFormData>({
    title: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(IssueScheme),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);

      if (issue) await axios.patch(`/api/issue/${issue?.id}`, data);
      else await axios.post("/api/issue", data);

      setIsSubmitting(false);
      router.push("/issues");
      router.refresh();
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
          defaultValue={issue?.title}
          placeholder="Issue title"
          {...register("title")}
        />

        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => <SimpleMDE {...field} />}
        />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button variant="solid" size={"3"}>
          {issue ? "Update Issue" : "Submit New Issue"}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
