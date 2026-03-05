import { DeleteItemResponse } from "@/@types/item.type";
import { deleteItemServices } from "@/api/services";
import { handleErrorResponse } from "@/lib/handler";
import { useMutation } from "@tanstack/react-query";

const fetch = async (id: string): Promise<DeleteItemResponse> => {
  try {
    const results = await deleteItemServices(id);
    return results.data;
  } catch (err: unknown) {
    return handleErrorResponse(err);
  }
};

export const useDeleteItem = () => {
  return useMutation({
    mutationFn: (id: string) => fetch(id),
  });
};
