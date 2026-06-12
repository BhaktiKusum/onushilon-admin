import { apiClient } from "@/services/api-client";

interface UpdateSubjectPayload {
  id: string;
  name: string;
  adminDisplayName: string;
}

export const updateSubject = async ({
  id,
  name,
  adminDisplayName,
}: UpdateSubjectPayload) => {
  const response = await apiClient.patch(
    `/subjects/${id}`,
    {
      name,
      adminDisplayName,
    },
  );

  return response.data;
};