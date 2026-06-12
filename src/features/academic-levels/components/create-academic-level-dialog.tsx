"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import {
  academicLevelSchema,
  AcademicLevelFormValues,
} from "../schemas/academic-level.schema";

import { useCreateAcademicLevel } from "../hooks/use-create-academic-level";

export default function CreateAcademicLevelDialog() {
  const [open, setOpen] = useState(false);

  const { mutate, isPending } =
    useCreateAcademicLevel();

  const form =
    useForm<AcademicLevelFormValues>({
      resolver: zodResolver(
        academicLevelSchema,
      ),
      defaultValues: {
        name: "",
      },
    });

  const handleSubmit = (
    values: AcademicLevelFormValues,
  ) => {
    mutate(values, {
      onSuccess: () => {
        form.reset();
        setOpen(false);
      },
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Level
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create Academic Level
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(
            handleSubmit,
          )}
          className="space-y-4"
        >
          <div>
            <Input
              placeholder="Class 6"
              {...form.register("name")}
            />

            {form.formState.errors
              .name && (
              <p className="mt-1 text-sm text-red-500">
                {
                  form.formState.errors
                    .name.message
                }
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            {isPending
              ? "Creating..."
              : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}