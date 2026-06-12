import { apiClient } from "@/services/api-client";

export const createSubject =
  async (payload: {
    name: string;
    adminDisplayName: string;
  }) => {
    const response =
      await apiClient.post(
        "/subjects",
        payload,
      );

    return response.data;
  };