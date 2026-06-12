// src/features/exams/hooks/use-update-exam.ts

"use client";

import { useMutation } from "@tanstack/react-query";

import { updateExam } from "../api/update-exam";

export const useUpdateExam =
  () => {
    return useMutation({
      mutationFn:
        updateExam,
    });
  };