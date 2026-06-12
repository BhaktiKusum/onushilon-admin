import { assignSubject } from "./assign-subject";
import { createSubject } from "./create-subject";

import { CreateSubjectAssignmentPayload } from "../types/subject-assignment.types";

export const createAndAssignSubject =
  async (
    payload: CreateSubjectAssignmentPayload,
  ) => {
    const subject =
      await createSubject({
        name: payload.name,
        adminDisplayName:
          payload.adminDisplayName,
      });

    await assignSubject({
      subjectId: subject.id,
      academicLevelIds:
        payload.academicLevelIds,
    });

    return subject;
  };