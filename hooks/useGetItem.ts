import { GetParams } from "@/@types/global.type";
import { GetItemResponse } from "@/@types/item.type";
import { getItemServices } from "@/api/services";
import { handleErrorResponse } from "@/lib/handler";
import { useQuery } from "@tanstack/react-query";

const fetch = async (params?: GetParams): Promise<GetItemResponse> => {
  try {
    const results = await getItemServices(params);
    return results.data;
  } catch (err: unknown) {
    return handleErrorResponse(err);
  }
};

export const useGetItem = (params?: GetParams) => {
  return useQuery({
    queryKey: ["useGetItem", params],
    queryFn: () => fetch(params),
  });
};
