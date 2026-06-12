import { apiClient } from "@/services/api-client";

export const createChapter =
  async (payload: {
    subjectId: string;
    name: string;
    orderNo: number;
  }) => {
    const response =
      await apiClient.post(
        "/chapters",
        payload,
      );

    return response.data;
  };