import McqBulkEditor from "@/features/mcqs/components/mcq-bulk-editor";

interface Props {
  params: Promise<{
    topicId: string;
  }>;
}

export default async function BulkEditPage({
  params,
}: Props) {
  const { topicId } =
    await params;

  return (
    <McqBulkEditor
      topicId={topicId}
    />
  );
}