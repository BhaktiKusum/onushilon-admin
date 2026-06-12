// src/features/exams/components/subject-chapter-tree.tsx

"use client";

import { Card, CardContent } from "@/components/ui/card";

import { useExam } from "../hooks/use-exam";

interface Props {
  examId: string;
  selectedChapterId?: string;
  onChapterSelect: (chapterId: string) => void;
}

export default function SubjectChapterTree({
  examId,
  selectedChapterId,
  onChapterSelect,
}: Props) {
  const { data: exam, isLoading } = useExam(examId);

  if (isLoading || !exam) {
    return (
      <Card>
        <CardContent className="p-4">Loading...</CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <h2 className="mb-4 text-lg font-semibold">Subjects & Chapters</h2>

        <div className="space-y-6">
          {exam.subjects.map((examSubject) => {
            const subjectChapters = exam.chapters.filter(
              (examChapter) =>
                examChapter.chapter.subjectId === examSubject.subjectId,
            );

            return (
              <div key={examSubject.id}>
                <h3 className="mb-2 font-medium">
                  {examSubject.subject.adminDisplayName}
                </h3>

                <div className="space-y-1 pl-4">
                  {subjectChapters.map((examChapter) => (
                    <button
                      key={examChapter.chapterId}
                      type="button"
                      onClick={() => onChapterSelect(examChapter.chapterId)}
                      className={`block w-full rounded-md px-3 py-2 text-left text-sm transition ${
                        selectedChapterId === examChapter.chapterId
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted"
                      }`}
                    >
                      {examChapter.chapter.name}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}

          {exam.subjects.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No subjects selected for this exam.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
