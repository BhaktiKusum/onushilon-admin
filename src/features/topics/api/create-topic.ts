import { apiClient } from "@/services/api-client";

export const createTopic =
  async (payload: {
    chapterId: string;
    name: string;
    orderNo: number;
  }) => {
    const response =
      await apiClient.post(
        "/topics",
        payload,
      );

    return response.data;
  };