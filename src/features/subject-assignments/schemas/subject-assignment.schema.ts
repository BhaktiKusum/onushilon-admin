import { z } from "zod";

export const subjectAssignmentSchema =
  z.object({
    name: z.string().min(2),

    adminDisplayName:
      z.string().min(2),

    academicLevelIds: z
      .array(z.string())
      .min(1),
  });

export type SubjectAssignmentFormValues =
  z.infer<
    typeof subjectAssignmentSchema
  >;