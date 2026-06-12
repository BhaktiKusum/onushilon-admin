"use client";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
  chapterSchema,
  ChapterFormValues,
} from "../schemas/chapter.schema";

import { useCreateChapter } from "../hooks/use-create-chapter";

interface Props {
  subjectId: string;
}

export default function CreateChapterDialog({
  subjectId,
}: Props) {
  const { mutate, isPending } =
    useCreateChapter();

  const form =
    useForm<ChapterFormValues>({
      resolver: zodResolver(
        chapterSchema,
      ),
    });

  const handleSubmit = (
    values: ChapterFormValues,
  ) => {
    mutate({
      subjectId,
      ...values,
    });

    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Create Chapter
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create Chapter
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(
            handleSubmit,
          )}
          className="space-y-4"
        >
          <Input
            placeholder="Chapter Name"
            {...form.register(
              "name",
            )}
          />

          <Input
            type="number"
            placeholder="Order"
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
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}