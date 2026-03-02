import { GetParams } from "@/@types/global.type";
import { GetOrderResponse } from "@/@types/order.type";
import { getOrderServices } from "@/api/services";
import { handleErrorResponse } from "@/lib/handler";
import { useQuery } from "@tanstack/react-query";

const fetch = async (params?: GetParams): Promise<GetOrderResponse> => {
  try {
    const results = await getOrderServices(params);
    return results.data;
  } catch (err: unknown) {
    return handleErrorResponse(err);
  }
};

export const useGetOrder = (params?: GetParams) => {
  return useQuery({
    queryKey: ["useGetOrder", params],
    queryFn: () => fetch(params),
  });
};
