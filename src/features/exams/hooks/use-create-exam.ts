"use client";

import { useMutation } from "@tanstack/react-query";

import { createExam } from "../api/create-exam";

export const useCreateExam =
  () => {
    return useMutation({
      mutationFn:
        createExam,
    });
  };