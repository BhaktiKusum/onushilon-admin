"use client";

import { useTopics } from "../hooks/use-topics";

import CreateTopicDialog from "./create-topic-dialog";

import UpdateTopicDialog from "./update-topic-dialog";

import DeleteTopicDialog from "./delete-topic-dialog";
import Link from "next/link";

interface Props {
  chapterId: string;
}

export default function TopicTable({
  chapterId,
}: Props) {
  const {
    data: topics = [],
    isLoading,
  } = useTopics(chapterId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Topics
        </h1>

        <CreateTopicDialog
          chapterId={chapterId}
        />
      </div>

      <div className="rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Order
              </th>

              <th className="p-4 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {topics.map(
              (topic) => (
                <tr
                  key={topic.id}
                  className="border-b"
                >
                  <td className="p-4">
                    
                    <Link
                        href={`/topics/${topic.id}/mcqs`}
                        className="font-medium hover:underline"
                        >
                        {topic.name}
                        </Link>
                  </td>

                  <td className="p-4">
                    {topic.orderNo}
                  </td>

                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <UpdateTopicDialog
                        topic={topic}
                      />

                      <DeleteTopicDialog
                        topicId={
                          topic.id
                        }
                      />
                    </div>
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}