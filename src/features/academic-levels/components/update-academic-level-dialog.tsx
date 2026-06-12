"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import {
  AcademicLevelFormValues,
  academicLevelSchema,
} from "../schemas/academic-level.schema";

import { AcademicLevel } from "../types/academic-level.types";

import { useUpdateAcademicLevel } from "../hooks/use-update-academic-level";

interface Props {
  academicLevel: AcademicLevel;
}

export default function UpdateAcademicLevelDialog({
  academicLevel,
}: Props) {
  const [open, setOpen] =
    useState(false);

  const { mutate, isPending } =
    useUpdateAcademicLevel();

  const form =
    useForm<AcademicLevelFormValues>({
      resolver: zodResolver(
        academicLevelSchema,
      ),

      defaultValues: {
        name: academicLevel.name,
      },
    });

  const handleSubmit = (
    values: AcademicLevelFormValues,
  ) => {
    mutate(
      {
        id: academicLevel.id,
        name: values.name,
      },
      {
        onSuccess: () => {
          setOpen(false);
        },
      },
    );
  };

  return (
    <>
      <DropdownMenuItem
        onSelect={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        Edit
      </DropdownMenuItem>

      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Update Academic
              Level
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={form.handleSubmit(
              handleSubmit,
            )}
            className="space-y-4"
          >
            <Input
              {...form.register(
                "name",
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={
                isPending
              }
            >
              {isPending
                ? "Updating..."
                : "Update"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}