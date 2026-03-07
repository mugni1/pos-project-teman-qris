import { GetParams } from "@/@types/global.type";
import { GetCarouselResponse } from "@/@types/carousel.type";
import { getCarouselServices } from "@/api/services";
import { handleErrorResponse } from "@/lib/handler";
import { useQuery } from "@tanstack/react-query";

const fetch = async (params?: GetParams): Promise<GetCarouselResponse> => {
  try {
    const results = await getCarouselServices(params);
    return results.data;
  } catch (err: unknown) {
    return handleErrorResponse(err);
  }
};

export const useGetCarousel = (params?: GetParams) => {
  return useQuery({
    queryKey: ["useGetCarousel", params],
    queryFn: () => fetch(params),
  });
};
