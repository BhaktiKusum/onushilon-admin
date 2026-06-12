import { apiClient } from "@/services/api-client";

interface ImportMcqsPayload {
  file: File;
  subjectId: string;
  chapterId: string;
  topicId: string;
}

export const importMcqs = async ({
  file,
  subjectId,
  chapterId,
  topicId,
}: ImportMcqsPayload) => {
  const formData =
    new FormData();

  formData.append(
    "file",
    file,
  );

  const response =
    await apiClient.post(
      `/mcqs/import`,
      formData,
      {
        params: {
          subjectId,
          chapterId,
          topicId,
        },

        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      },
    );

  return response.data;
};