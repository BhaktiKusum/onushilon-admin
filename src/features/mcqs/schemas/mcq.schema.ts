import { z } from "zod";

const mcqContentSchema =
  z.object({
    text: z.string().optional(),

    image: z
      .string()
      .nullable(),
  });

const optionSchema =
  z
    .object({
      key: z.string(),

      text: z
        .string()
        .optional(),

      image: z
        .string()
        .nullable(),
    })
    .refine(
      (option) =>
        option.text?.trim() ||
        option.image,
      {
        message:
          "Option must have text or image",
      },
    );

export const mcqSchema =
  z
    .object({
      scenario:
        mcqContentSchema.nullable(),

      question:
        mcqContentSchema,

      options: z
        .array(
          optionSchema,
        )
        .min(2)
        .max(5),

      correctOptionKey:
        z.string(),

      explanation:
        mcqContentSchema.nullable(),

      references: z.array(
        z.object({
          type: z
            .string()
            .min(1),

          value: z
            .string()
            .min(1),
        }),
      ),

      difficulty: z.enum([
        "EASY",
        "MEDIUM",
        "HARD",
      ]),
    })
    .refine(
      (data) =>
        data.question
          .text?.trim() ||
        data.question.image,
      {
        path: [
          "question",
        ],

        message:
          "Question must have text or image",
      },
    );

export type McqFormValues =
  z.infer<
    typeof mcqSchema
  >;