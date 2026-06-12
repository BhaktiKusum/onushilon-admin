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
  topicSchema,
  TopicFormValues,
} from "../schemas/topic.schema";

import { useCreateTopic } from "../hooks/use-create-topic";

interface Props {
  chapterId: string;
}

export default function CreateTopicDialog({
  chapterId,
}: Props) {
  const { mutate, isPending } =
    useCreateTopic();

  const form =
    useForm<TopicFormValues>({
      resolver: zodResolver(
        topicSchema,
      ),
    });

  const handleSubmit = (
    values: TopicFormValues,
  ) => {
    mutate({
      chapterId,
      ...values,
    });

    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Create Topic
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Create Topic
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(
            handleSubmit,
          )}
          className="space-y-4"
        >
          <Input
            placeholder="Topic Name"
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