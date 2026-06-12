"use client";

import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ScrollArea } from "@/components/ui/scroll-area";

import { useExamMcqs } from "../hooks/use-exam-mcqs";

import { useDeleteExamMcq } from "../hooks/use-delete-exam-mcq";

interface Props {
  examId: string;
}

export default function SelectedMcqs({ examId }: Props) {
  const { data: examMcqs = [], isLoading } = useExamMcqs(examId);

  const { mutate: deleteExamMcq, isPending } = useDeleteExamMcq();

  const totalMarks = examMcqs.reduce(
    (total, item) => total + Number(item.mark),
    0,
  );

  const handleRemove = (mcqId: string) => {
    deleteExamMcq({
      examId,
      mcqId,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Exam MCQs</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="mb-4 space-y-2 rounded-lg border p-3">
          <div className="flex justify-between">
            <span>Total MCQs</span>

            <span className="font-medium">{examMcqs.length}</span>
          </div>

          <div className="flex justify-between">
            <span>Total Marks</span>

            <span className="font-medium">{totalMarks}</span>
          </div>
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ScrollArea className="h-[600px]">
            <div className="space-y-3">
              {examMcqs.map((examMcq) => (
                <div key={examMcq.id} className="rounded-lg border p-3">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-sm font-medium">
                        {examMcq.mcq.question?.text}
                      </p>

                      <Button
                        size="sm"
                        variant="destructive"
                        disabled={isPending}
                        onClick={() => handleRemove(examMcq.mcqId)}
                      >
                        Remove
                      </Button>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Order: {examMcq.orderNo}</span>

                      <span>Mark: {examMcq.mark}</span>
                    </div>
                  </div>
                </div>
              ))}

              {examMcqs.length === 0 && (
                <div className="py-10 text-center text-sm text-muted-foreground">
                  No MCQs selected
                </div>
              )}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
