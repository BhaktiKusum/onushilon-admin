import { apiClient } from "@/services/api-client";

interface Payload {
  examId: string;

  mcqIds: string[];
}

export const addExamMcqs =
  async ({
    examId,
    mcqIds,
  }: Payload) => {
    const response =
      await apiClient.post(
        `/exams/${examId}/mcqs`,
        {
          mcqIds,
        },
      );

    return response.data;
  };