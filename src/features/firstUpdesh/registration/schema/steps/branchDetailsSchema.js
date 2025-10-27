import { z } from "zod";

export const branchDetailsSchema = z.object({
  applicant: z.object({
    branchDetails: z.object({
      centreName: z.string(),
      branchName: z.string(),
      years: z.string(),
      months: z.string(),
      frequency: z.string().optional(),
    }),
  }),
});
