import { apiClient } from "@/services/api-client";

interface UploadResponse {
  url: string;
}

export const uploadImage =
  async (
    file: File,
  ): Promise<UploadResponse> => {
    const formData =
      new FormData();

    formData.append(
      "file",
      file,
    );

    const response =
      await apiClient.post(
        "/uploads/image",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        },
      );

    return response.data;
  };