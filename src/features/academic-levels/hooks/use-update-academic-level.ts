"use client";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/query-keys";

import { updateAcademicLevel } from "../api/update-academic-level";

export const useUpdateAcademicLevel = () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        updateAcademicLevel,

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              QUERY_KEYS.ACADEMIC_LEVELS,
            ],
          },
        );

        toast.success(
          "Academic level updated successfully",
        );
      },

      onError: () => {
        toast.error(
          "Failed to update academic level",
        );
      },
    });
  };