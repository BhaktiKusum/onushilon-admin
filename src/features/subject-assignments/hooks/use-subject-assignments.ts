"use client";

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";

import { getSubjectAssignments } from "../api/get-subject-assignments";

export const useSubjectAssignments =
  () => {
    return useQuery({
      queryKey: [
        QUERY_KEYS.SUBJECT_ASSIGNMENTS,
      ],

      queryFn:
        getSubjectAssignments,
    });
  };