import * as z from "zod";
import { createImageSchema, updateImageSchema } from "./image.schema";

// Create
export const createCarouselSchema = z.object({
  title: z
    .string({ message: "Judul wajib diisi" })
    .min(1, "Minimal judul harus terdiri dari 1 karakter")
    .max(150, "Maksimal judul adalah 150 karakter"),
  description: z
    .string({ message: "Deskripsi wajib diisi" })
    .min(10, "Minimal deskripsi harus terdiri dari 10 karakter")
    .max(150, "Maksimal deskripsi adalah 150 karakter"),
  image: createImageSchema("Gambar"),
  link: z
    .string({ message: "Tautan wajib diisi" })
    .min(1, "Minimal tautan harus terdiri dari 1 karakter")
    .max(500, "Maksimal tautan adalah 500 karakter"),
  is_active: z.boolean({
    message: "Status aktif harus berupa boolean (true/false)",
  }),
});
export type CreateCarouselPayload = z.infer<typeof createCarouselSchema>;
export type CreateCarouselPayloadService = Omit<
  CreateCarouselPayload,
  "image"
> & {
  image_url: string;
};

// Update
export const updateCarouselSchema = z.object({
  title: z
    .string({ message: "Judul wajib diisi" })
    .min(1, "Minimal judul harus terdiri dari 1 karakter")
    .max(150, "Maksimal judul adalah 150 karakter")
    .optional(),
  description: z
    .string({ message: "Deskripsi wajib diisi" })
    .min(10, "Minimal deskripsi harus terdiri dari 10 karakter")
    .max(150, "Maksimal deskripsi adalah 150 karakter")
    .optional(),
  image: updateImageSchema("Gambar"),
  link: z
    .string({ message: "Tautan wajib diisi" })
    .min(1, "Minimal tautan harus terdiri dari 1 karakter")
    .max(500, "Maksimal tautan adalah 500 karakter")
    .optional(),
  is_active: z
    .boolean({
      message: "Status aktif harus berupa boolean (true/false)",
    })
    .optional(),
});
export type UpdateCarouselPayload = z.infer<typeof updateCarouselSchema>;
export type UpdateCarouselPayloadService = Omit<
  UpdateCarouselPayload,
  "image"
> & {
  id: string;
  image_url: string | undefined;
};
