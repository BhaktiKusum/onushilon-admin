import { apiClient } from "@/services/api-client";

export const deleteTopic =
  async (
    topicId: string,
  ) => {
    const response =
      await apiClient.delete(
        `/topics/${topicId}`,
      );

    return response.data;
  };