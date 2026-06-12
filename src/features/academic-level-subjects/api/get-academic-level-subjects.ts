import { apiClient } from "@/services/api-client";

import { AcademicLevelSubject } from "../types/academic-level-subject.types";

export const getAcademicLevelSubjects =
  async (academicLevelId: string,): 
  Promise<AcademicLevelSubject[]> => {
    const response = await apiClient.get(
        `/subject-assignments/academic-level/${academicLevelId}`,
      );

    return response.data;
  };