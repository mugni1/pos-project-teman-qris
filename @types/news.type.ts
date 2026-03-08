import { HttpStatusCode } from "axios";
import { Meta } from "./global.type";

export interface News {
  id: string;
  image_url: string;
  title: string;
  content: string;
  summary: string;
  created_at: string;
  updated_at: string;
}

export interface GetNewsResponse {
  status: HttpStatusCode;
  message: string;
  data: News[] | null;
  meta: Meta | null;
  errors: null;
}

export interface CreateNewsResponse {
  status: HttpStatusCode;
  message: string;
  data: News | null;
  meta: null;
  errors: null;
}

export interface UpdateNewsResponse {
  status: HttpStatusCode;
  message: string;
  data: News | null;
  meta: null;
  errors: null;
}

export interface DeleteNewsResponse {
  status: HttpStatusCode;
  message: string;
  data: News | null;
  meta: null;
  errors: null;
}
