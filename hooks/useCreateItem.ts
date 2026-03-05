import { CreateItemResponse } from "@/@types/item.type";
import { createItemServices } from "@/api/services";
import { handleErrorResponse } from "@/lib/handler";
import { CreateItemPayloadService } from "@/validator/item.schema";
import { useMutation } from "@tanstack/react-query";

const fetch = async (
  payload: CreateItemPayloadService,
): Promise<CreateItemResponse> => {
  try {
    const results = await createItemServices(payload);
    return results.data;
  } catch (err: unknown) {
    return handleErrorResponse(err);
  }
};

export const useCreateItem = () => {
  return useMutation({
    mutationFn: (payload: CreateItemPayloadService) => fetch(payload),
  });
};
