import ExamDetails from "@/features/exams/components/exam-details";

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
    <ExamDetails
      examId={examId}
    />
  );
}