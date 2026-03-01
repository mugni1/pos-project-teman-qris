import { AxiosError } from "axios";

export const handleErrorResponse = (error: unknown) => {
  let message = "Internal Server Error";
  let status = 500;
  if (error instanceof AxiosError) {
    message = error.response?.data?.message || error.message;
    status = error.response?.data?.status || 500;
  } else if (error instanceof Error) {
    message = error.message;
  }
  return {
    status: status,
    message: message,
    data: null,
    meta: null,
    errors: null,
  };
};

export const handleErrorCreateQrisPwResponse = (error: unknown) => {
  let message = "Internal Server Error";
  if (error instanceof AxiosError) {
    message = error.response?.data?.message || error.message;
  } else if (error instanceof Error) {
    message = error.message;
  }
  return {
    success: null,
    transaction_id: null,
    order_id: null,
    amount: null,
    qris_url: null,
    qris_string: null,
    expires_at: null,
    created_at: null,
    provider: null,
  };
};
