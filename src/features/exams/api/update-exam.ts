// src/features/exams/api/update-exam.ts

import { apiClient } from "@/services/api-client";

interface Payload {
  id: string;
  data: Record<
    string,
    unknown
  >;
}

export const updateExam =
  async ({
    id,
    data,
  }: Payload) => {
    const response =
      await apiClient.patch(
        `/exams/${id}`,
        data,
      );

    return response.data;
  };