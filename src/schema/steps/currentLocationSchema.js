import { z } from "zod";

export const currentBranchDetailsSchema = z.object({
  applicant: z.object({
    currentBranchDetails: z.object({
      audioSatsangAttendance: z.object({
        morning: z.coerce
          .number({ invalid_type_error: "Please enter valid number" })
          .min(0, "Morning attendance cannot be negative"),
        evening: z.coerce
          .number({ invalid_type_error: "Please enter valid number" })
          .min(0, "Evening attendance cannot be negative"),
        total_count: z.coerce
          .number({ invalid_type_error: "Please enter valid number" })
          .min(0, "Total attendance cannot be negative"),
      }),
      sevaInformation: z
        .object({
          participatedInSeva: z.enum(["yes", "no"], {
            errorMap: () => ({ message: "Please select an option" }),
          }),
          sevaDetails: z.string().trim().optional(),
        })
        .refine(
          (data) => {
            if (data.participatedInSeva === "yes") {
              return data.sevaDetails && data.sevaDetails.length > 0;
            }
            return true;
          },
          {
            message: "Seva details are required",
            path: ["sevaDetails"],
          }
        ),
    }),
  }),
});
