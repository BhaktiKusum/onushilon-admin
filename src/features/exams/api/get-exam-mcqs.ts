// src/features/exams/api/get-exam-mcqs.ts

import { apiClient } from "@/services/api-client";

export const getExamMcqs = async (
  examId: string,
) => {
  const response =
    await apiClient.get(
      `/exams/${examId}/mcqs`,
    );

  return response.data;
};