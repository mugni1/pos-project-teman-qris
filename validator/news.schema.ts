import * as z from "zod";
import { createImageSchema, updateImageSchema } from "./image.schema";

// Create
export const createNewsSchema = z.object({
  image: createImageSchema("Gambar utama"),
  title: z
    .string({ message: "Judul wajib diisi" })
    .min(3, "Minimal judul harus terdiri dari 3 karakter")
    .max(150, "Maksimal judul adalah 150 karakter"),
  summary: z
    .string({ message: "Ringkasan wajib diisi" })
    .min(10, "Minimal ringkasan harus terdiri dari 10 karakter")
    .max(5000, "Maksimal ringkasan adalah 5000 karakter"),
  content: z
    .string({ message: "Konten wajib diisi" })
    .min(10, "Minimal konten harus terdiri dari 10 karakter")
    .max(10000, "Maksimal konten adalah 10000 karakter"),
});
export type CreateNewsPayload = z.infer<typeof createNewsSchema>;
export type CreateNewsPayloadService = Omit<CreateNewsPayload, "image"> & {
  image_url: string;
};

// Update
export const updateNewsSchema = z.object({
  image: updateImageSchema("Gambar utama"),
  title: z
    .string({ message: "Judul wajib diisi" })
    .min(3, "Minimal judul harus terdiri dari 3 karakter")
    .max(150, "Maksimal judul adalah 150 karakter")
    .optional(),
  summary: z
    .string({ message: "Ringkasan wajib diisi" })
    .min(10, "Minimal ringkasan harus terdiri dari 10 karakter")
    .max(5000, "Maksimal ringkasan adalah 5000 karakter")
    .optional(),
  content: z
    .string({ message: "Konten wajib diisi" })
    .min(10, "Minimal konten harus terdiri dari 10 karakter")
    .max(10000, "Maksimal konten adalah 1000 karakter")
    .optional(),
});
export type UpdateNewsPayload = z.infer<typeof updateNewsSchema>;
export type UpdateNewsPayloadService = Omit<UpdateNewsPayload, "image"> & {
  id: string;
  image_url: string | undefined;
};
