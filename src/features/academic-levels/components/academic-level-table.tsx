"use client";

import { useAcademicLevels } from "../hooks/use-academic-levels";

import CreateAcademicLevelDialog from "./create-academic-level-dialog";

import AcademicLevelCard from "./academic-level-card";

export default function AcademicLevelTable() {
  const { data, isLoading } =
    useAcademicLevels();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Academic Levels
        </h1>

        <CreateAcademicLevelDialog />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {data?.map((level) => (
          <AcademicLevelCard
            key={level.id}
            academicLevel={level}
          />
        ))}
      </div>
    </div>
  );
}