import { GetCategoryResponse } from "@/@types/category.type";
import { GetParams } from "@/@types/global.type";
import { getCategoryServices } from "@/api/services";
import { handleErrorResponse } from "@/lib/handler";
import { useQuery } from "@tanstack/react-query";

const fetch = async (params?: GetParams): Promise<GetCategoryResponse> => {
  try {
    const results = await getCategoryServices(params);
    return results.data;
  } catch (err: unknown) {
    return handleErrorResponse(err);
  }
};

export const useGetCategory = (params?: GetParams) => {
  return useQuery({
    queryKey: ["useGetCategory", params],
    queryFn: () => fetch(params),
  });
};
