// src/features/subject-assignments/api/get-academic-level-subjects.ts

import { apiClient } from "@/services/api-client";

export const getAcademicLevelSubjects =
  async (
    academicLevelId: string,
  ) => {
    const response =
      await apiClient.get(
        `/subject-assignments/academic-level/${academicLevelId}`,
      );

    return response.data;
  };