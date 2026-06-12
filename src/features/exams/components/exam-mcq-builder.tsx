"use client";

import { useState } from "react";

import SubjectChapterTree from "./subject-chapter-tree";

import AvailableMcqs from "./available-mcqs";

import SelectedMcqs from "./selected-mcqs";

interface Props {
  examId: string;
}

export default function ExamMcqBuilder({ examId }: Props) {
  const [selectedChapterId, setSelectedChapterId] = useState("");

  const [selectedMcqIds, setSelectedMcqIds] = useState<string[]>([]);

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <SubjectChapterTree
        examId={examId}
        selectedChapterId={selectedChapterId}
        onChapterSelect={setSelectedChapterId}
      />

      <AvailableMcqs
        examId={examId}
        chapterId={selectedChapterId}
        selectedMcqIds={selectedMcqIds}
        setSelectedMcqIds={setSelectedMcqIds}
      />

      <SelectedMcqs
        examId={examId}
        selectedMcqIds={selectedMcqIds}
        setSelectedMcqIds={setSelectedMcqIds}
      />
    </div>
  );
}
