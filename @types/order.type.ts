import { HttpStatusCode } from "axios";
import { Meta } from "./global.type";

export interface OrderCategory {
  image_url: string;
  title: string;
}

export interface OrderItem {
  id: string;
  title: string;
  category_id: string;
  category: OrderCategory;
}

export interface Order {
  id: string;
  transaction_id: string;
  transaction_invoice: string | null;
  amount: number;
  destination: string;
  destination_second: string | null;
  status:
    | "pending"
    | "waiting"
    | "processing"
    | "paid"
    | "expired"
    | "failed"
    | "error"
    | "cancelled"
    | "success";
  expires_at: string;
  paid_at: string | null;
  created_at: string;
  item_id: string;
  item: OrderItem;
}

export interface GetOrderResponse {
  status: HttpStatusCode;
  message: string;
  data: Order[] | null;
  meta: Meta | null;
  errors: null;
}
