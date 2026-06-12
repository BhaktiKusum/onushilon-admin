import { apiClient } from "@/services/api-client";

export const unpublishExam =
  async (
    examId: string,
  ) => {
    const response =
      await apiClient.patch(
        `/exams/${examId}/unpublish`,
      );

    return response.data;
  };