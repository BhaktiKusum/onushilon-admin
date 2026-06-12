"use client";

import { useMutation } from "@tanstack/react-query";

import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/query-keys";

import { updateSubjectAssignment } from "../api/update-subject-assignment";

export const useUpdateSubjectAssignment =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        updateSubjectAssignment,

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              QUERY_KEYS.SUBJECT_ASSIGNMENTS,
            ],
          },
        );

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