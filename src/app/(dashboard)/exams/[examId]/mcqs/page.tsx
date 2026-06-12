// src/app/(dashboard)/exams/[examId]/mcqs/page.tsx

import ExamMcqBuilder from "@/features/exams/components/exam-mcq-builder";

interface Props {
  params: Promise<{
    examId: string;
  }>;
}

export default async function Page({
  params,
}: Props) {
  const { examId } =
    await params;

  return (
    <ExamMcqBuilder
      examId={examId}
    />
  );
}