import z from "zod";
import { loginSchema } from "@/validator/login.schema";
import { httpClient } from "./httpClient";
import { ENDPOINT } from "./endpoint";
import { AxiosResponse } from "axios";
import { LoginResponse } from "@/@types/auth.type";
import { GetParams } from "@/@types/global.type";
import { GetCategoryResponse } from "@/@types/category.type";
import { GetItemResponse } from "@/@types/item.type";

export const loginServices = async (
  payload: z.infer<typeof loginSchema>,
): Promise<AxiosResponse<LoginResponse>> => {
  return httpClient.post(ENDPOINT.LOGIN, payload);
};

export const getCategoryServices = async (
  params?: GetParams,
): Promise<AxiosResponse<GetCategoryResponse>> => {
  return httpClient.get(ENDPOINT.CATEGORY, { params });
};

export const getItemServices = async (
  params?: GetParams,
): Promise<AxiosResponse<GetItemResponse>> => {
  return httpClient.get(ENDPOINT.ITEM, { params });
};
