import { UpdateCategoryResponse } from "@/@types/category.type";
import { updateCategoryServices } from "@/api/services";
import { handleErrorResponse } from "@/lib/handler";
import { UpdateCategoryPayloadService } from "@/validator/category.schema";
import { useMutation } from "@tanstack/react-query";

const fetch = async (
  payload: UpdateCategoryPayloadService,
): Promise<UpdateCategoryResponse> => {
  try {
    const results = await updateCategoryServices(payload);
    return results.data;
  } catch (err: unknown) {
    return handleErrorResponse(err);
  }
};

export const useUpdateCategory = () => {
  return useMutation({
    mutationFn: (payload: UpdateCategoryPayloadService) => fetch(payload),
  });
};
