import { HttpStatusCode } from "axios";
import { Meta } from "./global.type";

export interface Item {
  id: string;
  title: string;
  image_url: string;
  price: number;
  stock: number;
  unlimited_stock: boolean;
  seller_name: string;
  sku_code: string;
  created_at: string;
  updated_at: string;
  category_id: string;
}

export interface GetItemResponse {
  status: HttpStatusCode;
  message: string;
  data: Item[] | null;
  meta: Meta | null;
  errors: null;
}

export interface CreateItemResponse {
  status: HttpStatusCode;
  message: string;
  data: Item | null;
  meta: null;
  errors: null;
}

export interface UpdateItemResponse {
  status: HttpStatusCode;
  message: string;
  data: Item | null;
  meta: null;
  errors: null;
}
