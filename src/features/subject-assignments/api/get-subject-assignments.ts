import { apiClient } from "@/services/api-client";

import { SubjectAssignment } from "../types/subject-assignment.types";

export const getSubjectAssignments =
  async (): Promise<
    SubjectAssignment[]
  > => {
    const response =
      await apiClient.get(
        "/subject-assignments",
      );

    return response.data;
  };