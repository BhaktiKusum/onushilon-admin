import { apiClient } from "@/services/api-client";

export const deleteSubject = async (
  subjectId: string,
) => {
  const response =
    await apiClient.delete(
      `/subjects/${subjectId}`,
    );

  return response.data;
};