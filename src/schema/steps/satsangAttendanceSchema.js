import { z } from "zod";

export const satsangAttendanceSchema = z.object({
  applicant: z.object({
    satsangAttendances: z.object({
      fromChildhoodToAdult: z.array(
        z.object({
          nameOfBranchCentre: z
            .string()
            .min(1, "Branch/Centre name is required"),
          audioESatsangAttendance: z.coerce
            .number({ invalid_type_error: "Please enter valid attendance" })
            .min(0, "Audio eSatsang attendance is required"),
          videoESatsangAttendance: z.coerce
            .number({ invalid_type_error: "Please enter valid attendance" })
            .min(0, "Video eSatsang attendance is required"),
          branchSatsangAttendance: z.coerce
            .number({ invalid_type_error: "Please enter valid attendance" })
            .min(0, "Branch satsang attendance is required"),
          periodFrom: z.preprocess(
            (val) => (val === null ? "" : val),
            z.string().min(1, "From Date is required")
          ),
          periodTo: z.preprocess(
            (val) => (val === null ? "" : val),
            z.string().min(1, "To Date is required")
          ),
        })
      ),
      adultTillJigyasu: z.array(
        z.object({
          nameOfBranchCentre: z
            .string()
            .min(1, "Branch/Centre name is required"),
          audioESatsangAttendance: z.coerce
            .number({ invalid_type_error: "Please enter valid attendance" })
            .min(0, "Audio eSatsang attendance is required"),
          videoESatsangAttendance: z.coerce
            .number({ invalid_type_error: "Please enter valid attendance" })
            .min(0, "Video eSatsang attendance is required"),
          branchSatsangAttendance: z.coerce
            .number({ invalid_type_error: "Please enter valid attendance" })
            .min(0, "Branch satsang attendance is required"),
          periodFrom: z.preprocess(
            (val) => (val === null ? "" : val),
            z.string().min(1, "From Date is required")
          ),
          periodTo: z.preprocess(
            (val) => (val === null ? "" : val),
            z.string().min(1, "To Date is required")
          ),
        })
      ),
      fromJigyasuToCurrent: z.array(
        z.object({
          nameOfBranchCentre: z
            .string()
            .min(1, "Branch/Centre name is required"),
          audioESatsangAttendance: z.coerce
            .number({ invalid_type_error: "Please enter valid attendance" })
            .min(0, "Audio eSatsang attendance is required"),
          videoESatsangAttendance: z.coerce
            .number({ invalid_type_error: "Please enter valid attendance" })
            .min(0, "Video eSatsang attendance is required"),
          branchSatsangAttendance: z.coerce
            .number({ invalid_type_error: "Please enter valid attendance" })
            .min(0, "Branch satsang attendance is required"),
          periodFrom: z.preprocess(
            (val) => (val === null ? "" : val),
            z.string().min(1, "From Date is required")
          ),
          periodTo: z.preprocess(
            (val) => (val === null ? "" : val),
            z.string().min(1, "To Date is required")
          ),
        })
      ),
    }),
    educationFromDei: z.object({
      acknowledged: z.string().optional(),
      khetAttendance: z.coerce
        .number({ invalid_type_error: "Please enter valid attendance" })
        .min(0, "Khet attendance is required"),
      satsangAttendance: z.coerce.number({
        invalid_type_error: "Please enter valid attendance",
      }),
    }),
  }),
});
