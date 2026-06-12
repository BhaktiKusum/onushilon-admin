import { apiClient } from "@/services/api-client";

interface Payload {
  examId: string;

  mcqId: string;
}

export const deleteExamMcq =
  async ({
    examId,
    mcqId,
  }: Payload) => {
    const response =
      await apiClient.delete(
        `/exams/${examId}/mcqs/${mcqId}`,
      );

    return response.data;
  };