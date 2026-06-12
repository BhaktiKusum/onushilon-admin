"use client";

import { useMutation } from "@tanstack/react-query";

import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/query-keys";

import { createAndAssignSubject } from "../api/create-and-assign-subject";

export const useCreateSubjectAssignment =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        createAndAssignSubject,

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              QUERY_KEYS.SUBJECT_ASSIGNMENTS,
            ],
          },
        );

        toast.success(
          "Subject created successfully",
        );
      },
    });
  };