"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import ExamForm from "./exam-form";

import { useExam } from "../hooks/use-exam";

import { useUpdateExam } from "../hooks/use-update-exam";

import {
  createExamSchema,
  CreateExamFormValues,
} from "../schemas/create-exam.schema";

interface Props {
  examId: string;
}

export default function EditExamForm({ examId }: Props) {
  const router = useRouter();

  const { data: exam, isLoading } = useExam(examId);

  const { mutate, isPending } = useUpdateExam();

  const form = useForm<CreateExamFormValues>({
    resolver: zodResolver(createExamSchema),

    defaultValues: {
      title: "",
      description: "",
      academicLevelId: "",

      type: "LIVE",

      enrollmentType: "OPEN",

      durationMinutes: 0,

      totalMarks: 0,

      negativeMarks: 0,

      startAt: "",
      endAt: "",

      maxParticipants: 0,

      orderNo: 1,
    },
  });

  useEffect(() => {
    if (!exam) {
      return;
    }

    form.reset({
      title: exam.title,

      description: exam.description,

      academicLevelId: exam.academicLevelId,

      type: exam.type,

      enrollmentType: exam.enrollmentType,

      durationMinutes: exam.durationMinutes,

      totalMarks: exam.totalMarks,

      negativeMarks: Number(exam.negativeMarks),

      maxParticipants: exam.maxParticipants,

      orderNo: exam.orderNo,

      startAt: exam.startAt.slice(0, 16),

      endAt: exam.endAt.slice(0, 16),
    });
  }, [exam, form]);

  const onSubmit = (values: CreateExamFormValues) => {
    mutate(
      {
        id: examId,
        data: values,
      },
      {
        onSuccess: () => {
          toast.success("Exam updated");

          router.push(`/exams/${examId}`);
        },
      },
    );
  };

  if (isLoading || !exam) {
    return <div>Loading...</div>;
  }

  return (
    <ExamForm
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      title="Edit Exam"
      submitLabel="Save Changes"
    />
  );
}
