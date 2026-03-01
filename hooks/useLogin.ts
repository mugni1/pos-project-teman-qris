import { LoginResponse } from "@/@types/auth.type";
import { loginServices } from "@/api/services";
import { handleErrorResponse } from "@/lib/handler";
import { loginSchema } from "@/validator/login.schema";
import { useMutation } from "@tanstack/react-query";
import z from "zod";

const fetch = async (
  payload: z.infer<typeof loginSchema>,
): Promise<LoginResponse> => {
  try {
    const results = await loginServices(payload);
    return results.data;
  } catch (err: unknown) {
    return handleErrorResponse(err);
  }
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (payload: z.infer<typeof loginSchema>) => fetch(payload),
  });
};
