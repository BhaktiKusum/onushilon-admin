"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import McqForm from "./mcq-form";

import {
  mcqSchema,
  McqFormValues,
} from "../schemas/mcq.schema";

import { useUpdateMcq } from "../hooks/use-update-mcq";

import { Mcq } from "../types/mcq.types";

interface Props {
  mcq: Mcq;
}

export default function UpdateMcqDialog({
  mcq,
}: Props) {
  const { mutate, isPending } =
    useUpdateMcq();

  const form =
    useForm<McqFormValues>({
      resolver: zodResolver(
        mcqSchema,
      ),

      defaultValues: {
        scenario:
          mcq.scenario ?? {
            text: "",
            image: null,
          },

        question:
          mcq.question,

        options:
          mcq.options,

        correctOptionKey:
          mcq.correctOptionKey,

        explanation:
          mcq.explanation ?? {
            text: "",
            image: null,
          },

        references:
          mcq.references ??
          [],

        difficulty:
          mcq.difficulty,
      },
    });

  const handleSubmit = (
    values: McqFormValues,
  ) => {
    mutate({
      id: mcq.id,
      data: values,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
        >
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Update MCQ
          </DialogTitle>
        </DialogHeader>

        <McqForm
          form={form}
          onSubmit={
            handleSubmit
          }
          isPending={
            isPending
          }
          submitText="Update MCQ"
        />
      </DialogContent>
    </Dialog>
  );
}