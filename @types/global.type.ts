export interface Meta {
  search: string;
  limit: number;
  page: number;
  offset: number;
  order_by: string;
  sort_by: "desc" | "asc";
  total: number;
}

export interface GetParams {
  search?: string;
  limit?: string;
  page?: string;
  order_by?: string;
  sort_by?: "asc" | "desc";
}
