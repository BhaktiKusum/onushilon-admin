"use client";

import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { AcademicLevel } from "../types/academic-level.types";

import UpdateAcademicLevelDialog from "./update-academic-level-dialog";

import DeleteAcademicLevelDialog from "./delete-academic-level-dialog";

interface Props {
  academicLevel: AcademicLevel;
}

export default function AcademicLevelActions({
  academicLevel,
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <UpdateAcademicLevelDialog
          academicLevel={academicLevel}
        />

        <DeleteAcademicLevelDialog
          academicLevel={academicLevel}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}