// src/features/exams/api/remove-exam-mcq.ts

import { apiClient } from "@/services/api-client";

interface Payload {
  examId: string;
  mcqId: string;
}

export const removeExamMcq =
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