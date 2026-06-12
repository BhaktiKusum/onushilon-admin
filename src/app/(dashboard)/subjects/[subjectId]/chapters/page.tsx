import ChapterTable from "@/features/chapters/components/chapter-table";

interface Props {
  params: Promise<{
    subjectId: string;
  }>;
}

export default async function ChaptersPage({
  params,
}: Props) {
  const { subjectId } =
    await params;

  return (
    <ChapterTable
      subjectId={subjectId}
    />
  );
}