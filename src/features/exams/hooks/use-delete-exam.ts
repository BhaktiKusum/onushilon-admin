"use client";

import { useMutation } from "@tanstack/react-query";

import { deleteExam } from "../api/delete-exam";

export const useDeleteExam =
  () => {
    return useMutation({
      mutationFn:
        deleteExam,
    });
  };