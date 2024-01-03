import { z } from "zod";

export const authSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name should be at least 3 characters" })
    .max(32, { message: "Name should be at most 32 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password should be at least 6 characters" }),
  passwordConfirm: z
    .string()
    .min(6, { message: "Password should be at least 6 characters" }),
});

export type TAuthSchema = z.infer<typeof authSchema>;
