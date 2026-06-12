"use client";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/query-keys";

import { createTopic } from "../api/create-topic";

export const useCreateTopic =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn: createTopic,

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              QUERY_KEYS.TOPICS,
            ],
          },
        );

        toast.success(
          "Topic created successfully",
        );
      },

      onError: () => {
        toast.error(
          "Failed to create topic",
        );
      },
    });
  };