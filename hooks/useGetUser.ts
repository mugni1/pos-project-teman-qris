import { GetUserResponse } from "@/@types/user.type";
import { GetParams } from "@/@types/global.type";
import { getUserServices } from "@/api/services";
import { handleErrorResponse } from "@/lib/handler";
import { useQuery } from "@tanstack/react-query";

const fetch = async (params?: GetParams): Promise<GetUserResponse> => {
  try {
    const results = await getUserServices(params);
    return results.data;
  } catch (err: unknown) {
    return handleErrorResponse(err);
  }
};

export const useGetUser = (params?: GetParams) => {
  return useQuery({
    queryKey: ["useGetUser", params],
    queryFn: () => fetch(params),
  });
};
