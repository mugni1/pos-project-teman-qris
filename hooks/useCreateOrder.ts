import { CreateCategoryResponse } from "@/@types/category.type";
import { createCategoryServices } from "@/api/services";
import { handleErrorResponse } from "@/lib/handler";
import { CreateCategoryPayloadService } from "@/validator/category.schema";
import { useMutation } from "@tanstack/react-query";

const fetch = async (
  payload: CreateCategoryPayloadService,
): Promise<CreateCategoryResponse> => {
  try {
    const results = await createCategoryServices(payload);
    return results.data;
  } catch (err: unknown) {
    return handleErrorResponse(err);
  }
};

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: (payload: CreateCategoryPayloadService) => fetch(payload),
  });
};
