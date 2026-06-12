// src/features/exams/hooks/use-add-exam-subjects.ts

"use client";

import { useMutation } from "@tanstack/react-query";

import { addExamSubjects }
from "../api/add-exam-subjects";

export const useAddExamSubjects =
  () => {
    return useMutation({
      mutationFn:
        addExamSubjects,
    });
  };