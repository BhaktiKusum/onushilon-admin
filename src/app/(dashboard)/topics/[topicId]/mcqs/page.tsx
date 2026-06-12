import McqTable from "@/features/mcqs/components/mcq-table";

interface Props {
  params: Promise<{
    topicId: string;
  }>;
}

export default async function Page({
  params,
}: Props) {
  const { topicId } =
    await params;

  return (
    <McqTable
      topicId={topicId}
    />
  );
}