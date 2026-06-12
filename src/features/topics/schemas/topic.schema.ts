import { z } from "zod";

export const topicSchema =
  z.object({
    name: z.string().min(1),

    orderNo: z.coerce
      .number()
      .min(1),
  });

export type TopicFormValues =
  z.infer<typeof topicSchema>;