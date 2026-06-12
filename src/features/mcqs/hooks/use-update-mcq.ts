"use client";

import { useMutation } from "@tanstack/react-query";

import { useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";

import { updateMcq } from "../api/update-mcq";

export const useUpdateMcq =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        updateMcq,

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              QUERY_KEYS.MCQS,
            ],
          },
        );
      },

      onError: (error) => {
        console.error(
          "MCQ Update Error:",
          error,
        );
      },
    });
  };