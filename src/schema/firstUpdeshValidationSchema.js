import { z } from "zod";

const occupationSchema = z.object({
  type: z.string(),
  reason: z.string(),
  post: z.string(),
  department: z.string(),
  place: z.string(),
  salary: z.string(),
  businessType: z.string(),
  businessPlace: z.string(),
  ownershipType: z.string(),
});

const satsangiSchema = z.object({
  satsangi: z.enum(["Satsangi", "Non-Satsangi", "Jigyasu"]),
  dateOfInititation: z.date(),
});

export const firstUpdeshValidationSchema = z.object({
  applicant: z
    .object({
      prefix: z.enum(["SH", "SMT", "KM"], {
        required_error: "Prefix is required",
      }),
      firstName: z.string().trim().min(1, "First Name is required"),
      middleName: z.string().trim().optional(),
      lastName: z.string().optional(),
      uid: z
        .string()
        .trim()
        .min(1, "UID is required")
        .max(12, "UID must be 12 characters long"), // confirm max characters
      appliedEarlier: z.enum(["Yes", "No"]),
      replyGivenBySabha: z.string(),
      letterNo: z.string().optional(),
      letterDate: z.string().optional(),
      dateOfBirth: z.object({
        date: z.string().min(0, "Date of Birth is required"),
        years: z.number().min(0, "Age in Years must be a positive number"),
        months: z.number().min(0, "Age in Months must be a positive number"),
      }),
      qualification: z.object({
        canOnlySign: z.boolean(),
        degree: z.string().optional(),
        specialization: z.string().optional(),
        place: z.string().optional(),
      }),
      currentLocation: z.object({
        houseNo: z.string().min(0, "House No is required"),
        landmark: z.string().min(0, "Landmark is required"),
        city: z.string().min(0, "City is required"),
        state: z.string().min(0, "State is required"),
        country: z.string().min(0, "Country is required"),
        pincode: z.string().min(0, "Pincode is required"),
      }),
      occupation: occupationSchema,
      branchDetails: z.object({
        centreName: z.string(),
        branchName: z.string(),
        years: z.string(),
        months: z.string(),
        frequency: z.enum(["Weekly", "Monthly", "Special Occasions", "Other"]),
      }),
      father: z.object({
        prefix: z.enum(["SH", "SMT", "KM"], {
          required_error: "Prefix is required",
        }),
        firstName: z.string().trim().min(1, "First Name is required"),
        middleName: z.string().trim().optional(),
        lastName: z.string().trim().min(1, "Last Name is required"),
        occupation: occupationSchema,
        ...satsangiSchema,
      }),
      mother: z.object({
        prefix: z.enum(["SH", "SMT", "KM"], {
          required_error: "Prefix is required",
        }),
        firstName: z.string().trim().min(1, "First Name is required"),
        middleName: z.string().trim().optional(),
        lastName: z.string().trim().min(1, "Last Name is required"),
        occupation: occupationSchema,
        ...satsangiSchema,
      }),
      spouse: z.object({
        prefix: z.enum(["SH", "SMT", "KM"], {
          required_error: "Prefix is required",
        }),
        firstName: z.string().trim().min(1, "First Name is required"),
        middleName: z.string().trim().optional(),
        lastName: z.string().trim().min(1, "Last Name is required"),
        occupation: occupationSchema,
        ...satsangiSchema,
      }),
    })
    .refine(
      (data) =>
        data.appliedEarlier !== "Yes" ||
        (data.letterNo && data.letterNo.trim().length > 0),
      {
        message: "Letter No. is required if applied earlier is Yes",
        path: ["letterNo"],
      }
    )
    .refine(
      (data) =>
        data.appliedEarlier !== "Yes" ||
        (data.letterDate && data.letterDate.trim().length > 0),
      {
        message: "Letter Date is required if applied earlier is Yes",
        path: ["letterDate"],
      }
    )
    .refine(
      (data) =>
        data.qualification.canOnlySign ||
        (typeof data.qualification.degree === "string" &&
          data.qualification.degree.trim().length > 0),
      {
        message: "Degree is required",
        path: ["qualification", "degree"],
      }
    )
    .refine(
      (data) =>
        data.qualification.canOnlySign || data.qualification.specialization,
      {
        message: "Specialization is required",
        path: ["qualification.specialization"],
      }
    )
    .refine(
      (data) => data.qualification.canOnlySign || data.qualification.place,
      {
        message: "Place is required",
        path: ["qualification.place"],
      }
    ),
});
