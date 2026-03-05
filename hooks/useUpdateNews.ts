import { UpdateNewsResponse } from "@/@types/news.type";
import { updateNewsServices } from "@/api/services";
import { handleErrorResponse } from "@/lib/handler";
import { UpdateNewsPayloadService } from "@/validator/news.schema";
import { useMutation } from "@tanstack/react-query";

const fetch = async (
  payload: UpdateNewsPayloadService,
): Promise<UpdateNewsResponse> => {
  try {
    const results = await updateNewsServices(payload);
    return results.data;
  } catch (err: unknown) {
    return handleErrorResponse(err);
  }
};

export const useUpdateNews = () => {
  return useMutation({
    mutationFn: (payload: UpdateNewsPayloadService) => fetch(payload),
  });
};
