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

import { Chapter } from "../types/chapter.types";

import { useUpdateChapter } from "../hooks/use-update-chapter";

interface Props {
  chapter: Chapter;
}

export default function UpdateChapterDialog({
  chapter,
}: Props) {
  const { mutate, isPending } =
    useUpdateChapter();

  const form = useForm({
    defaultValues: {
      name: chapter.name,
      orderNo:
        chapter.orderNo,
    },
  });

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
            Update Chapter
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(
            (values) =>
              mutate({
                id: chapter.id,
                ...values,
              }),
          )}
          className="space-y-4"
        >
          <Input
            {...form.register(
              "name",
            )}
          />

          <Input
            type="number"
            {...form.register(
              "orderNo",
            )}
          />

          <Button
            type="submit"
            disabled={
              isPending
            }
          >
            Update
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}