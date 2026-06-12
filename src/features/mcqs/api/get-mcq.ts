import { apiClient } from "@/services/api-client";

import { Mcq } from "../types/mcq.types";

export const getMcqs =
  async (): Promise<Mcq[]> => {
    const response =
      await apiClient.get(
        "/mcqs",
      );

    console.log("Fetched MCQ:", response.data);

    return response.data;
  };