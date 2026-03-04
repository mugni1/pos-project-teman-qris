import { DeleteCategoryResponse } from "@/@types/category.type";
import { deleteCategoryServices } from "@/api/services";
import { handleErrorResponse } from "@/lib/handler";
import { useMutation } from "@tanstack/react-query";

const fetch = async (id: string): Promise<DeleteCategoryResponse> => {
  try {
    const results = await deleteCategoryServices(id);
    return results.data;
  } catch (err: unknown) {
    return handleErrorResponse(err);
  }
};

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: (id: string) => fetch(id),
  });
};
