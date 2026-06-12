// src/features/exams/api/add-exam-chapters.ts

import { apiClient } from "@/services/api-client";

export const addExamChapters =
  async ({
    examId,
    chapterIds,
  }: {
    examId: string;
    chapterIds: string[];
  }) => {
    const response =
      await apiClient.post(
        `/exams/${examId}/chapters`,
        {
          chapterIds,
        },
      );

    return response.data;
  };