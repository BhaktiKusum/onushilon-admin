import {
  GroupedSubjectAssignment,
  SubjectAssignment,
} from "../types/subject-assignment.types";

export const groupSubjectAssignments =
  (
    assignments: SubjectAssignment[],
  ): GroupedSubjectAssignment[] => {
    const map = new Map();

    assignments.forEach(
      (assignment) => {
        const existing =
          map.get(
            assignment.subjectId,
          );

        if (existing) {
          existing.assignmentIds.push(
            assignment.id,
          );

          existing.academicLevels.push(
            assignment.academicLevel,
          );

          return;
        }

        map.set(
          assignment.subjectId,
          {
            subjectId:
              assignment.subject.id,

            subjectName:
              assignment.subject.name,

            adminDisplayName:
              assignment.subject
                .adminDisplayName,

            assignmentIds: [
              assignment.id,
            ],

            academicLevels: [
              assignment
                .academicLevel,
            ],
          },
        );
      },
    );

    return Array.from(
      map.values(),
    );
  };