import { apiClient } from "@/services/api-client";

interface Payload {
  examId: string;
  chapterIds: string[];
}

export const assignChapters =
  async ({
    examId,
    chapterIds,
  }: Payload) => {
    const response =
      await apiClient.post(
        `/exams/${examId}/chapters`,
        {
          chapterIds,
        },
      );

    return response.data;
  };