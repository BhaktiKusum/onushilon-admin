import TopicTable from "@/features/topics/components/topic-table";

interface Props {
  params: Promise<{
    chapterId: string;
  }>;
}

export default async function TopicsPage({
  params,
}: Props) {
  const { chapterId } =
    await params;

  return (
    <TopicTable
      chapterId={chapterId}
    />
  );
}