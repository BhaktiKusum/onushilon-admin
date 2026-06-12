// src/features/exams/api/add-exam-subjects.ts

import { apiClient } from "@/services/api-client";

export const addExamSubjects =
  async ({
    examId,
    subjectIds,
  }: {
    examId: string;
    subjectIds: string[];
  }) => {
    const response =
      await apiClient.post(
        `/exams/${examId}/subjects`,
        {
          subjectIds,
        },
      );

    return response.data;
  };