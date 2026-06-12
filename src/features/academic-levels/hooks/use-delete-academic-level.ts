"use client";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/query-keys";

import { deleteAcademicLevel } from "../api/delete-academic-level";

export const useDeleteAcademicLevel = () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        deleteAcademicLevel,

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              QUERY_KEYS.ACADEMIC_LEVELS,
            ],
          },
        );

        toast.success(
          "Academic level deleted successfully",
        );
      },

      onError: () => {
        toast.error(
          "Failed to delete academic level",
        );
      },
    });
  };