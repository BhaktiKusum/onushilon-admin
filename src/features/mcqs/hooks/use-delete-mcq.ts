"use client";

import { useMutation } from "@tanstack/react-query";

import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/query-keys";

import { deleteMcq } from "../api/delete-mcq";

export const useDeleteMcq =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        deleteMcq,

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              QUERY_KEYS.MCQS,
            ],
          },
        );

        toast.success(
          "MCQ deleted successfully",
        );
      },
      onError: (error) => {
        console.error(error);

        toast.error(
          "Failed to delete MCQ",
        );
      },
    });
  };