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
import {
  CreateItemResponse,
  DeleteItemResponse,
  GetItemResponse,
  UpdateItemResponse,
} from "@/@types/item.type";
import { GetOrderResponse } from "@/@types/order.type";
import {
  CreateNewsResponse,
  DeleteNewsResponse,
  GetNewsResponse,
  UpdateNewsResponse,
} from "@/@types/news.type";
import {
  CreateCarouselResponse,
  DeleteCarouselResponse,
  GetCarouselResponse,
  UpdateCarouselResponse,
} from "@/@types/carousel.type";
import {
  CreateCategoryPayloadService,
  UpdateCategoryPayloadService,
} from "@/validator/category.schema";
import { UploadResponse } from "@/@types/upload.type";
import {
  CreateItemPayloadService,
  UpdateItemPayloadService,
} from "@/validator/item.schema";
import {
  CreateNewsPayloadService,
  UpdateNewsPayloadService,
} from "@/validator/news.schema";
import {
  CreateCarouselPayloadService,
  UpdateCarouselPayloadService,
} from "@/validator/carousel.schema";
import { GetUserResponse } from "@/@types/user.type";
import { GenerateNewsResponse } from "@/@types/gemini.type";
import { GenerateNewsPayload } from "@/validator/gemini.schema";

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
export const updateItemServices = async (
  payload: UpdateItemPayloadService,
): Promise<AxiosResponse<UpdateItemResponse>> => {
  return httpClient.put(`${ENDPOINT.ITEM}/${payload.id}`, payload);
};
export const deleteItemServices = async (
  id: string,
): Promise<AxiosResponse<DeleteItemResponse>> => {
  return httpClient.delete(`${ENDPOINT.ITEM}/${id}`);
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
export const generateNewsServices = async (
  payload: GenerateNewsPayload,
): Promise<AxiosResponse<GenerateNewsResponse>> => {
  return httpClient.post(ENDPOINT.GEMINI + "/news", payload);
};
export const createNewsServices = async (
  payload: CreateNewsPayloadService,
): Promise<AxiosResponse<CreateNewsResponse>> => {
  return httpClient.post(ENDPOINT.NEWS, payload);
};
export const updateNewsServices = async (
  payload: UpdateNewsPayloadService,
): Promise<AxiosResponse<UpdateNewsResponse>> => {
  return httpClient.put(`${ENDPOINT.NEWS}/${payload.id}`, payload);
};
export const deleteNewsServices = async (
  id: string,
): Promise<AxiosResponse<DeleteNewsResponse>> => {
  return httpClient.delete(`${ENDPOINT.NEWS}/${id}`);
};

export const getCarouselServices = async (
  params?: GetParams,
): Promise<AxiosResponse<GetCarouselResponse>> => {
  return httpClient.get(ENDPOINT.CAROUSEL, { params });
};
export const createCarouselServices = async (
  payload: CreateCarouselPayloadService,
): Promise<AxiosResponse<CreateCarouselResponse>> => {
  return httpClient.post(ENDPOINT.CAROUSEL, payload);
};
export const updateCarouselServices = async (
  payload: UpdateCarouselPayloadService,
): Promise<AxiosResponse<UpdateCarouselResponse>> => {
  return httpClient.put(`${ENDPOINT.CAROUSEL}/${payload.id}`, payload);
};
export const deleteCarouselServices = async (
  id: string,
): Promise<AxiosResponse<DeleteCarouselResponse>> => {
  return httpClient.delete(`${ENDPOINT.CAROUSEL}/${id}`);
};

export const getUserServices = async (
  params?: GetParams,
): Promise<AxiosResponse<GetUserResponse>> => {
  return httpClient.get(ENDPOINT.USER, { params });
};
