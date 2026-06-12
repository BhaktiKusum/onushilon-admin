"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

import { useUpdateMcq } from "../hooks/use-update-mcq";

import { useTopics } from "@/features/topics/hooks/use-topics";

import { useChapters } from "@/features/chapters/hooks/use-chapters";

interface Props {
  mcqId: string;
  chapterId: string;
  topicId: string;
  subjectId: string;
}

export default function ChangeMcqLocationDialog({
  mcqId,
  chapterId,
  topicId,
  subjectId,
}: Props) {
  const [open, setOpen] = useState(false);

  const { data: chapters = [] } = useChapters(subjectId);

  const [selectedChapterId, setSelectedChapterId] = useState(chapterId);

  const [selectedTopicId, setSelectedTopicId] = useState(topicId);

  const { mutate, isPending } = useUpdateMcq();

  const { data: topics = [] } = useTopics(selectedChapterId);

  const handleSave = () => {
    mutate(
      {
        id: mcqId,

        data: {
          chapterId: selectedChapterId,

          topicId: selectedTopicId,
        },
      },
      {
        onSuccess: () => {
          setOpen(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Location
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change MCQ Location</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Select
            value={selectedChapterId}
            onValueChange={(value) => {
              setSelectedChapterId(value);

              setSelectedTopicId("");
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Chapter" />
            </SelectTrigger>

            <SelectContent>
              {chapters.map((chapter) => (
                <SelectItem key={chapter.id} value={chapter.id}>
                  {chapter.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedTopicId} onValueChange={setSelectedTopicId}>
            <SelectTrigger>
              <SelectValue placeholder="Select Topic" />
            </SelectTrigger>

            <SelectContent>
              {topics.map((topic) => (
                <SelectItem key={topic.id} value={topic.id}>
                  {topic.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            className="w-full"
            onClick={handleSave}
            disabled={isPending || !selectedTopicId}
          >
            {isPending ? "Updating..." : "Update Location"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
