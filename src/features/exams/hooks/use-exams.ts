"use client";

import { useQuery } from "@tanstack/react-query";

import { getExams } from "../api/get-exams";

export const useExams =
  () => {
    return useQuery({
      queryKey: [
        "exams",
      ],

      queryFn:
        getExams,
    });
  };