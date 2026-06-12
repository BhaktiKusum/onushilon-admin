import { apiClient } from "@/services/api-client";

export const assignSubject =
  async (payload: {
    subjectId: string;
    academicLevelIds: string[];
  }) => {
    const response =
      await apiClient.post(
        "/subject-assignments",
        payload,
      );

    return response.data;
  };