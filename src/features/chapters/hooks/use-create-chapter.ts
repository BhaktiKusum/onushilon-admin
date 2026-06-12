"use client";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/query-keys";

import { createChapter } from "../api/create-chapter";

export const useCreateChapter =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        createChapter,

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              QUERY_KEYS.CHAPTERS,
            ],
          },
        );

        toast.success(
          "Chapter created successfully",
        );
      },

      onError: () => {
        toast.error(
          "Failed to create chapter",
        );
      },
    });
  };