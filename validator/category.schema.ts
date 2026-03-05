import * as z from "zod";
import { createImageSchema, updateImageSchema } from "./image.schema";

// Create
export const createCategorySchema = z.object({
  title: z
    .string({ message: "Judul wajib diisi" })
    .min(3, "Minimal judul harus terdiri dari 3 karakter")
    .max(150, "Maksimal judul adalah 150 karakter"),
  studio: z
    .string({ message: "Studio wajib diisi" })
    .min(3, "Minimal studio harus terdiri dari 3 karakter")
    .max(50, "Maksimal studio adalah 50 karakter"),
  image: createImageSchema("Gambar utama"),
  cover: createImageSchema("Gambar cover"),
  type: z.enum(["credit", "quota", "games", "bill"], {
    message: "Tipe harus salah satu dari: pulsa, kuota, permainan, tagihan",
  }),
  column_1: z.boolean({
    message: "Kolom 1 harus berupa boolean (true/false)",
  }),
  column_2: z.boolean({
    message: "Kolom 2 harus berupa boolean (true/false)",
  }),
  column_1_title: z
    .string({ message: "Judul kolom 1 wajib diisi" })
    .min(1, "Minimal judul kolom 1 harus terdiri dari 1 karakter")
    .max(100, "Maksimal judul kolom 1 adalah 100 karakter"),
  column_2_title: z
    .string({ message: "Judul kolom 2 wajib diisi" })
    .min(1, "Minimal judul kolom 2 harus terdiri dari 1 karakter")
    .max(100, "Maksimal judul kolom 2 adalah 100 karakter"),
});
export type CreateCategoryPayload = z.infer<typeof createCategorySchema>;
export type CreateCategoryPayloadService = Omit<
  CreateCategoryPayload,
  "image" | "cover"
> & {
  image_url: string;
  cover_url: string;
};

// Update
export const updateCategorySchema = z.object({
  title: z
    .string({ message: "Judul wajib diisi" })
    .min(3, "Minimal judul harus terdiri dari 3 karakter")
    .max(150, "Maksimal judul adalah 150 karakter")
    .optional(),
  studio: z
    .string({ message: "Studio wajib diisi" })
    .min(3, "Minimal studio harus terdiri dari 3 karakter")
    .max(50, "Maksimal studio adalah 50 karakter")
    .optional(),
  image: updateImageSchema("Gambar utama"),
  cover: updateImageSchema("Gambar cover"),
  type: z
    .enum(["credit", "quota", "games", "bill"], {
      message: "Tipe harus salah satu dari: pulsa, kuota, permainan, tagihan",
    })
    .optional(),
  column_1: z
    .boolean({
      message: "Kolom 1 harus berupa boolean (true/false)",
    })
    .optional(),
  column_2: z
    .boolean({
      message: "Kolom 2 harus berupa boolean (true/false)",
    })
    .optional(),
  column_1_title: z
    .string({ message: "Judul kolom 1 wajib diisi" })
    .min(1, "Minimal judul kolom 1 harus terdiri dari 1 karakter")
    .max(100, "Maksimal judul kolom 1 adalah 100 karakter")
    .optional(),
  column_2_title: z
    .string({ message: "Judul kolom 2 wajib diisi" })
    .min(1, "Minimal judul kolom 2 harus terdiri dari 1 karakter")
    .max(100, "Maksimal judul kolom 2 adalah 100 karakter")
    .optional(),
});
export type UpdateCategoryPayload = z.infer<typeof updateCategorySchema>;
export type UpdateCategoryPayloadService = Omit<
  UpdateCategoryPayload,
  "image" | "cover"
> & {
  id: string;
  image_url: string | undefined;
  cover_url: string | undefined;
};
