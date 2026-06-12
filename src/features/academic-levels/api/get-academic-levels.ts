import { apiClient } from "@/services/api-client";

import { AcademicLevel } from "../types/academic-level.types";

export const getAcademicLevels =
  async (): Promise<
    AcademicLevel[]
  > => {
    const response =
      await apiClient.get<
        AcademicLevel[]
      >("/academic-levels");

    return response.data;
  };