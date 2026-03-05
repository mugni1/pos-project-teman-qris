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
        message: `${fieldLabel} harus berformat JPG, JPEG, PNG, JFIF, SVG, GIF atau WEBP`,
      }),
  );

export const createItemSchema = z.object({
  title: z
    .string({ message: "Judul wajib diisi" })
    .min(1, "Judul wajib diisi")
    .max(50, "Maksimal judul adalah 50 karakter"),
  image: createImageSchema("Gambar"),
  price: z.coerce
    .number({ message: "Harga harus berupa angka" })
    .min(1000, "Harga minimal adalah Rp 1000"),
  stock: z.coerce
    .number({ message: "Stok harus berupa angka" })
    .min(0, "Stok minimal adalah 0"),
  unlimited_stock: z.boolean({
    message: "Unlimited stock harus berupa boolean (true/false)",
  }),
  seller_name: z
    .string({ message: "Nama penjual wajib diisi" })
    .min(1, "Nama penjual wajib diisi")
    .max(50, "Maksimal nama penjual adalah 50 karakter"),
  sku_code: z
    .string({ message: "Kode SKU wajib diisi" })
    .min(1, "Kode SKU wajib diisi")
    .max(10, "Maksimal kode SKU adalah 10 karakter"),
  category_id: z
    .string({ message: "Kategori wajib dipilih" })
    .min(1, "Kategori wajib dipilih"),
});
export type CreateItemPayload = z.infer<typeof createItemSchema>;
export type CreateItemPayloadService = Omit<CreateItemPayload, "image"> & {
  image_url: string;
};
