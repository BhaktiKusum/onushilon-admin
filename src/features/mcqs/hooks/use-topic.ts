"use client";

import { useQuery } from "@tanstack/react-query";

import { getTopic } from "../api/get-topic";

export const useTopic = (
  topicId: string,
) => {
  return useQuery({
    queryKey: [
      "topic",
      topicId,
    ],

    queryFn: () =>
      getTopic(topicId),

    enabled: !!topicId,
  });
};