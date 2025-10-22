import { z } from "zod";

export const addressSchema = z.object({
  houseNo: z.string().trim().min(1, "House No. is required"),
  landmark: z.string().trim().optional(),
  city: z
    .object({
      code: z.string().trim(),
      name: z.string().trim(),
    })
    .refine((data) => data.name.length > 0 && data.code.length > 0, {
      message: "City is required",
      path: ["name"],
    }),
  state: z
    .object({
      code: z.string().trim(),
      name: z.string().trim(),
    })
    .refine((data) => data.name.length > 0 && data.code.length > 0, {
      message: "State is required",
      path: ["name"],
    }),
  country: z
    .object({
      code: z.string().trim(),
      name: z.string().trim(),
    })
    .refine((data) => data.name.length > 0 && data.code.length > 0, {
      message: "Country is required",
      path: ["name"],
    }),
  pincode: z
    .string()
    .min(6, "Pincode must be 6 digits")
    .max(6, "Pincode must be 6 digits")
    .regex(/^\d+$/, "Pincode must contain only digits"),
});
