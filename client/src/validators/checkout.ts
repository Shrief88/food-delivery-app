import { z } from "zod";

const phoneRegex = new RegExp("^01[0-2]\\d{8}$");

export const checkoutSchema = z.object({
  address: z.string().min(3, { message: "Address is required" }),
  phone: z.string().regex(phoneRegex, { message: "Invalid phone number" }),
  city: z.string().min(3, { message: "City is required" }),
  postalCode: z.string().length(5, { message: "Invalid postal code" }),
});

export type TCheckoutSchema = z.infer<typeof checkoutSchema>;