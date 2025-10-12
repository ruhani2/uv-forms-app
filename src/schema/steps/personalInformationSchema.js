import { z } from "zod";
import { nameSchema } from "../nameSchema";

const personalSchema = z.object({
  gender: z.string().trim().min(1, "Gender is required"),
  maritalStatus: z.string().min(1, "Marital Status is required"),
  uid: z
    .string()
    .trim()
    .min(1, "UID is required")
    .max(12, "UID must be 12 characters long"), // check for the characters
  biometric: z.boolean(),
  dateOfRegistrationAsJigyasu: z.any().transform((val) => {
    if (val instanceof Date && !isNaN(val.getTime())) {
      return val.toISOString();
    }
    return val;
  }),
  healthStatus: z.string().trim().min(1, "Health Status is required"),
  caste: z.string().trim().min(1, "Caste is required"),
  phone: z.object({
    code: z.string().min(1, "Country code is required"),
    number: z
      .string()
      .min(10, "Phone number must be 10 digits")
      .max(10, "Phone number must be 10 digits")
      .regex(/^\d+$/, "Phone number must contain only digits"),
  }),
  email: z.string().trim().email("Invalid email format"),
  alreadyInitiated: z.object({
    acknowledged: z.boolean(),
    initiatedAt: z.any().transform((val) => {
      if (val instanceof Date && !isNaN(val.getTime())) {
        return val.toISOString();
      }
      return val;
    }),
    initiatedBy: z.string().trim().optional(),
    placeOfInitiation: z.string().trim().optional(),
    reasonToRelinquish: z.string().trim().optional(),
  }),
  appliedEarlier: z.string().trim().min(1, "Applied Earlier is required"),
  replyGivenBySabha: z.string().trim().optional(),
  letterNo: z.string().trim().optional(),
  letterDate: z
    .any()
    .nullable()
    .optional()
    .transform((val) => {
      if (val instanceof Date && !isNaN(val.getTime())) {
        return val.toISOString();
      }
      return val;
    }),
  dateOfBirth: z.object({
    date: z.any().transform((val) => {
      if (val instanceof Date && !isNaN(val.getTime())) {
        return val.toISOString();
      }
      return val;
    }),
    years: z.number().min(22, "Age should be atleast 22 years."),
    months: z.number().optional(),
  }),
});

const applicantSchema = nameSchema.merge(personalSchema);

export const personalInformationSchema = z
  .object({
    applicant: applicantSchema,
  })
  .superRefine((data, ctx) => {
    // ----- letter no ---------
    if (data.applicant.appliedEarlier === "Yes") {
      if (
        !data.applicant.letterNo ||
        data.applicant.letterNo.trim().length === 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Letter No is required.",
          path: ["applicant", "letterNo"],
        });
      }
      // ---- letter date -----
      if (
        !data.applicant.letterDate ||
        typeof data.applicant.letterDate !== "string" ||
        data.applicant.letterDate.length === 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Letter Date is required.",
          path: ["applicant", "letterDate"],
        });
      }
      // ---- reply given by sabha -----
      if (
        !data.applicant.replyGivenBySabha ||
        data.applicant.replyGivenBySabha.trim().length === 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Reply Given By Sabha is required.",
          path: ["applicant", "replyGivenBySabha"],
        });
      }
    }
    // -------- already initiated validations ------
    if (data.applicant.alreadyInitiated.acknowledged) {
      if (
        !data.applicant.alreadyInitiated.initiatedAt ||
        typeof data.applicant.alreadyInitiated.initiatedAt !== "string" ||
        data.applicant.alreadyInitiated.initiatedAt.length === 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Date of Initiation is required.",
          path: ["applicant", "alreadyInitiated", "initiatedAt"],
        });
      }
      if (
        !data.applicant.alreadyInitiated.initiatedBy ||
        typeof data.applicant.alreadyInitiated.initiatedBy !== "string" ||
        data.applicant.alreadyInitiated.initiatedBy.trim().length === 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Initiated By is required.",
          path: ["applicant", "alreadyInitiated", "initiatedBy"],
        });
      }
      if (
        !data.applicant.alreadyInitiated.placeOfInitiation ||
        typeof data.applicant.alreadyInitiated.placeOfInitiation !== "string" ||
        data.applicant.alreadyInitiated.placeOfInitiation.trim().length === 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Place of Initiation is required.",
          path: ["applicant", "alreadyInitiated", "placeOfInitiation"],
        });
      }
      if (
        !data.applicant.alreadyInitiated.reasonToRelinquish ||
        typeof data.applicant.alreadyInitiated.reasonToRelinquish !==
          "string" ||
        data.applicant.alreadyInitiated.reasonToRelinquish.trim().length === 0
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Reason to Relinquish is required.",
          path: ["applicant", "alreadyInitiated", "reasonToRelinquish"],
        });
      }
    }

    // Date of Birth validation
    const dob = data.applicant.dateOfBirth?.date;
    if (
      !dob ||
      (typeof dob === "string" && dob.trim().length === 0) ||
      (dob instanceof Date && isNaN(dob.getTime()))
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Date of Birth is required",
        path: ["applicant", "dateOfBirth", "date"],
      });
    }

    // date of jigyasu registration -------
    const jigyasuRegDate = data.applicant.dateOfRegistrationAsJigyasu;
    if (
      !jigyasuRegDate ||
      (typeof jigyasuRegDate === "string" &&
        jigyasuRegDate.trim().length === 0) ||
      (jigyasuRegDate instanceof Date && isNaN(jigyasuRegDate.getTime()))
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Date of Jigyasu Registration is required",
        path: ["applicant", "dateOfRegistrationAsJigyasu"],
      });
    }
  });
