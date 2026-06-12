"use client";

import { useQuery } from "@tanstack/react-query";

import { getTopics } from "../api/get-topics";

import { QUERY_KEYS } from "@/constants/query-keys";

export const useTopics = (
  chapterId: string,
) => {
  return useQuery({
    queryKey: [
      QUERY_KEYS.TOPICS,
      chapterId,
    ],

    queryFn: () =>
      getTopics(chapterId),

    enabled: !!chapterId,
  });
};