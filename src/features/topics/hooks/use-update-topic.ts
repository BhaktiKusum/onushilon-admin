"use client";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/query-keys";

import { updateTopic } from "../api/update-topic";

export const useUpdateTopic =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        updateTopic,

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              QUERY_KEYS.TOPICS,
            ],
          },
        );

        toast.success(
          "Topic updated successfully",
        );
      },

      onError: () => {
        toast.error(
          "Failed to update topic",
        );
      },
    });
  };