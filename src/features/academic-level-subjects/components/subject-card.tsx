"use client";

import Link from "next/link";

import { AcademicLevelSubject } from "../types/academic-level-subject.types";

interface Props {
  item: AcademicLevelSubject;
}

export default function SubjectCard(
  {item,}: Props) {
  return (
    <Link
      href={`/subjects/${item.subject.id}/chapters`}
      className="rounded-lg border p-4 hover:bg-muted"
    >
      <h3 className="font-semibold">
        {item.subject.name}
      </h3>

      <p className="text-sm text-muted-foreground">
        {
          item.subject
            .adminDisplayName
        }
      </p>
    </Link>
  );
}