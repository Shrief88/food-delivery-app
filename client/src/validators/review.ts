import { z } from "zod";

export const reviewSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title should be at least 3 characters" })
    .max(100, { message: "Title should be at most 32 characters" }),
  description: z.string().optional(),
});

export type TReviewSchema = z.infer<typeof reviewSchema>;
