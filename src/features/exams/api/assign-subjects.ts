import { apiClient } from "@/services/api-client";

interface Payload {
  examId: string;
  subjectIds: string[];
}

export const assignSubjects =
  async ({
    examId,
    subjectIds,
  }: Payload) => {
    const response =
      await apiClient.post(
        `/exams/${examId}/subjects`,
        {
          subjectIds,
        },
      );

    return response.data;
  };