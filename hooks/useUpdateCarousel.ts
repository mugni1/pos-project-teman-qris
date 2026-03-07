import { UpdateCarouselResponse } from "@/@types/carousel.type";
import { updateCarouselServices } from "@/api/services";
import { handleErrorResponse } from "@/lib/handler";
import { UpdateCarouselPayloadService } from "@/validator/carousel.schema";
import { useMutation } from "@tanstack/react-query";

const fetch = async (
  payload: UpdateCarouselPayloadService,
): Promise<UpdateCarouselResponse> => {
  try {
    const results = await updateCarouselServices(payload);
    return results.data;
  } catch (err: unknown) {
    return handleErrorResponse(err);
  }
};

export const useUpdateCarousel = () => {
  return useMutation({
    mutationFn: (payload: UpdateCarouselPayloadService) => fetch(payload),
  });
};
