import { apiClient } from "@/services/api-client";

interface UpdateTopicPayload {
  id: string;
  name: string;
  orderNo: number;
}

export const updateTopic =
  async ({
    id,
    name,
    orderNo,
  }: UpdateTopicPayload) => {
    const response =
      await apiClient.patch(
        `/topics/${id}`,
        {
          name,
          orderNo,
        },
      );

    return response.data;
  };