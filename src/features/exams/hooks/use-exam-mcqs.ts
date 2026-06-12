// use-exam-mcqs.ts

"use client";

import { useQuery } from "@tanstack/react-query";

import { getExamMcqs } from "../api/get-exam-mcqs";

export const useExamMcqs = (
  examId: string,
) => {
  return useQuery({
    queryKey: [
      "exam-mcqs",
      examId,
    ],

    queryFn: () =>
      getExamMcqs(examId),
  });
};