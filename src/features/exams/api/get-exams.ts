import { apiClient } from "@/services/api-client";

import { Exam } from "../types/exam.types";

export const getExams =
  async (): Promise<Exam[]> => {
    const response =
      await apiClient.get(
        "/exams",
      );

      

    return response.data;
  };