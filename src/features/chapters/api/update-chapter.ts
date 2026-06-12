import { apiClient } from "@/services/api-client";

interface UpdateChapterPayload {
  id: string;
  name: string;
  orderNo: number;
}

export const updateChapter =
  async ({
    id,
    name,
    orderNo,
  }: UpdateChapterPayload) => {
    const response =
      await apiClient.patch(
        `/chapters/${id}`,
        {
          name,
          orderNo,
        },
      );

    return response.data;
  };