"use client";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/query-keys";

import { deleteSubject } from "../api/delete-subject";

export const useDeleteSubject =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn: deleteSubject,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            QUERY_KEYS.SUBJECT_ASSIGNMENTS,
          ],
        });

        toast.success(
          "Subject deleted successfully",
        );
      },

      onError: () => {
        toast.error(
          "Failed to delete subject",
        );
      },
    });
  };