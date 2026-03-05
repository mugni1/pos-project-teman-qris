import z from "zod";
import { createImageSchema, updateImageSchema } from "./image.schema";

// create
export const createItemSchema = z.object({
  title: z
    .string({ message: "Judul wajib diisi" })
    .min(1, "Judul wajib diisi")
    .max(50, "Maksimal judul adalah 50 karakter"),
  image: createImageSchema("Gambar"),
  price: z.coerce
    .number({ message: "Harga harus berupa angka" })
    .min(1000, "Harga minimal adalah Rp 1.000"),
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

// Update
export const updateItemSchema = z.object({
  title: z
    .string({ message: "Judul wajib diisi" })
    .min(1, "Judul wajib diisi")
    .max(50, "Maksimal judul adalah 50 karakter")
    .optional(),
  image: updateImageSchema("Gambar").optional(),
  price: z.coerce
    .number({ message: "Harga harus berupa angka" })
    .min(1000, "Harga minimal adalah Rp 1.000")
    .optional(),
  stock: z.coerce
    .number({ message: "Stok harus berupa angka" })
    .min(0, "Stok minimal adalah 0")
    .optional(),
  unlimited_stock: z
    .boolean({
      message: "Unlimited stock harus berupa boolean (true/false)",
    })
    .optional(),
  seller_name: z
    .string({ message: "Nama penjual wajib diisi" })
    .min(1, "Nama penjual wajib diisi")
    .max(50, "Maksimal nama penjual adalah 50 karakter")
    .optional(),
  sku_code: z
    .string({ message: "Kode SKU wajib diisi" })
    .min(1, "Kode SKU wajib diisi")
    .max(10, "Maksimal kode SKU adalah 10 karakter")
    .optional(),
  category_id: z
    .string({ message: "Kategori wajib dipilih" })
    .min(1, "Kategori wajib dipilih")
    .optional(),
});
export type UpdateItemPayload = z.infer<typeof updateItemSchema>;
export type UpdateItemPayloadService = Omit<UpdateItemPayload, "image"> & {
  id: string;
  image_url: string | undefined;
};
