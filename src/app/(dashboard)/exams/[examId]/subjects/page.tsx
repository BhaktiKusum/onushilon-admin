import SubjectChapterSelector from "@/features/exams/components/subject-chapter-selector";

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
    <SubjectChapterSelector
      examId={examId}
    />
  );
}