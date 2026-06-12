"use client";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/query-keys";

import { deleteChapter } from "../api/delete-chapter";

export const useDeleteChapter =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        deleteChapter,

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              QUERY_KEYS.CHAPTERS,
            ],
          },
        );

        toast.success(
          "Chapter deleted successfully",
        );
      },

      onError: () => {
        toast.error(
          "Failed to delete chapter",
        );
      },
    });
  };