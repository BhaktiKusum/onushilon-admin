"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  loginSchema,
  LoginFormValues,
} from "../schemas/login.schema";

import { useLogin } from "../hooks/use-login";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

export default function LoginForm() {
  const { mutate, isPending } =
    useLogin();

  const form =
    useForm<LoginFormValues>({
      resolver:
        zodResolver(loginSchema),

      defaultValues: {
        phone: "",
        password: "",
      },
    });

  const handleSubmit = (
    values: LoginFormValues,
  ) => {
    mutate(values);
  };

  return (
    <form
      onSubmit={form.handleSubmit(
        handleSubmit,
      )}
      className="space-y-4"
    >
      <Input
        placeholder="Phone"
        {...form.register("phone")}
      />

      <Input
        type="password"
        placeholder="Password"
        {...form.register(
          "password",
        )}
      />

      <Button
        type="submit"
        className="w-full"
        disabled={isPending}
      >
        {isPending
          ? "Logging..."
          : "Login"}
      </Button>
    </form>
  );
}