import * as z from "zod";

const MAX_IMAGE_SIZE = 3 * 1024 * 1024; // 3MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/jfif",
];

const createImageSchema = (fieldLabel: string) =>
  z.preprocess(
    (value) => {
      if (typeof FileList !== "undefined" && value instanceof FileList) {
        return value.item(0);
      }
      return value;
    },
    z
      .custom<File>(
        (value) => typeof File !== "undefined" && value instanceof File,
        { message: `${fieldLabel} wajib diisi` },
      )
      .refine((file) => file.size <= MAX_IMAGE_SIZE, {
        message: `${fieldLabel} maksimal 3MB`,
      })
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: `${fieldLabel} harus berformat JPG, JPEG, PNG, atau WEBP`,
      }),
  );

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
