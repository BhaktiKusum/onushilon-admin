"use client";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/query-keys";

import { deleteTopic } from "../api/delete-topic";

export const useDeleteTopic =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        deleteTopic,

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              QUERY_KEYS.TOPICS,
            ],
          },
        );

        toast.success(
          "Topic deleted successfully",
        );
      },

      onError: () => {
        toast.error(
          "Failed to delete topic",
        );
      },
    });
  };