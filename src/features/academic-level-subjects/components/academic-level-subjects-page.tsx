"use client";

import SubjectCard from "./subject-card";

import { useAcademicLevelSubjects } from "../hooks/use-academic-level-subjects";

interface Props {
  academicLevelId: string;
}

export default function AcademicLevelSubjectsPage(
  {academicLevelId,}: Props) {
  const {data = [], isLoading, }= useAcademicLevelSubjects(
      academicLevelId,
    );

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        Subjects
      </h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map(
          (item) => (
            <SubjectCard
              key={item.id}
              item={item}
            />
          ),
        )}
      </div>
    </div>
  );
}