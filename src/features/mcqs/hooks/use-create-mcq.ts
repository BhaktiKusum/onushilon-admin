"use client";

import { useMutation } from "@tanstack/react-query";

import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/query-keys";

import { createMcq } from "../api/create-mcq";

export const useCreateMcq =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn: createMcq,

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              QUERY_KEYS.MCQS,
            ],
          },
        );

        toast.success(
          "MCQ created successfully",
        );
      },
    });
  };