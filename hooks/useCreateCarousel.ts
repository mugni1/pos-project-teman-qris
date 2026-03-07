import { CreateCarouselResponse } from "@/@types/carousel.type";
import { createCarouselServices } from "@/api/services";
import { handleErrorResponse } from "@/lib/handler";
import { CreateCarouselPayloadService } from "@/validator/carousel.schema";
import { useMutation } from "@tanstack/react-query";

const fetch = async (
  payload: CreateCarouselPayloadService,
): Promise<CreateCarouselResponse> => {
  try {
    const results = await createCarouselServices(payload);
    return results.data;
  } catch (err: unknown) {
    return handleErrorResponse(err);
  }
};

export const useCreateCarousel = () => {
  return useMutation({
    mutationFn: (payload: CreateCarouselPayloadService) => fetch(payload),
  });
};
