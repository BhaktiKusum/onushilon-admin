"use client";

import { useChapters } from "../hooks/use-chapters";

import CreateChapterDialog from "./create-chapter-dialog";

import UpdateChapterDialog from "./update-chapter-dialog";

import DeleteChapterDialog from "./delete-chapter-dialog";

import Link from "next/link";

interface Props {
  subjectId: string;
}

export default function ChapterTable({
  subjectId,
}: Props) {
  const {
    data: chapters = [],
    isLoading,
  } = useChapters(subjectId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Chapters
        </h1>

        <CreateChapterDialog
          subjectId={subjectId}
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
            {chapters.map(
              (chapter) => (
                <tr
                  key={chapter.id}
                  className="border-b"
                >
                  <td className="p-4">
                    

                    <Link
                    href={`/chapters/${chapter.id}/topics`}
                    className="rounded-lg border p-4 hover:bg-muted"
                    >
                        {chapter.name}
                    </Link>
                  </td>

                  <td className="p-4">
                    {
                      chapter.orderNo
                    }
                  </td>

                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <UpdateChapterDialog
                        chapter={
                          chapter
                        }
                      />

                      <DeleteChapterDialog
                        chapterId={
                          chapter.id
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