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

import { mcqSchema, McqFormValues } from "../schemas/mcq.schema";

import { useCreateMcq } from "../hooks/use-create-mcq";

interface Props {
  subjectId: string;
  chapterId: string;
  topicId: string;
}

export default function CreateMcqDialog({
  subjectId,
  chapterId,
  topicId,
}: Props) {
  const { mutate, isPending } = useCreateMcq();

  const form = useForm<McqFormValues>({
    resolver: zodResolver(mcqSchema),

    defaultValues: {
      scenario: {
        text: "",
        image: null,
      },

      question: {
        text: "",
        image: null,
      },

      options: [
        {
          key: "A",
          text: "",
          image: null,
        },
        {
          key: "B",
          text: "",
          image: null,
        },
      ],

      correctOptionKey: "A",

      explanation: {
        text: "",
        image: null,
      },

      references: [],

      difficulty: "EASY",
    },
  });

  const handleSubmit = (values: McqFormValues) => {
    mutate({
      subjectId,
      chapterId,
      topicId,
      data: values,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create MCQ</Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto max-w-4xl">
        <DialogHeader>
          <DialogTitle>Create MCQ</DialogTitle>
        </DialogHeader>

        <McqForm
          form={form}
          onSubmit={handleSubmit}
          isPending={isPending}
          submitText="Create MCQ"
        />
      </DialogContent>
    </Dialog>
  );
}
