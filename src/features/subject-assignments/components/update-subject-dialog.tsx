"use client";

import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { useUpdateSubject } from "../hooks/use-update-subject";

interface Props {
  subjectId: string;
  subjectName: string;
  adminDisplayName: string;
}

export default function UpdateSubjectDialog({
  subjectId,
  subjectName,
  adminDisplayName,
}: Props) {
  const { mutate, isPending } =
    useUpdateSubject();

  const form = useForm({
    defaultValues: {
      name: subjectName,
      adminDisplayName,
    },
  });

  const handleSubmit = (
    values: {
      name: string;
      adminDisplayName: string;
    },
  ) => {
    mutate({
      id: subjectId,
      ...values,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
        >
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Update Subject
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(
            handleSubmit,
          )}
          className="space-y-4"
        >
          <Input
            {...form.register("name")}
          />

          <Input
            {...form.register(
              "adminDisplayName",
            )}
          />

          <Button
            type="submit"
            disabled={isPending}
          >
            Update
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}