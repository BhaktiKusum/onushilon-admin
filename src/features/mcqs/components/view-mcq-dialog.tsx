"use client";

import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import { Mcq } from "../types/mcq.types";

interface Props {
  mcq: Mcq;
}

export default function ViewMcqDialog({
  mcq,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="secondary"
        >
          View
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            MCQ Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex gap-2">
            <Badge>
              {mcq.difficulty}
            </Badge>

            <Badge
              variant="outline"
            >
              {
                mcq.options
                  .length
              }{" "}
              Options
            </Badge>
          </div>

          {mcq.scenario && (
            <section className="rounded-lg border p-4">
              <h3 className="mb-3 font-semibold">
                Scenario
              </h3>

              {mcq.scenario.text && (
                <p>
                  {
                    mcq
                      .scenario
                      .text
                  }
                </p>
              )}

              {mcq.scenario
                .image && (
                <Image
                  src={
                    mcq
                      .scenario
                      .image
                  }
                  alt="Scenario"
                  width={
                    800
                  }
                  height={
                    400
                  }
                  className="mt-4 rounded-lg border"
                />
              )}
            </section>
          )}

          <section className="rounded-lg border p-4">
            <h3 className="mb-3 font-semibold">
              Question
            </h3>

            {mcq.question
              .text && (
              <p>
                {
                  mcq
                    .question
                    .text
                }
              </p>
            )}

            {mcq.question
              .image && (
              <Image
                src={
                  mcq
                    .question
                    .image
                }
                alt="Question"
                width={
                  800
                }
                height={
                  400
                }
                className="mt-4 rounded-lg border"
              />
            )}
          </section>

          <section className="rounded-lg border p-4">
            <h3 className="mb-3 font-semibold">
              Options
            </h3>

            <div className="space-y-3">
              {mcq.options.map(
                (
                  option,
                ) => (
                  <div
                    key={
                      option.key
                    }
                    className={`rounded-lg border p-3 ${
                      option.key ===
                      mcq.correctOptionKey
                        ? "border-green-500"
                        : ""
                    }`}
                  >
                    <div className="mb-2 font-medium">
                      {
                        option.key
                      }
                    </div>

                    {option.text && (
                      <p>
                        {
                          option.text
                        }
                      </p>
                    )}

                    {option.image && (
                      <Image
                        src={
                          option.image
                        }
                        alt={
                          option.key
                        }
                        width={
                          600
                        }
                        height={
                          300
                        }
                        className="mt-3 rounded border"
                      />
                    )}
                  </div>
                ),
              )}
            </div>
          </section>

          {mcq.explanation && (
            <section className="rounded-lg border p-4">
              <h3 className="mb-3 font-semibold">
                Explanation
              </h3>

              {mcq
                .explanation
                .text && (
                <p>
                  {
                    mcq
                      .explanation
                      .text
                  }
                </p>
              )}

              {mcq
                .explanation
                .image && (
                <Image
                  src={
                    mcq
                      .explanation
                      .image
                  }
                  alt="Explanation"
                  width={
                    800
                  }
                  height={
                    400
                  }
                  className="mt-4 rounded border"
                />
              )}
            </section>
          )}

          {mcq.references
            ?.length >
            0 && (
            <section className="rounded-lg border p-4">
              <h3 className="mb-3 font-semibold">
                References
              </h3>

              <div className="space-y-2">
                {mcq.references.map(
                  (
                    reference,
                    index,
                  ) => (
                    <div
                      key={
                        index
                      }
                      className="rounded border p-3"
                    >
                      <div className="font-medium">
                        {
                          reference.type
                        }
                      </div>

                      <div className="text-sm text-muted-foreground">
                        {
                          reference.value
                        }
                      </div>
                    </div>
                  ),
                )}
              </div>
            </section>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}