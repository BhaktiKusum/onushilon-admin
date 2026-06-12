"use client";

import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";

import { uploadImage } from "../api/upload-image";

export const useUploadImage =
  () => {
    return useMutation({
      mutationFn:
        uploadImage,

      onError: () => {
        toast.error(
          "Failed to upload image",
        );
      },
    });
  };