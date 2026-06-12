"use client";

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";

import { getAcademicLevels } from "../api/get-academic-levels";

export const useAcademicLevels =
  () => {
    return useQuery({
      queryKey: [
        QUERY_KEYS.ACADEMIC_LEVELS,
      ],

      queryFn:
        getAcademicLevels,
    });
  };