import { DeleteCarouselResponse } from "@/@types/carousel.type";
import { deleteCarouselServices } from "@/api/services";
import { handleErrorResponse } from "@/lib/handler";
import { useMutation } from "@tanstack/react-query";

const fetch = async (id: string): Promise<DeleteCarouselResponse> => {
  try {
    const results = await deleteCarouselServices(id);
    return results.data;
  } catch (err: unknown) {
    return handleErrorResponse(err);
  }
};

export const useDeleteCarousel = () => {
  return useMutation({
    mutationFn: (id: string) => fetch(id),
  });
};
