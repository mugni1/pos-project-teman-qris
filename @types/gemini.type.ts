import { HttpStatusCode } from "axios";

export interface GenerateNewsResponse {
  status: HttpStatusCode;
  message: string;
  data: {
    title: string;
    summary: string;
    content: string;
    tags: string[];
  } | null;
  meta: null;
  errors: null;
}
