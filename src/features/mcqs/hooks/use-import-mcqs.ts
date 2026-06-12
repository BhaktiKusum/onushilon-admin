"use client";

import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";

import { importMcqs } from "../api/import-mcqs";

export const useImportMcqs =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        importMcqs,

      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              QUERY_KEYS.MCQS,
            ],
          },
        );
      },
    });
  };