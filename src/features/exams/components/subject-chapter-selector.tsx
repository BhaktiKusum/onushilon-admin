"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { Checkbox } from "@/components/ui/checkbox";

import { ScrollArea } from "@/components/ui/scroll-area";

import { Card, CardContent } from "@/components/ui/card";

import { useExam } from "../hooks/use-exam";

import { useAcademicLevelSubjects } from "@/features/subject-assignments/hooks/use-academic-level-subjects";

import { useChapters } from "@/features/chapters/hooks/use-chapters";

import { useAddExamSubjects } from "../hooks/use-add-exam-subjects";

import { useAddExamChapters } from "../hooks/use-add-exam-chapters";

import { useEffect } from "react";

interface Props {
  examId: string;
}

export default function SubjectChapterSelector({ examId }: Props) {
  const router = useRouter();

  const { data: exam, isLoading } = useExam(examId);

  console.log("Exam:", exam);

  useEffect(() => {
    if (!exam) {
      return;
    }

    setSelectedSubjects(exam.subjects.map((item) => item.subjectId));

    setSelectedChapters(exam.chapters.map((item) => item.chapterId));
  }, [exam]);

  const { data: subjectAssignments = [], isLoading: subjectsLoading } =
    useAcademicLevelSubjects(exam?.academicLevelId);

  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const [selectedChapters, setSelectedChapters] = useState<string[]>([]);

  const { mutateAsync: addSubjects } = useAddExamSubjects();

  const { mutateAsync: addChapters } = useAddExamChapters();

  const handleSave = async () => {
    try {
      await addSubjects({
        examId,
        subjectIds: selectedSubjects,
      });

      await addChapters({
        examId,
        chapterIds: selectedChapters,
      });

      router.push(`/exams/${examId}/mcqs`);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleSubject = (subjectId: string) => {
    setSelectedSubjects((previous) =>
      previous.includes(subjectId)
        ? previous.filter((id) => id !== subjectId)
        : [...previous, subjectId],
    );
  };

  const toggleChapter = (chapterId: string) => {
    setSelectedChapters((previous) =>
      previous.includes(chapterId)
        ? previous.filter((id) => id !== chapterId)
        : [...previous, chapterId],
    );
  };

  if (isLoading || subjectsLoading || !exam) {
    return <div>Loading...</div>;
  }

  console.log("Subjects:", subjectAssignments);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Subject & Chapter Selection</h1>

        <p className="text-muted-foreground">{exam.title}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* SUBJECTS */}

        <Card>
          <CardContent className="p-4">
            <h2 className="mb-4 text-lg font-semibold">Subjects</h2>

            <ScrollArea className="h-[450px]">
              <div className="space-y-3">
                {subjectAssignments.map((assignment) => {
                  if (!assignment.subject) {
                    return null;
                  }

                  return (
                    <div
                      key={assignment.subject.id}
                      className="flex items-center gap-3"
                    >
                      <Checkbox
                        checked={selectedSubjects.includes(
                          assignment.subject.id,
                        )}
                        onCheckedChange={() =>
                          toggleSubject(assignment.subject.id)
                        }
                      />

                      <span>{assignment.subject.adminDisplayName}</span>
                    </div>
                  );
                })}

                {subjectAssignments.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No subjects found for this academic level.
                  </p>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* CHAPTERS */}

        <Card>
          <CardContent className="p-4">
            <h2 className="mb-4 text-lg font-semibold">Chapters</h2>

            <ScrollArea className="h-[450px]">
              <div className="space-y-6">
                {selectedSubjects.map((subjectId) => (
                  <SubjectChapterGroup
                    key={subjectId}
                    subjectId={subjectId}
                    selectedChapters={selectedChapters}
                    onToggle={toggleChapter}
                  />
                ))}

                {selectedSubjects.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    Select a subject first
                  </p>
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button
          disabled={
            selectedSubjects.length === 0 || selectedChapters.length === 0
          }
          onClick={handleSave}
        >
          Save & Continue
        </Button>
      </div>
    </div>
  );
}

interface SubjectChapterGroupProps {
  subjectId: string;

  selectedChapters: string[];

  onToggle: (chapterId: string) => void;
}

function SubjectChapterGroup({
  subjectId,
  selectedChapters,
  onToggle,
}: SubjectChapterGroupProps) {
  const { data: chapters = [] } = useChapters(subjectId);

  return (
    <div className="space-y-3">
      <h3 className="font-medium">Chapters</h3>

      {chapters.map((chapter) => (
        <div key={chapter.id} className="flex items-center gap-3">
          <Checkbox
            checked={selectedChapters.includes(chapter.id)}
            onCheckedChange={() => onToggle(chapter.id)}
          />

          <span>{chapter.name}</span>
        </div>
      ))}
    </div>
  );
}
