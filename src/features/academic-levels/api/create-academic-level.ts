import { apiClient } from "@/services/api-client";

import {
  AcademicLevel,
  AcademicLevelPayload,
} from "../types/academic-level.types";

export const createAcademicLevel =
  async (
    payload: AcademicLevelPayload,
  ): Promise<AcademicLevel> => {
    const response =
      await apiClient.post(
        "/academic-levels",
        payload,
      );

    return response.data;
  };