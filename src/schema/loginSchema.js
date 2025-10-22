import { z } from "zod";

export const loginValidationSchema = z.object({
  uid: z.string().trim().nonempty("UID is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
