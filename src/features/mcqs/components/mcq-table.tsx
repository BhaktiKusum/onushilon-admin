"use client";

import { useMcqs } from "../hooks/use-mcqs";

import CreateMcqDialog from "./create-mcq-dialog";

import UpdateMcqDialog from "./update-mcq-dialog";

import DeleteMcqDialog from "./delete-mcq-dialog";

import ViewMcqDialog from "./view-mcq-dialog";

import { useMemo } from "react";

import { useState } from "react";

import McqFilters from "./mcq-filters";
import { useTopic } from "../hooks/use-topic";

import McqHandsontable from "./mcq-handsontable";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import ChangeMcqLocationDialog from "./change-mcq-location-dialog";
import ImportMcqDialog from "./import-mcq-dialog";
import LatexText from "@/components/common/latex-text"

interface Props {
  topicId: string;
}

export default function McqTable({
  topicId,
}: Props) {

    const [search, setSearch] =
  useState("");
  const {
    data: mcqs = [],
    isLoading,
  } = useMcqs({
  topicId,
});

//  const topicMcqs =
//   mcqs.filter(
//     (mcq) =>
//         mcq.topicId === topicId,
//   );

const topicMcqs = mcqs

    

    const filteredMcqs =
  useMemo(() => {
    return topicMcqs.filter(
      (mcq) =>
        mcq.question.text
          ?.toLowerCase()
          .includes(
            search.toLowerCase(),
          ),
    );
  }, [
    topicMcqs,
    search,
  ]);

  const {
  data: topic,
} = useTopic(topicId);

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          MCQs
        </h1>


<div className="flex gap-2">
  <Link href={`/topics/${topicId}/mcqs/bulk-edit`} >
    <Button variant="outline" >
      Bulk Edit
      </Button>
    </Link>

    <div className="flex gap-2">
        <CreateMcqDialog
          topicId={topicId}
          chapterId={topic?.chapterId ??""}
          subjectId={topic?.chapter?.subjectId ?? ""}
          />
          <ImportMcqDialog
          subjectId={topic?.chapter?.subjectId ?? ""}
          chapterId={topic?.chapterId ??""}
          topicId={topicId}
          />
        
      </div>
    
</div>

        
      </div>

      <McqFilters
        search={search}
        onSearchChange={setSearch}
      />



      <div className="space-y-4">
        {filteredMcqs.map(
          (mcq) => (
            <div
              key={mcq.id}
              className="rounded-lg border p-4"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium">
                    <LatexText 
                      text={
                      mcq.question.text
                    }
                    />
                  </p>
                  <div>
                    
                    {mcq.question?.image && (
  <img
    src={mcq.question.image}
    alt="Question"
    className="mt-3 max-h-60 rounded-lg border"
  />
)} </div>

                  <p className="mt-2 text-xs text-muted-foreground">
                    Difficulty:
                    {" "}
                    {
                      mcq.difficulty
                    }
                  </p>
                </div>

                <div className="flex gap-2">
                  <UpdateMcqDialog
                    mcq={mcq}
                  />

                  <DeleteMcqDialog
                    mcqId={
                      mcq.id
                    }
                  />

                  <ViewMcqDialog
                    mcq={mcq}
                  />

                  <ChangeMcqLocationDialog
                    mcqId={mcq.id}
                    subjectId={mcq.subjectId}
                    chapterId={mcq.chapterId}
                    topicId={mcq.topicId}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                {mcq.options.map(
                  (
                    option,
                  ) => (
                    <div
                      key={
                        option.key
                      }
                      className={`rounded border p-2 ${
                        option.key ===
                        mcq.correctOptionKey
                          ? "border-green-500"
                          : ""
                      }`}
                    >
                      <strong>
                        {
                          option.key
                        }
                        .
                      </strong>{" "}
                      <LatexText 
                            text={
                        option.text
                      } />

                      {option.image && (
                        <img
                          src={option.image}
                          alt={option.key}
                          className="mt-2 max-h-40 rounded border"
                        />
                      )}
                    </div>
                  ),
                )}
              </div>

              {mcq.explanation && (
  <div className="mt-4 rounded bg-muted p-3">
    <strong>
      Explanation:
    </strong>

    {mcq.explanation.text && (
      <p>
        <LatexText 
            text={mcq.explanation.text} 
            />
      </p>
    )}

    {mcq.explanation.image && (
      <img
        src={
          mcq.explanation.image
        }
        alt="Explanation"
        className="mt-3 max-h-60 rounded border"
      />
    )}
  </div>
)}
            </div>
          ),
        )}
      </div>
    </div>
  );
}