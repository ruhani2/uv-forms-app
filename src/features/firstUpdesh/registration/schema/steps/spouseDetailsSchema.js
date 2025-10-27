import { z } from "zod";
import { occupationSchema } from "./occupationSchema";
import { initiationDetailsSchema } from "../initiationDetailsSchema";
import { nameSchema } from "../nameSchema";

export const spouseDetailsSchema = (
  isSpousePageRequired,
  gender,
  isGuardianPageRequired
) =>
  z
    .object({
      spouse: isSpousePageRequired
        ? z.object({
            ...nameSchema.shape,
            occupation:
              gender === "male" ? z.any().optional() : occupationSchema,
            satsangi: z.string().min(1, "Please specify if you are satsangi"),
            initiationDetails: initiationDetailsSchema,
          })
        : z.any().optional(),
      guardian: isGuardianPageRequired
        ? z.object({
            ...nameSchema.shape,
            occupation: occupationSchema,
            satsangi: z.string().min(1, "Please specify if you are satsangi"),
            initiationDetails: initiationDetailsSchema,
          })
        : z.any().optional(),
    })
    .superRefine((data, ctx) => {
      // Spouse validation
      if (
        isSpousePageRequired &&
        data.spouse &&
        data.spouse.satsangi === "satsangi"
      ) {
        if (data.spouse.initiationDetails?.initiatedFrom === "other") {
          if (
            !data.spouse.initiationDetails.initiatedBy ||
            data.spouse.initiationDetails.initiatedBy.trim().length === 0
          ) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Please provide who initiated you",
              path: ["spouse", "initiationDetails", "initiatedBy"],
            });
          }
          if (
            !data.spouse.initiationDetails.placeOfInitiation ||
            data.spouse.initiationDetails.placeOfInitiation.trim().length === 0
          ) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Please provide the place of initiation",
              path: ["spouse", "initiationDetails", "placeOfInitiation"],
            });
          }
        }

        const dateOfInitiation =
          data.spouse.initiationDetails?.dateOfInitiation;
        if (
          !dateOfInitiation ||
          (typeof dateOfInitiation === "string" &&
            dateOfInitiation.trim().length === 0) ||
          (dateOfInitiation instanceof Date &&
            isNaN(dateOfInitiation.getTime()))
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Date of Initiation is required",
            path: ["spouse", "initiationDetails", "dateOfInitiation"],
          });
        }
      }

      // Guardian validation
      if (
        isGuardianPageRequired &&
        data.guardian &&
        data.guardian.satsangi === "satsangi"
      ) {
        if (data.guardian.initiationDetails?.initiatedFrom === "other") {
          if (
            !data.guardian.initiationDetails.initiatedBy ||
            data.guardian.initiationDetails.initiatedBy.trim().length === 0
          ) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Please provide who initiated you",
              path: ["guardian", "initiationDetails", "initiatedBy"],
            });
          }
          if (
            !data.guardian.initiationDetails.placeOfInitiation ||
            data.guardian.initiationDetails.placeOfInitiation.trim().length ===
              0
          ) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Please provide the place of initiation",
              path: ["guardian", "initiationDetails", "placeOfInitiation"],
            });
          }
        }

        const dateOfInitiation =
          data.guardian.initiationDetails?.dateOfInitiation;
        if (
          !dateOfInitiation ||
          (typeof dateOfInitiation === "string" &&
            dateOfInitiation.trim().length === 0) ||
          (dateOfInitiation instanceof Date &&
            isNaN(dateOfInitiation.getTime()))
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Date of Initiation is required",
            path: ["guardian", "initiationDetails", "dateOfInitiation"],
          });
        }
      }
    });
