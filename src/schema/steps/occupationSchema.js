import { z } from "zod";

export const occupationSchema = z
  .object({
    type: z.string().min(1, "Occupation type is required"),
    reason: z.string().optional(),
    post: z.string().optional(),
    department: z.string().optional(),
    organization: z.string().optional(),
    place: z.string().optional(),
    monthlyIncome: z.string().optional(),
    businessType: z.string().optional(),
    businessPlace: z.string().optional(),
    ownershipType: z.string().optional(),
    withWhom: z.string().optional(),
  })
  .refine(
    (data) =>
      data.type !== "service" || (data.post && data.post.trim().length > 0),
    {
      message: "Post is required for service",
      path: ["post"],
    }
  )
  .refine(
    (data) =>
      data.type !== "service" ||
      (data.department && data.department.trim().length > 0),
    {
      message: "Department is required for service",
      path: ["department"],
    }
  )
  .refine(
    (data) =>
      data.type !== "service" ||
      (data.organization && data.organization.trim().length > 0),
    {
      message: "Organization is required for service",
      path: ["organization"],
    }
  )
  .refine(
    (data) =>
      data.type !== "service" || (data.place && data.place.trim().length > 0),
    {
      message: "Place is required for service",
      path: ["place"],
    }
  )
  .refine(
    (data) =>
      data.type !== "business" ||
      (data.businessType && data.businessType.trim().length > 0),
    {
      message: "Business type is required for business",
      path: ["businessType"],
    }
  )
  .refine(
    (data) =>
      data.type !== "business" ||
      (data.businessPlace && data.businessPlace.trim().length > 0),
    {
      message: "Business place is required for business",
      path: ["businessPlace"],
    }
  )
  .refine(
    (data) =>
      data.type !== "business" ||
      (data.ownershipType && data.ownershipType.trim().length > 0),
    {
      message: "Ownership type is required for business",
      path: ["ownershipType"],
    }
  )
  .refine(
    (data) =>
      data.ownershipType !== "partnership" ||
      (data.withWhom && data.withWhom.trim().length > 0),
    {
      message: "Please specify the partner",
      path: ["withWhom"],
    }
  )
  .refine(
    (data) =>
      data.type !== "unemployed" ||
      (data.reason && data.reason.trim().length > 0),
    {
      message: "Reason is required for unemployed",
      path: ["reason"],
    }
  )
  .superRefine((data, ctx) => {
    if (data.type === "service" || data.type === "business") {
      if (!data.monthlyIncome || data.monthlyIncome.trim().length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Monthly Income is required",
          path: ["monthlyIncome"],
        });
      } else if (!/^(\d+(\.\d*)?|\.\d+)$/.test(data.monthlyIncome)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Monthly Income must be a valid number",
          path: ["monthlyIncome"],
        });
      }
    }
  });
