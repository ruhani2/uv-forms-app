import { z } from "zod";
import { occupationSchema } from "./occupationSchema";
import { nameSchema } from "../nameSchema";
import { initiationDetailsSchema } from "../initiationDetailsSchema";

export const fatherDetailsSchema = z
  .object({
    father: z.object({
      ...nameSchema.shape,
      occupation: occupationSchema,
      satsangi: z.string().min(1, "Please specify if you are satsangi"),
      initiationDetails: initiationDetailsSchema,
    }),
    mother: z.object({
      ...nameSchema.shape,
      satsangi: z.string().min(1, "Please specify if you are satsangi"),
      initiationDetails: initiationDetailsSchema,
    }),
  })
  .superRefine((data, ctx) => {
    // Father validation
    if (data.father.satsangi === "satsangi") {
      if (data.father.initiationDetails?.initiatedFrom === "other") {
        if (
          !data.father.initiationDetails.initiatedBy ||
          data.father.initiationDetails.initiatedBy.trim().length === 0
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Please provide who initiated you",
            path: ["father", "initiationDetails", "initiatedBy"],
          });
        }
        if (
          !data.father.initiationDetails.placeOfInitiation ||
          data.father.initiationDetails.placeOfInitiation.trim().length === 0
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Please provide the place of initiation",
            path: ["father", "initiationDetails", "placeOfInitiation"],
          });
        }
      }

      const dateOfInitiation = data.father.initiationDetails?.dateOfInitiation;
      if (
        !dateOfInitiation ||
        (typeof dateOfInitiation === "string" &&
          dateOfInitiation.trim().length === 0) ||
        (dateOfInitiation instanceof Date && isNaN(dateOfInitiation.getTime()))
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Date of Initiation is required",
          path: ["father", "initiationDetails", "dateOfInitiation"],
        });
      }
    }

    // Mother validation
    if (data.mother.satsangi === "satsangi") {
      if (data.mother.initiationDetails?.initiatedFrom === "other") {
        if (
          !data.mother.initiationDetails.initiatedBy ||
          data.mother.initiationDetails.initiatedBy.trim().length === 0
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Please provide who initiated you",
            path: ["mother", "initiationDetails", "initiatedBy"],
          });
        }
        if (
          !data.mother.initiationDetails.placeOfInitiation ||
          data.mother.initiationDetails.placeOfInitiation.trim().length === 0
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Please provide the place of initiation",
            path: ["mother", "initiationDetails", "placeOfInitiation"],
          });
        }
      }

      const dateOfInitiation = data.mother.initiationDetails?.dateOfInitiation;
      if (
        !dateOfInitiation ||
        (typeof dateOfInitiation === "string" &&
          dateOfInitiation.trim().length === 0) ||
        (dateOfInitiation instanceof Date && isNaN(dateOfInitiation.getTime()))
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Date of Initiation is required",
          path: ["mother", "initiationDetails", "dateOfInitiation"],
        });
      }
    }
  });
