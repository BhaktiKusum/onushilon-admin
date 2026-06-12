"use client";

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ScrollArea } from "@/components/ui/scroll-area";

import { useMcqs } from "@/features/mcqs/hooks/use-mcqs";

import { useAddExamMcqs } from "../hooks/use-add-exam-mcqs";

import { useExamMcqs } from "../hooks/use-exam-mcqs";

interface Props {
  examId: string;

  chapterId: string;
}

export default function AvailableMcqs({ examId, chapterId }: Props) {
  const { data: mcqs = [], isLoading } = useMcqs({
    chapterId,
  });

  const { data: examMcqs = [] } = useExamMcqs(examId);

  const addedMcqIds = new Set(examMcqs.map((item) => item.mcqId));

  const { mutate: addExamMcqs, isPending } = useAddExamMcqs();

  const handleAddMcq = (mcqId: string) => {
    addExamMcqs({
      examId,
      mcqIds: [mcqId],
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available MCQs</CardTitle>
      </CardHeader>

      <CardContent>
        {!chapterId && (
          <div className="flex h-[600px] items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Select a chapter first
            </p>
          </div>
        )}

        {chapterId && isLoading && (
          <div className="flex h-[600px] items-center justify-center">
            <p>Loading...</p>
          </div>
        )}

        {chapterId && !isLoading && (
          <ScrollArea className="h-[600px]">
            <div className="space-y-3">
              {mcqs.map((mcq) => {
                // 1. Convert to a block body using curly braces {}
                // 2. Define your variable here
                const isAdded = addedMcqIds.has(mcq.id);

                // 3. Explicitly return the JSX
                return (
                  <div key={mcq.id} className="rounded-lg border p-3">
                    <div className="space-y-3">
                      <p className="text-sm font-medium">
                        {mcq.question?.text}
                      </p>

                      {mcq.scenario?.text && (
                        <p className="text-xs text-muted-foreground">
                          {mcq.scenario.text}
                        </p>
                      )}

                      <div className="space-y-1 text-xs">
                        {mcq.options.map((option) => (
                          <div key={option.key}>
                            <span className="font-medium">{option.key}.</span>{" "}
                            {option.text}
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {mcq.difficulty}
                        </span>

                        <Button
                          size="sm"
                          disabled={isPending || isAdded}
                          variant={isAdded ? "secondary" : "default"}
                          onClick={() => handleAddMcq(mcq.id)}
                        >
                          {isAdded ? "Added" : "Add"}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {mcqs.length === 0 && (
                <div className="py-10 text-center">
                  <p className="text-sm text-muted-foreground">
                    No MCQs found in this chapter
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
