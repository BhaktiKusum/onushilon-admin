import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { deleteExamMcq } from "../api/delete-exam-mcq";

export const useDeleteExamMcq =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        deleteExamMcq,

      onSuccess: (
        _,
        variables,
      ) => {
        queryClient.invalidateQueries(
          {
            queryKey: [
              "exam-mcqs",
              variables.examId,
            ],
          },
        );
      },
    });
  };