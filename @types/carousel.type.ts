import { HttpStatusCode } from "axios";
import { Meta } from "./global.type";

export interface Carousel {
  id: string;
  title: string;
  description: string;
  image_url: string;
  link: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface GetCarouselResponse {
  status: HttpStatusCode;
  message: string;
  data: Carousel[] | null;
  meta: Meta | null;
  errors: null;
}

export interface CreateCarouselResponse {
  status: HttpStatusCode;
  message: string;
  data: Carousel | null;
  meta: null;
  errors: null;
}

export interface UpdateCarouselResponse {
  status: HttpStatusCode;
  message: string;
  data: Carousel | null;
  meta: null;
  errors: null;
}

export interface DeleteCarouselResponse {
  status: HttpStatusCode;
  message: string;
  data: Carousel | null;
  meta: null;
  errors: null;
}
