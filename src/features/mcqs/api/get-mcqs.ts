import { apiClient } from "@/services/api-client";

import { Mcq } from "../types/mcq.types";

interface Params {
  subjectId?: string;
  chapterId?: string;
  topicId?: string;
}

export const getMcqs =
  async ({
    subjectId,
    chapterId,
    topicId,
  }: Params): Promise<Mcq[]> => {
    const response =
      await apiClient.get(
  "/mcqs",
  {
    params: {
      subjectId,
      chapterId,
      topicId,
    },
  },
);

console.log("Fetched MCQs:", response.data);

    return response.data;
  };