import { z } from "zod";
import { addressSchema } from "../addressSchema";
import { qualificationSchema } from "./qualificationSchema";
import { occupationSchema } from "./occupationSchema";

export const addressDetailsSchema = z.object({
  applicant: z.object({
    currentAddress: addressSchema,
    permanentAddress: addressSchema,
    sameAsCurrent: z.boolean().optional(),
    qualification: qualificationSchema,
    occupation: occupationSchema,
  }),
});
