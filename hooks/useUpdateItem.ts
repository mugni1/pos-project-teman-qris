import { UpdateItemResponse } from "@/@types/item.type";
import { updateItemServices } from "./../api/services";
import { handleErrorResponse } from "@/lib/handler";
import { useMutation } from "@tanstack/react-query";
import { UpdateItemPayloadService } from "@/validator/item.schema";

const fetch = async (
  payload: UpdateItemPayloadService,
): Promise<UpdateItemResponse> => {
  try {
    const results = await updateItemServices(payload);
    return results.data;
  } catch (err: unknown) {
    return handleErrorResponse(err);
  }
};

export const useUpdateItem = () => {
  return useMutation({
    mutationFn: (payload: UpdateItemPayloadService) => fetch(payload),
  });
};
