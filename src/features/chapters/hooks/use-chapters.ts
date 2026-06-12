"use client";

import { useQuery } from "@tanstack/react-query";

import { getChapters } from "../api/get-chapters";

export const useChapters = (
  subjectId: string,
) => {
  return useQuery({
    queryKey: [
      "chapters",
      subjectId,
    ],

    queryFn: () =>
      getChapters(subjectId),

    enabled: !!subjectId,
  });
};