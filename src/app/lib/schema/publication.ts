// src/lib/schemas/publication.ts
import { z } from "zod";

export const urlValidator = z.string().refine(val => {
  try {
    new URL(val.startsWith("http") ? val : "http://" + val);
    return true;
  } catch {
    return false;
  }
}, {
  message: "linkUrl ต้องเป็น URL ที่ถูกต้อง",
});

export const publicationSchema = z.object({
  titleTh: z.string().min(1, "titleTh ต้องไม่ว่าง"),
  titleEn: z.string().min(1, "titleEn ต้องไม่ว่าง"),
  descriptionTh: z.string().optional(),
  descriptionEn: z.string().optional(),
  linkUrl: urlValidator,
});

export const publicationUpdateSchema = z.object({
  id: z.number().int().positive("id ต้องเป็นจำนวนเต็มบวก"),
  titleTh: z.string().optional(),
  titleEn: z.string().optional(),
  descriptionTh: z.string().optional(),
  descriptionEn: z.string().optional(),
  linkUrl: urlValidator.optional(),
});

export const publicationDeleteSchema = z.object({
  id: z.number().int().positive("id ต้องเป็นจำนวนเต็มบวก")
});
