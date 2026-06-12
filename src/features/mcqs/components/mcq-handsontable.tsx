"use client";

import { HotTable } from "@handsontable/react";

import "handsontable/styles/handsontable.min.css";
import "handsontable/styles/ht-theme-main.min.css";

import { useUpdateMcq } from "../hooks/use-update-mcq";

import { Mcq } from "../types/mcq.types";

import McqSaveStatus from "./mcq-save-status";

import { useMemo, useState } from "react";

import McqColumnSelector, { McqColumn } from "./mcq-column-selector";

import { registerAllModules } from "handsontable/registry";

import { useChapters } from "@/features/chapters/hooks/use-chapters";
import { useTopics } from "@/features/topics/hooks/use-topics";

registerAllModules();

interface Props {
  mcqs: Mcq[];
}

export default function McqHandsontable({ mcqs }: Props) {
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");

  const { mutate } = useUpdateMcq();

  const [selectedChapterId, setSelectedChapterId] = useState<string>(
    mcqs[0].chapterId,
  );

  const [pendingLocation, setPendingLocation] = useState<String>("");

  const [columns, setColumns] = useState<McqColumn[]>([
    { key: "chapterId", label: "Chapter", visible: true },
    { key: "topicId", label: "Topic", visible: true },
    { key: "question", label: "Question", visible: true },
    { key: "scenario", label: "Scenario", visible: false },
    { key: "optionA", label: "Option A", visible: true },
    { key: "optionB", label: "Option B", visible: true },
    { key: "optionC", label: "Option C", visible: true },
    { key: "optionD", label: "Option D", visible: true },
    { key: "optionE", label: "Option E", visible: false },
    { key: "correctOptionKey", label: "Correct Answer", visible: true },
    { key: "difficulty", label: "Difficulty", visible: true },
    { key: "isActive", label: "Active", visible: true },
    { key: "isPremium", label: "Premium", visible: false },
    { key: "explanation", label: "Explanation", visible: false },
  ]);

  console.log(mcqs[0]?.subjectId);

  const { data: chapters = [] } = useChapters(mcqs[0]?.subjectId);

  console.log("Chapters:", chapters);

  const { data: topics = [] } = useTopics(selectedChapterId);

  const toggleColumn = (key: string) => {
    setColumns((previous) =>
      previous.map((column) =>
        column.key === key
          ? {
              ...column,
              visible: !column.visible,
            }
          : column,
      ),
    );
  };

  const visibleColumns = columns.filter((column) => column.visible);

  const data = useMemo(() => {
    return mcqs.map((mcq) => ({
      id: mcq.id,
      chapterName: mcq.chapter?.name ?? "",
      topicId: mcq.topicId,
      chapterId: mcq.chapterId,
      topicName: mcq.topic?.name ?? "",
      question: mcq.question?.text ?? "",
      scenario: mcq.scenario?.text ?? "",
      explanation: mcq.explanation?.text ?? "",
      optionA: mcq.options.find((option) => option.key === "A")?.text ?? "",
      optionB: mcq.options.find((option) => option.key === "B")?.text ?? "",
      optionC: mcq.options.find((option) => option.key === "C")?.text ?? "",
      optionD: mcq.options.find((option) => option.key === "D")?.text ?? "",
      optionE: mcq.options.find((option) => option.key === "E")?.text ?? "",
      correctOptionKey: mcq.correctOptionKey,
      difficulty: mcq.difficulty,
      isActive: mcq.isActive,
      isPremium: mcq.isPremium,
    }));
  }, [mcqs]);

  const handleSave = (row: number, property: string, value: unknown) => {
    const mcq = mcqs[row];

    if (!mcq) {
      return;
    }

    let payload: Record<string, unknown> = {};

    if (property === "chapterName") {
      return;
    }

    console.log("Saving change:", {
      id: mcq.id,
      property,
      value,
    });
    switch (property) {
      case "location":
        payload = {
          chapterId: String(value.chapterId),
          topicId: String(value.topicId),
        };
        break;

      case "question":
        payload = {
          question: { ...mcq.question, text: String(value) },
        };
        break;

      case "scenario":
        payload = {
          scenario: { ...mcq.scenario, text: String(value) },
        };
        break;

      case "explanation":
        payload = {
          explanation: { ...mcq.explanation, text: String(value) },
        };
        break;

      case "optionA":
      case "optionB":
      case "optionC":
      case "optionD":
      case "optionE": {
        const key = property.replace("option", "");

        payload = {
          options: mcq.options.map((option) =>
            option.key === key
              ? {
                  ...option,
                  text: String(value),
                }
              : option,
          ),
          correctOptionKey: mcq.correctOptionKey,
        };
        break;
      }

      case "correctOptionKey":
        payload = {
          correctOptionKey: String(value),
        };
        break;

      case "difficulty":
        payload = {
          difficulty: String(value),
        };
        break;

      case "isActive":
        payload = {
          isActive: Boolean(value),
        };
        break;

      case "isPremium":
        payload = {
          isPremium: Boolean(value),
        };
        break;

      default:
        return;
    }

    setSaveStatus("saving");

    mutate(
      {
        id: mcq.id,
        data: payload,
      },
      {
        onSuccess: () => {
          setSaveStatus("saved");
          setTimeout(() => setSaveStatus("idle"), 1500);
        },

        onError: (error: any) => {
          console.error("MCQ Update Error:", error.response?.data);

          setSaveStatus("error");
        },
      },
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <McqColumnSelector columns={columns} onToggle={toggleColumn} />
      </div>

      <div className="flex items-center justify-between">
        <McqSaveStatus status={saveStatus} />

        {/* <McqColumnSelector
    columns={columns}
    onToggle={
      toggleColumn
    }
  /> */}
      </div>

      <HotTable
        data={data}
        height="70vh"
        stretchH="all"
        rowHeaders
        manualRowMove={true}
        manualColumnResize={true}
        contextMenu={true}
        dropdownMenu={true}
        filters={true}
        stretchH="all"
        colHeaders={visibleColumns.map((column) => column.label)}
        licenseKey="non-commercial-and-evaluation"
        columns={visibleColumns.map((column) => {
          // Chapter
          if (column.key === "chapterId") {
            return {
              data: "chapterName",
              type: "dropdown",
              source: chapters.map((chapter) => chapter.name),
              strict: true,
            };
          }

          if (column.key === "topicId") {
            return {
              data: "topicName",
              type: "dropdown",
              source: topics.map((topic) => topic.name),
              strict: true,
            };
          }

          // Difficulty
          if (column.key === "difficulty") {
            return {
              data: "difficulty",
              type: "dropdown",
              source: ["EASY", "MEDIUM", "HARD"],
              strict: true,
            };
          }

          // Correct Answer
          if (column.key === "correctOptionKey") {
            return {
              data: "correctOptionKey",
              type: "dropdown",
              source: ["A", "B", "C", "D", "E"],
              strict: true,
            };
          }

          // Boolean Fields
          if (["isActive", "isPremium"].includes(column.key)) {
            return {
              data: column.key,
              type: "checkbox",
            };
          }

          // Text Fields
          return {
            data: column.key,
          };
        })}
        afterChange={(changes, source) => {
          if (source === "loadData" || !changes) {
            return;
          }

          changes.forEach(([row, property, oldValue, newValue]) => {
            if (oldValue === newValue) {
              return;
            }

            if (property === "chapterName") {
              const chapter = chapters.find(
                (chapter) => chapter.name === newValue,
              );

              if (!chapter) {
                return;
              }

              console.log("Selected chapter:", chapter);

              setSelectedChapterId(chapter.id);
              setPendingLocation(chapter.id);
              return;
            }

            if (property === "topicName") {
              const topic = topics.find((topic) => topic.name === newValue);

              if (!topic) {
                return;
              }

              handleSave(row as number, "location", {
                chapterId: pendingLocation,
                topicId: topic.id,
              });

              return;
            }

            handleSave(row as number, property as string, newValue);
          });
        }}
      />
    </div>
  );
}
