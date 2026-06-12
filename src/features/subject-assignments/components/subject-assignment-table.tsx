"use client";

import CreateSubjectAssignmentDialog from "./create-subject-assignment-dialog";

import { useSubjectAssignments } from "../hooks/use-subject-assignments";

import { groupSubjectAssignments } from "../utils/group-subject-assignments";

import UpdateSubjectDialog from "./update-subject-dialog";
import DeleteSubjectDialog from "./delete-subject-dialog";

export default function SubjectAssignmentTable() {
  const {
    data,
    isLoading,
  } =
    useSubjectAssignments();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const grouped =
    groupSubjectAssignments(
      data || [],
    );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Subject Assignments
        </h1>

        <CreateSubjectAssignmentDialog />
      </div>

      <div className="rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-4 text-left">
                Subject
              </th>

              <th className="p-4 text-left">
                Display Name
              </th>

              <th className="p-4 text-left">
                Academic Levels
              </th>
              <th className="p-4 text-right">
                Actions
                </th>
            </tr>
          </thead>

          <tbody>
            {grouped.map(
              (item) => (
                <tr
                  key={
                    item.subjectId
                  }
                  className="border-b"
                >
                  <td className="p-4">
                    {
                      item.subjectName
                    }
                  </td>

                  <td className="p-4">
                    {
                      item.adminDisplayName
                    }
                  </td>

                  <td className="p-4">
                    {item.academicLevels
                      .map(
                        (
                          level,
                        ) =>
                          level.name,
                      )
                      .join(
                        ", ",
                      )}
                  </td>

                  <td className="p-4">
  <div className="flex gap-2 justify-end">
    <UpdateSubjectDialog
      subjectId={item.subjectId}
      subjectName={item.subjectName}
      adminDisplayName={
        item.adminDisplayName
      }
    />

    <DeleteSubjectDialog
      subjectId={item.subjectId}
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