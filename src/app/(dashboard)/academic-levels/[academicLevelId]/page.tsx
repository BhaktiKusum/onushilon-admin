import AcademicLevelSubjectsPage from "@/features/academic-level-subjects/components/academic-level-subjects-page";

interface Props {
  params: Promise<{
    academicLevelId: string;
  }>;
}

export default async function Page({
  params,
}: Props) {
  const { academicLevelId } =
    await params;

  return (
    <AcademicLevelSubjectsPage
      academicLevelId={
        academicLevelId
      }
    />
  );
}