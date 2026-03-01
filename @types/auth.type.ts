import { HttpStatusCode } from "axios";

export interface UserLogin {
  id: string;
  email: string;
  firstname: string;
  avatar: null | string;
  lastname: string;
  fullname: string;
  provider: "default" | "google";
  role: "super_user" | "user";
  created_at: string;
  updated_at: string;
}
export interface LoginResponse {
  status: HttpStatusCode;
  message: string;
  data: {
    token: string;
    user: UserLogin;
  } | null;
  meta: null;
  errors: null;
}
