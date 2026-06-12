"use client";

import { useState } from "react";

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

import { useAcademicLevels } from "@/features/academic-levels/hooks/use-academic-levels";

import {
  subjectAssignmentSchema,
  SubjectAssignmentFormValues,
} from "../schemas/subject-assignment.schema";

import { useCreateSubjectAssignment } from "../hooks/use-create-subject-assignment";

export default function CreateSubjectAssignmentDialog() {
  const [open, setOpen] =
    useState(false);

  const { data: academicLevels = [] } =
    useAcademicLevels();

  const { mutate, isPending } =
    useCreateSubjectAssignment();

  const form =
    useForm<SubjectAssignmentFormValues>({
      resolver: zodResolver(
        subjectAssignmentSchema,
      ),

      defaultValues: {
        name: "",
        adminDisplayName: "",
        academicLevelIds: [],
      },
    });

  const selectedAcademicLevels =
    form.watch(
      "academicLevelIds",
    );

  const handleSubmit = (
    values: SubjectAssignmentFormValues,
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
          Create & Assign Subject
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Create & Assign Subject
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(
            handleSubmit,
          )}
          className="space-y-4"
        >
          <Input
            placeholder="Bangla"
            {...form.register("name")}
          />

          <Input
            placeholder="SSC Bangla"
            {...form.register(
              "adminDisplayName",
            )}
          />

          <div>
            <p className="mb-2 text-sm font-medium">
              Academic Levels
            </p>

            <div className="space-y-2">
              {academicLevels.map(
                (level) => (
                  <label
                    key={level.id}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAcademicLevels.includes(
                        level.id,
                      )}
                      onChange={(
                        event,
                      ) => {
                        const current =
                          form.getValues(
                            "academicLevelIds",
                          );

                        if (
                          event.target
                            .checked
                        ) {
                          form.setValue(
                            "academicLevelIds",
                            [
                              ...current,
                              level.id,
                            ],
                          );
                        } else {
                          form.setValue(
                            "academicLevelIds",
                            current.filter(
                              (
                                id,
                              ) =>
                                id !==
                                level.id,
                            ),
                          );
                        }
                      }}
                    />

                    {level.name}
                  </label>
                ),
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={
              isPending
            }
          >
            {isPending
              ? "Creating..."
              : "Create & Assign"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}