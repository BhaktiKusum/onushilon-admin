import { apiClient } from "@/services/api-client";

export const publishExam =
  async (
    examId: string,
  ) => {
    const response =
      await apiClient.patch(
        `/exams/${examId}/publish`,
      );

    return response.data;
  };