"use client";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/query-keys";

import { updateChapter } from "../api/update-chapter";

interface UpdateChapterPayload {
  id: string;
  name: string;
  orderNo: number;
}

export const useUpdateChapter =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn: (
        payload: UpdateChapterPayload,
      ) =>
        updateChapter(
          payload,
        ),

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              QUERY_KEYS.CHAPTERS,
            ],
          },
        );

        toast.success(
          "Chapter updated successfully",
        );
      },

      onError: () => {
        toast.error(
          "Failed to update chapter",
        );
      },
    });
  };