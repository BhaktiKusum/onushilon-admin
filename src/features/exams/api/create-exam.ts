import { apiClient } from "@/services/api-client";

export const createExam =
  async (
    data: Record<
      string,
      unknown
    >,
  ) => {
    const response =
      await apiClient.post(
        "/exams",
        data,
      );

    return response.data;
  };