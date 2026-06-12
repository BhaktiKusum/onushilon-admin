import { z } from "zod";

export const academicLevelSchema =
  z.object({
    name: z
      .string()
      .min(2, "Name is required"),
  });

export type AcademicLevelFormValues =
  z.infer<
    typeof academicLevelSchema
  >;