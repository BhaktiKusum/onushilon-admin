"use client";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAcademicLevels } from "@/features/academic-levels/hooks/use-academic-levels";

import {
  createExamSchema,
  CreateExamFormValues,
} from "../schemas/create-exam.schema";

import { useCreateExam } from "../hooks/use-create-exam";

import ExamForm from "./exam-form";

export default function CreateExamForm() {
  const router = useRouter();

  const { data: academicLevels = [] } = useAcademicLevels();

  const { mutate, isPending } = useCreateExam();

  const form = useForm<CreateExamFormValues>({
    resolver: zodResolver(createExamSchema),

    defaultValues: {
      title: "",
      description: "",

      type: "LIVE",

      enrollmentType: "OPEN",

      durationMinutes: 60,

      totalMarks: 100,

      negativeMarks: 0,

      maxParticipants: 1000,

      orderNo: 1,
    },
  });

  const handleSubmit = (values: CreateExamFormValues) => {
    mutate(values, {
      onSuccess: (exam) => {
        toast.success("Exam created");

        router.push(`/exams/${exam.id}/subjects`);
      },

      onError: (error: any) => {
        toast.error(error.response?.data?.message ?? "Failed to create exam");
      },
    });
  };

  return (
    <ExamForm
      form={form}
      onSubmit={handleSubmit}
      isPending={isPending}
      title="Create Exam"
      submitLabel="Create Exam"
    />
  );
}
