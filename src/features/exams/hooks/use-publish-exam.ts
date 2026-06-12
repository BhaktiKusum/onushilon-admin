"use client";

import { useMutation } from "@tanstack/react-query";

import { publishExam } from "../api/publish-exam";

export const usePublishExam =
  () => {
    return useMutation({
      mutationFn:
        publishExam,
    });
  };