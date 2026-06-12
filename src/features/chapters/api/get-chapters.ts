import { apiClient } from "@/services/api-client";

import { Chapter } from "../types/chapter.types";

export const getChapters =
  async (
    subjectId: string,
  ): Promise<Chapter[]> => {
    const response =
      await apiClient.get(
        `/chapters?subjectId=${subjectId}`,
      );

    return response.data;
  };