import { apiClient } from "@/services/api-client";

interface Payload {
  id: string;
  name: string;
}

export const updateAcademicLevel =
  async ({
    id,
    name,
  }: Payload) => {
    const response =
      await apiClient.patch(
        `/academic-levels/${id}`,
        {
          name,
        },
      );

    return response.data;
  };