"use client";

import { useMutation } from "@tanstack/react-query";

import { assignChapters } from "../api/assign-chapters";

export const useAssignChapters =
  () => {
    return useMutation({
      mutationFn:
        assignChapters,
    });
  };