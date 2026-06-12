// use-remove-exam-mcq.ts

"use client";

import { useMutation } from "@tanstack/react-query";

import { removeExamMcq } from "../api/remove-exam-mcq";

export const useRemoveExamMcq =
  () => {
    return useMutation({
      mutationFn:
        removeExamMcq,
    });
  };