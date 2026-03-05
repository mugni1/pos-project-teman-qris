import z from "zod";
import { loginSchema } from "@/validator/login.schema";
import { httpClient } from "./httpClient";
import { ENDPOINT } from "./endpoint";
import { AxiosResponse } from "axios";
import { LoginResponse } from "@/@types/auth.type";
import { GetParams } from "@/@types/global.type";
import {
  CreateCategoryResponse,
  DeleteCategoryResponse,
  GetCategoryResponse,
  UpdateCategoryResponse,
} from "@/@types/category.type";
import { CreateItemResponse, GetItemResponse } from "@/@types/item.type";
import { GetOrderResponse } from "@/@types/order.type";
import { GetNewsResponse } from "@/@types/news.type";
import {
  CreateCategoryPayloadService,
  UpdateCategoryPayloadService,
} from "@/validator/category.schema";
import { UploadResponse } from "@/@types/upload.type";
import { CreateItemPayloadService } from "@/validator/item.schema";

export const uploadServices = async (
  file: File,
): Promise<AxiosResponse<UploadResponse>> => {
  const formData = new FormData();
  formData.append("image", file);
  return httpClient.post(ENDPOINT.UPLOAD, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

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
export const createCategoryServices = async (
  payload: CreateCategoryPayloadService,
): Promise<AxiosResponse<CreateCategoryResponse>> => {
  return httpClient.post(ENDPOINT.CATEGORY, payload);
};
export const updateCategoryServices = async (
  payload: UpdateCategoryPayloadService,
): Promise<AxiosResponse<UpdateCategoryResponse>> => {
  return httpClient.put(`${ENDPOINT.CATEGORY}/${payload.id}`, payload);
};
export const deleteCategoryServices = async (
  id: string,
): Promise<AxiosResponse<DeleteCategoryResponse>> => {
  return httpClient.delete(`${ENDPOINT.CATEGORY}/${id}`);
};

export const getItemServices = async (
  params?: GetParams,
): Promise<AxiosResponse<GetItemResponse>> => {
  return httpClient.get(ENDPOINT.ITEM, { params });
};
export const createItemServices = async (
  payload?: CreateItemPayloadService,
): Promise<AxiosResponse<CreateItemResponse>> => {
  return httpClient.post(ENDPOINT.ITEM, payload);
};

export const getOrderServices = async (
  params?: GetParams,
): Promise<AxiosResponse<GetOrderResponse>> => {
  return httpClient.get(ENDPOINT.ORDER, { params });
};

export const getNewsServices = async (
  params?: GetParams,
): Promise<AxiosResponse<GetNewsResponse>> => {
  return httpClient.get(ENDPOINT.NEWS, { params });
};
