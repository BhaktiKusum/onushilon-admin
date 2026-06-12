import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { addExamMcqs } from "../api/add-exam-mcqs";

export const useAddExamMcqs =
  () => {
    const queryClient =
      useQueryClient();

    return useMutation({
      mutationFn:
        addExamMcqs,

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