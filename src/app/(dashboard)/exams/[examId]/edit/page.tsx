// src/app/(dashboard)/exams/[examId]/edit/page.tsx

import EditExamForm from "@/features/exams/components/edit-exam-form";

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
    <EditExamForm
      examId={examId}
    />
  );
}