"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { Exam } from "../types/exam.types";

interface Props {
  exam: Exam;
}

export default function ExamCard({ exam }: Props) {
  if (!exam) {
    return null;
  }

  console.log(exam);
  return (
    <div className="rounded-lg border p-4">
      <div className="space-y-2">
        <h3 className="font-semibold">{exam.title}</h3>

        <p className="text-sm text-muted-foreground">{exam.description}</p>

        <div className="flex gap-4 text-sm">
          <span>{exam.type}</span>

          <span>{exam.durationMinutes} min</span>

          <span>{exam.totalMarks} marks</span>
        </div>

        <div className="flex gap-2">
          <Link href={`/exams/${exam.id}`}>
            <Button size="sm">Manage</Button>
          </Link>

          <Link href={`/exams/${exam.id}/subjects`}>
            <Button size="sm" variant="outline">
              Subjects
            </Button>
          </Link>

          <Link href={`/exams/${exam.id}/mcqs`}>
            <Button size="sm" variant="outline">
              MCQs
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
