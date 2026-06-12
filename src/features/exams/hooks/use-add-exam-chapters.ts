// src/features/exams/hooks/use-add-exam-chapters.ts

"use client";

import { useMutation } from "@tanstack/react-query";

import { addExamChapters }
from "../api/add-exam-chapters";

export const useAddExamChapters =
  () => {
    return useMutation({
      mutationFn:
        addExamChapters,
    });
  };