import { z } from "zod";

export const initiationDetailsSchema = z.object({
  dateOfInitiation: z.any().transform((val) => {
    if (val instanceof Date && !isNaN(val.getTime())) {
      return val.toISOString();
    }
    return val;
  }),
  initiatedBy: z.string().trim().optional(),
  initiatedFrom: z.string().optional(),
  placeOfInitiation: z.string().optional(),
});
