import { GenerateNewsResponse } from "@/@types/gemini.type";
import { generateNewsServices } from "@/api/services";
import { handleErrorResponse } from "@/lib/handler";
import { GenerateNewsPayload } from "@/validator/gemini.schema";
import { useMutation } from "@tanstack/react-query";

const fetch = async (
  payload: GenerateNewsPayload,
): Promise<GenerateNewsResponse> => {
  try {
    const results = await generateNewsServices(payload);
    return results.data;
  } catch (err: unknown) {
    return handleErrorResponse(err);
  }
};

export const useGenerateNews = () => {
  return useMutation({
    mutationFn: (payload: GenerateNewsPayload) => fetch(payload),
  });
};
