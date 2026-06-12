import { apiClient } from "@/services/api-client";

export const deleteExam =
  async (
    examId: string,
  ) => {
    const response =
      await apiClient.delete(
        `/exams/${examId}`,
      );

    return response.data;
  };