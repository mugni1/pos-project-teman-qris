import { GetParams } from "@/@types/global.type";
import { GetNewsResponse } from "@/@types/news.type";
import { getNewsServices } from "@/api/services";
import { handleErrorResponse } from "@/lib/handler";
import { useQuery } from "@tanstack/react-query";

const fetch = async (params?: GetParams): Promise<GetNewsResponse> => {
  try {
    const results = await getNewsServices(params);
    return results.data;
  } catch (err: unknown) {
    return handleErrorResponse(err);
  }
};

export const useGetNews = (params?: GetParams) => {
  return useQuery({
    queryKey: ["useGetNews", params],
    queryFn: () => fetch(params),
  });
};
