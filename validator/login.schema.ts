import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Harap masukan email." })
    .email("Harap masukan email dengan benar."),
  password: z
    .string({ required_error: "Harap masukan password." })
    .min(8, "Minimal memiliki 8 karakter.")
    .max(12, "Maksimal memiliki 12 karakter."),
});
