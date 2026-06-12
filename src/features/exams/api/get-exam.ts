import { apiClient } from "@/services/api-client";

export const getExam = async (
  examId: string,
) => {
  const response =
    await apiClient.get(
      `/exams/${examId}`,
    );

  return response.data;
};