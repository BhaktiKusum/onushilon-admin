import { z } from "zod";

export const chapterSchema =
  z.object({
    name: z.string().min(1),

    orderNo: z.coerce
      .number()
      .min(1),
  });

export type ChapterFormValues =
  z.infer<
    typeof chapterSchema
  >;