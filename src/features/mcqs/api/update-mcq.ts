import { apiClient } from "@/services/api-client";

export const updateMcq =
  async ({
    id,
    data,
  }: UpdateMcqPayload) => {
    try {
      const response =
        await apiClient.patch(
          `/mcqs/${id}`,
          data,
        );

      return response.data;
    } catch (error: any) {
      console.log(
        "PATCH DATA:",
        data,
      );

      console.log(
        "BACKEND ERROR:",
        error.response?.data,
      );

      console.log(
  "PATCH DATA:",
  JSON.stringify(
    data,
    null,
    2,
  ),
);

      throw error;
    }
  };