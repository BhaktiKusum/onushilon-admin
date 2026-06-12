import { useMutation } from "@tanstack/react-query";

import { useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { QUERY_KEYS } from "@/constants/query-keys";

import { createAcademicLevel } from "../api/create-academic-level";

export const useCreateAcademicLevel = () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        createAcademicLevel,

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              QUERY_KEYS.ACADEMIC_LEVELS,
            ],
          },
        );

        toast.success(
          "Academic level created",
        );
      },
    });
  };