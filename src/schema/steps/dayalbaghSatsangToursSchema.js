import { optional, z } from "zod";

export const dayalbaghSatsangToursSchema = z
  .object({
    applicant: z.object({
      dayalbaghVisits: z.object({
        everVisited: z.string().min(0, "Ever visited dayalbagh?"),
        noOfVisits: z.coerce
          .number({ invalid_type_error: "Please provide valid value" })
          .optional(),
        numDaysStayed: z.coerce
          .number({ invalid_type_error: "Please provide valid value" })
          .optional(),
        date: z.any().transform((val) => {
          if (val instanceof Date && !isNaN(val.getTime())) {
            return val.toISOString();
          }
          return val;
        }),
        lastVisitDate: z.any().transform((val) => {
          if (val instanceof Date && !isNaN(val.getTime())) {
            return val.toISOString();
          }
          return val;
        }),
        numOfDaysLastVisit: z.coerce
          .number({ invalid_type_error: "Please provide valid value" })
          .optional(),
      }),
      satsangToursDetails: z.object({
        everVisited: z.string().min(0, "Ever visited Satsang Tours?"),
        satsangTours: z.array(
          z.object({
            date: z.any().transform((val) => {
              if (val instanceof Date && !isNaN(val.getTime())) {
                return val.toISOString();
              }
              return val;
            }),
            location: z.string().trim().optional(),
          })
        ),
      }),
    }),
  })
  .superRefine((data, ctx) => {
    const dayalbaghVisits = data.applicant.dayalbaghVisits;

    if (dayalbaghVisits && dayalbaghVisits.everVisited === "yes") {
      if (!dayalbaghVisits.noOfVisits || dayalbaghVisits.noOfVisits <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Number of visits is required",
          path: ["applicant", "dayalbaghVisits", "noOfVisits"],
        });
      }

      if (
        !dayalbaghVisits.numDaysStayed ||
        dayalbaghVisits.numDaysStayed <= 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Number of days stayed is required",
          path: ["applicant", "dayalbaghVisits", "numDaysStayed"],
        });
      }

      const dayalbaghVisitDate = dayalbaghVisits.date;
      if (
        !dayalbaghVisitDate ||
        (typeof dayalbaghVisitDate === "string" &&
          dayalbaghVisitDate.trim().length === 0) ||
        (dayalbaghVisitDate instanceof Date &&
          isNaN(dayalbaghVisitDate.getTime()))
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please provide a valid date",
          path: ["applicant", "dayalbaghVisits", "date"],
        });
      }

      const lastVisitDate = dayalbaghVisits.lastVisitDate;
      if (
        !lastVisitDate ||
        (typeof lastVisitDate === "string" &&
          lastVisitDate.trim().length === 0) ||
        (lastVisitDate instanceof Date && isNaN(lastVisitDate.getTime()))
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Last visit date is required",
          path: ["applicant", "dayalbaghVisits", "lastVisitDate"],
        });
      }

      if (
        !dayalbaghVisits.numOfDaysLastVisit ||
        dayalbaghVisits.numOfDaysLastVisit <= 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Number of days for last visit is required",
          path: ["applicant", "dayalbaghVisits", "numOfDaysLastVisit"],
        });
      }
    }

    const satsangTours = data.applicant.satsangToursDetails.satsangTours;
    if (satsangTours.length > 0) {
      satsangTours.forEach((tour, index) => {
        const tourDate = tour.date;
        if (
          !tourDate ||
          (typeof tourDate === "string" && tourDate.trim().length === 0) ||
          (tourDate instanceof Date && isNaN(tourDate.getTime()))
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Please provide a valid date",
            path: [
              "applicant",
              "satsangToursDetails",
              "satsangTours",
              index,
              "date",
            ],
          });
        }

        const tourLocation = tour.location;
        if (
          !tourLocation ||
          (typeof tourLocation === "string" && tourLocation.trim().length === 0)
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Please provide a valid location",
            path: [
              "applicant",
              "satsangToursDetails",
              "satsangTours",
              index,
              "location",
            ],
          });
        }
      });
    }
  });
