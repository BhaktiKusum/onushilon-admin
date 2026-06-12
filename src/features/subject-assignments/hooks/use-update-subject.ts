"use client";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/query-keys";

import { updateSubject } from "../api/update-subject";

export const useUpdateSubject =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn: updateSubject,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            QUERY_KEYS.SUBJECT_ASSIGNMENTS,
          ],
        });

        toast.success(
          "Subject updated successfully",
        );
      },

      onError: () => {
        toast.error(
          "Failed to update subject",
        );
      },
    });
  };