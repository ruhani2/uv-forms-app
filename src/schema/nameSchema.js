import { z } from "zod";

export const nameSchema = z.object({
  prefix: z.string().min(1, { message: "Prefix is required." }),
  firstName: z.string().trim().min(1, "First Name is required"),
  middleName: z.string().trim().optional(),
  lastName: z.string().optional(),
});
