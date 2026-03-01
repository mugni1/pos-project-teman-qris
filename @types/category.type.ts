import { HttpStatusCode } from "axios";
import { Meta } from "./global.type";

export interface Category {
  id: string;
  title: string;
  studio: string;
  image_url: string;
  cover_url: string;
  column_1: boolean;
  column_2: boolean;
  column_1_title: string;
  column_2_title: string;
  type: string;
  created_at: string;
  updated_at: string;
}

export interface GetCategoryResponse {
  status: HttpStatusCode;
  message: string;
  data: Category[] | null;
  meta: Meta | null;
  errors: null;
}
