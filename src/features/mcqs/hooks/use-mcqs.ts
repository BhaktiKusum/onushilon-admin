"use client";

import { useQuery } from "@tanstack/react-query";

import { QUERY_KEYS } from "@/constants/query-keys";

import { getMcqs } from "../api/get-mcqs";

interface Props {
  subjectId?: string;
  chapterId?: string;
  topicId?: string;
}

export const useMcqs = (
  params: Props = {},
) => {
  const {
    subjectId,
    chapterId,
    topicId,
  } = params;

  return useQuery({
    queryKey: [
      QUERY_KEYS.MCQS,
      subjectId,
      chapterId,
      topicId,
    ],

    queryFn: () =>
      getMcqs({
        subjectId,
        chapterId,
        topicId,
      }),
  });
};