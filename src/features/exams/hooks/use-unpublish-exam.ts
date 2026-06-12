"use client";

import { useMutation } from "@tanstack/react-query";

import { unpublishExam } from "../api/unpublish-exam";

export const useUnpublishExam =
  () => {
    return useMutation({
      mutationFn:
        unpublishExam,
    });
  };