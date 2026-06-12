"use client";

import { useQuery } from "@tanstack/react-query";

import { getAcademicLevelSubjects } from "../api/get-academic-level-subjects";

export const useAcademicLevelSubjects =
  (academicLevelId: string,) => {
    return useQuery({
      queryKey: [
        "academic-level-subjects",
        academicLevelId,
      ],

      queryFn: () =>
        getAcademicLevelSubjects(
          academicLevelId,
        ),

      enabled:
        !!academicLevelId,
    });
  };