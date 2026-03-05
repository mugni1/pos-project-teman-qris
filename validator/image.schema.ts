import z from "zod";

const MAX_IMAGE_SIZE = 3 * 1024 * 1024; // 3MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/jfif",
  "image/gif",
  "image/svg+xml",
];

export const createImageSchema = (fieldLabel: string) =>
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
        message: `${fieldLabel} harus berformat JPG, JPEG, PNG, JFIF, SVG, GIF atau WEBP`,
      }),
  );

export const updateImageSchema = (fieldLabel: string) =>
  z.preprocess(
    (value) => {
      if (typeof FileList !== "undefined" && value instanceof FileList) {
        return value.length > 0 ? value.item(0) : undefined;
      }
      if (value === null || value === "") {
        return undefined;
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
        message: `${fieldLabel} harus berformat JPG, JPEG, PNG, JFIF, SVG, GIF atau WEBP`,
      })
      .optional(),
  );
