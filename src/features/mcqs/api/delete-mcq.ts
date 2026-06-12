import { apiClient } from "@/services/api-client";

export const deleteMcq =
  async (
    mcqId: string,
  ) => {
    console.log(
      "Deleting MCQ:",
      mcqId,
    );

    const response =
      await apiClient.delete(
        `/mcqs/${mcqId}`,
      );

    return response.data;
  };