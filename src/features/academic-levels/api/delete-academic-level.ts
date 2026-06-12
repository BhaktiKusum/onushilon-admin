import { apiClient } from "@/services/api-client";

export const deleteAcademicLevel =
  async (id: string) => {
    const response =
      await apiClient.delete(
        `/academic-levels/${id}`,
      );

    return response.data;
  };