import { apiClient } from "@/services/api-client";

export const getTopic =
  async (
    topicId: string,
  ) => {
    const response =
      await apiClient.get(
        `/topics/${topicId}`,
      );

    return response.data;
  };