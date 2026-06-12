"use client";

import { useMutation } from "@tanstack/react-query";

import { assignSubjects } from "../api/assign-subjects";

export const useAssignSubjects =
  () => {
    return useMutation({
      mutationFn:
        assignSubjects,
    });
  };