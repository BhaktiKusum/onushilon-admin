import { apiClient } from "@/services/api-client";

import { Topic } from "../types/topic.types";

export const getTopics =
  async (
    chapterId: string,
  ): Promise<Topic[]> => {
    const response =
      await apiClient.get(
        `/topics?chapterId=${chapterId}`,
      );

    return response.data;
  };