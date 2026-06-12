"use client";

import {
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { AcademicLevel } from "../types/academic-level.types";

import { useDeleteAcademicLevel } from "../hooks/use-delete-academic-level";

interface Props {
  academicLevel: AcademicLevel;
}

export default function DeleteAcademicLevelDialog({
  academicLevel,
}: Props) {
  const { mutate, isPending } =
    useDeleteAcademicLevel();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(e) =>
            e.preventDefault()
          }
          className="text-red-500"
        >
          Delete
        </DropdownMenuItem>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete Academic
            Level?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot
            be undone.

            <br />
            <br />

            <strong>
              {
                academicLevel.name
              }
            </strong>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={
              isPending
            }
            onClick={() =>
              mutate(
                academicLevel.id,
              )
            }
          >
            {isPending
              ? "Deleting..."
              : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}