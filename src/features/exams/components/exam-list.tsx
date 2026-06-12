"use client";

import Link from "next/link";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useExams } from "../hooks/use-exams";
import ExamCard from "./exam-tabs";
import { useState } from "react";
import ExamTabs from "./exam-tabs";

export default function ExamList() {
  const { data: exams = [], isLoading } = useExams();

  console.log(exams);
  const now = new Date();

  const [activeTab, setActiveTab] = useState("upcoming");

  const filteredExams = exams.filter((exam) => {
    const startAt = new Date(exam.startAt);

    const endAt = new Date(exam.endAt);

    switch (activeTab) {
      case "upcoming":
        return startAt > now;

      case "ongoing":
        return startAt <= now && endAt >= now;

      case "past":
        return endAt < now;

      case "practice":
        return exam.type === "PRACTICE";

      default:
        return true;
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Exams</h1>

        <Link href="/exams/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Exam
          </Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {filteredExams.map((exam) => (
          <ExamCard key={exam.id} exam={exam} />
        ))}
      </div>

      <ExamTabs value={activeTab} onChange={setActiveTab} />

      <div className="rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Title</th>

              <th className="p-3 text-left">Type</th>

              <th className="p-3 text-left">Duration</th>

              <th className="p-3 text-left">Published</th>

              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {exams.map((exam) => (
              <tr key={exam.id} className="border-b">
                <td className="p-3">{exam.title}</td>

                <td className="p-3">{exam.type}</td>

                <td className="p-3">{exam.durationMinutes} min</td>

                <td className="p-3">{exam.isPublished ? "Yes" : "No"}</td>

                <td className="p-3 text-right">
                  <Link href={`/exams/${exam.id}`}>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
