"use client";

import Link from "next/link";

import { AcademicLevel } from "../types/academic-level.types";

import AcademicLevelActions from "./academic-level-actions";

interface Props {
  academicLevel: AcademicLevel;
}

export default function AcademicLevelCard({
  academicLevel,
}: Props) {
  return (
    <div className="rounded-xl border bg-card p-5">
  <div className="flex items-start justify-between">
    <Link
      href={`/academic-levels/${academicLevel.id}`}
      className="flex-1"
    >
      <h3 className="font-semibold">
        {academicLevel.name}
      </h3>
    </Link>

    <AcademicLevelActions
      academicLevel={academicLevel}
    />
  </div>
</div>
  );
}