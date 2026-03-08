import * as z from "zod";

export const generateNewsSchema = z.object({
  topic: z
    .string({ message: "Topik wajib diisi" })
    .min(10, "Minimal topik harus terdiri dari 10 karakter")
    .max(150, "Maksimal topik adalah 150 karakter"),
});
export type GenerateNewsPayload = z.infer<typeof generateNewsSchema>;
