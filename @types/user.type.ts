import { HttpStatusCode } from "axios";
import { Meta } from "./global.type";

export interface User {
  id: string;
  email: string;
  firstname: string | null;
  avatar: string | null;
  lastname: string | null;
  fullname: string;
  provider: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface GetUserResponse {
  status: HttpStatusCode;
  message: string;
  data: User[] | null;
  meta: Meta | null;
  errors: null;
}
