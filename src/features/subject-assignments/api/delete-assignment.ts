import { apiClient } from "@/services/api-client";

export const deleteAssignment =
  async (
    assignmentId: string,
  ) => {
    const response =
      await apiClient.delete(
        `/subject-assignments/${assignmentId}`,
      );

    return response.data;
  };