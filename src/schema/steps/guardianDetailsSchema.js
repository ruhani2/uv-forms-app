import { z } from "zod";
import { occupationStepSchema } from "./occupationSchema";
import { initiationDetailsSchema } from "./initiationDetailsSchema";

const nameSchema = z.object({
  prefix: z.enum(["SH", "SMT", "KM"], {
    required_error: "Prefix is required",
  }),
  firstName: z.string().trim().min(1, "First Name is required"),
  middleName: z.string().trim().optional(),
  lastName: z.string().optional(),
});

export const guardianDetailsSchema = z.object({
  guardian: {
    ...nameSchema,
    ...occupationStepSchema,
    ...initiationDetailsSchema,
  },
});
