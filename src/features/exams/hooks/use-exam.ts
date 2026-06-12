"use client";

import { useQuery } from "@tanstack/react-query";

import { getExam } from "../api/get-exam";

export const useExam = (
  examId: string,
) => {
  return useQuery({
    queryKey: [
      "exam",
      examId,
    ],

    queryFn: () =>
      getExam(examId),

    enabled:
      !!examId,
  });
};