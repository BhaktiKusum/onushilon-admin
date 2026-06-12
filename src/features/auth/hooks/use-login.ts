"use client";

import { useMutation } from "@tanstack/react-query";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { login } from "../api/login";

import { authUtils } from "@/lib/auth";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      authUtils.setToken(
        data.accessToken,
      );

      toast.success(
        "Login successful",
      );

      router.push("/dashboard");
    },

    onError: () => {
      toast.error(
        "Invalid phone or password",
      );
    },
  });
};