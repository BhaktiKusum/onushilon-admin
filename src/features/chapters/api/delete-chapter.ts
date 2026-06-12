import { apiClient } from "@/services/api-client";

export const deleteChapter =
  async (
    chapterId: string,
  ) => {
    const response =
      await apiClient.delete(
        `/chapters/${chapterId}`,
      );

    return response.data;
  };