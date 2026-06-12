"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { useMcqs } from "../hooks/use-mcqs";

import McqHandsontable from "./mcq-handsontable";

interface Props {
  topicId: string;
}

export default function McqBulkEditor({ topicId }: Props) {
  const { data: mcqs = [], isLoading } = useMcqs({
    topicId,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Bulk Edit MCQs</h1>

        <Link href={`/topics/${topicId}/mcqs`}>
          <Button variant="outline">Back</Button>
        </Link>
      </div>

      <McqHandsontable mcqs={mcqs} />
    </div>
  );
}
