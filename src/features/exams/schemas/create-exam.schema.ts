import { z } from "zod";

export const createExamSchema =
  z.object({
    title: z.string().min(1),

    description: z.string().min(1),

    academicLevelId:
      z.string().min(1),

    type: z.enum([
      "LIVE",
      "PRACTICE",
    ]),

    enrollmentType:
      z.enum([
        "OPEN",
        "PRIVATE",
      ]),

    durationMinutes:
      z.coerce.number(),

    totalMarks:
      z.coerce.number(),

    negativeMarks:
      z.coerce.number(),

    startAt:
      z.string(),

    endAt:
      z.string(),

    maxParticipants:
      z.coerce.number(),

    orderNo:
      z.coerce.number(),
  });

export type CreateExamFormValues =
  z.infer<
    typeof createExamSchema
  >;