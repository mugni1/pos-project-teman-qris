import { CreateNewsResponse } from "@/@types/news.type";
import { createNewsServices } from "@/api/services";
import { handleErrorResponse } from "@/lib/handler";
import { CreateNewsPayloadService } from "@/validator/news.schema";
import { useMutation } from "@tanstack/react-query";

const fetch = async (
  payload: CreateNewsPayloadService,
): Promise<CreateNewsResponse> => {
  try {
    const results = await createNewsServices(payload);
    return results.data;
  } catch (err: unknown) {
    return handleErrorResponse(err);
  }
};

export const useCreateNews = () => {
  return useMutation({
    mutationFn: (payload: CreateNewsPayloadService) => fetch(payload),
  });
};
