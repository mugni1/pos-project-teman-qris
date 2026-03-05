import { DeleteNewsResponse } from "@/@types/news.type";
import { deleteNewsServices } from "@/api/services";
import { handleErrorResponse } from "@/lib/handler";
import { useMutation } from "@tanstack/react-query";

const fetch = async (id: string): Promise<DeleteNewsResponse> => {
  try {
    const results = await deleteNewsServices(id);
    return results.data;
  } catch (err: unknown) {
    return handleErrorResponse(err);
  }
};

export const useDeleteNews = () => {
  return useMutation({
    mutationFn: (id: string) => fetch(id),
  });
};
