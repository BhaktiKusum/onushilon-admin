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

import { Topic } from "../types/topic.types";

import { useUpdateTopic } from "../hooks/use-update-topic";

interface Props {
  topic: Topic;
}

export default function UpdateTopicDialog({
  topic,
}: Props) {
  const { mutate, isPending } =
    useUpdateTopic();

  const form = useForm({
    defaultValues: {
      name: topic.name,
      orderNo:
        topic.orderNo,
    },
  });

  const handleSubmit = (
    values: {
      name: string;
      orderNo: number;
    },
  ) => {
    mutate({
      id: topic.id,
      name: values.name,
      orderNo:
        Number(
          values.orderNo,
        ),
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
            Update Topic
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