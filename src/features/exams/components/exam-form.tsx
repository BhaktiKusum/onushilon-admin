"use client";

import { Controller, UseFormReturn } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAcademicLevels } from "@/features/academic-levels/hooks/use-academic-levels";

import { CreateExamFormValues } from "../schemas/create-exam.schema";

interface Props {
  form: UseFormReturn<CreateExamFormValues>;

  onSubmit: (values: CreateExamFormValues) => void;

  isPending: boolean;

  title: string;

  submitLabel: string;
}

export default function ExamForm({
  form,
  onSubmit,
  isPending,
  title,
  submitLabel,
}: Props) {
  const { data: academicLevels = [], isLoading: academicLevelsLoading } =
    useAcademicLevels();

  if (academicLevelsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="max-w-5xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Info */}

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Exam Title</Label>

              <Input {...form.register("title")} placeholder="SSC Model Test" />
            </div>

            <div>
              <Label>Academic Level</Label>

              <Controller
                control={form.control}
                name="academicLevelId"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Academic Level" />
                    </SelectTrigger>

                    <SelectContent>
                      {academicLevels.map((level) => (
                        <SelectItem key={level.id} value={level.id}>
                          {level.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <div>
            <Label>Description</Label>

            <Textarea rows={4} {...form.register("description")} />
          </div>

          {/* Exam Settings */}

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Exam Type</Label>

              <Controller
                control={form.control}
                name="type"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Exam Type" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="LIVE">Live</SelectItem>

                      <SelectItem value="PRACTICE">Practice</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div>
              <Label>Enrollment Type</Label>

              <Controller
                control={form.control}
                name="enrollmentType"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Enrollment Type" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="OPEN">Open</SelectItem>

                      <SelectItem value="PRIVATE">Private</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* Date & Time */}

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label>Start Time</Label>

              <Input type="datetime-local" {...form.register("startAt")} />
            </div>

            <div>
              <Label>End Time</Label>

              <Input type="datetime-local" {...form.register("endAt")} />
            </div>
          </div>

          {/* Marks */}

          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <Label>Duration (Min)</Label>

              <Input type="number" {...form.register("durationMinutes")} />
            </div>

            <div>
              <Label>Total Marks</Label>

              <Input type="number" {...form.register("totalMarks")} />
            </div>

            <div>
              <Label>Negative Marks</Label>

              <Input
                type="number"
                step="0.25"
                {...form.register("negativeMarks")}
              />
            </div>

            <div>
              <Label>Max Participants</Label>

              <Input type="number" {...form.register("maxParticipants")} />
            </div>
          </div>

          {/* Order */}

          <div className="w-full md:w-1/4">
            <Label>Order No</Label>

            <Input type="number" {...form.register("orderNo")} />
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : submitLabel}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
