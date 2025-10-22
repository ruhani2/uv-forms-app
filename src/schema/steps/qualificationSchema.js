import { z } from "zod";

export const qualificationSchema = z
  .object({
    literacy: z.string().min(1, "Literacy is required"),
    degree: z
      .object({
        code: z.string().trim(),
        name: z.string().trim(),
      })
      .refine((data) => data.name.length > 0 && data.code.length > 0, {
        message: "Degree is required",
        path: ["name"],
      }),
    degreeName: z.string().optional(),
    specialization: z.string().optional(),
    place: z.string().optional(),
  })
  .refine(
    (data) =>
      data.literacy !== "literate" ||
      (data.specialization && data.specialization.trim().length > 0),
    {
      message: "Specialization is required",
      path: ["specialization"],
    }
  )
  .refine(
    (data) =>
      data.literacy !== "literate" ||
      (data.place && data.place.trim().length > 0),
    {
      message: "Place is required",
      path: ["place"],
    }
  )
  .refine(
    (data) =>
      data.literacy !== "literate" ||
      (typeof data.degree === "object" && data.degree.code !== "other"),
    {
      message: "Degree details are required",
      path: ["degreeName"],
    }
  );
