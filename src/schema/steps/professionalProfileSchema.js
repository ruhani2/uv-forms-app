import { z } from "zod";
import { qualificationSchema } from "./qualificationSchema";
import { occupationStepSchema } from "./occupationSchema";

export const professionalProfileSchema = z.object({
  qualificationSchema,
  occupationStepSchema,
});
