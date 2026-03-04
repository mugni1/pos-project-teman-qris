"use client";

import { Category } from "@/@types/category.type";
import { columns } from "@/app/(root)/category/column";
import { DataTable } from "@/components/layout/data-table";
import { useGetCategory } from "@/hooks/useGetCategory";
import { useEffect, useState } from "react";
import { AddCategory } from "./_form/add.category";

export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [searchDeb, setSearchDeb] = useState("");
  const [page, setPage] = useState("1");
  const [limit] = useState("5");
  const [orderBy, setOrderBy] = useState("created_at");
  const [sortBy, setSortBy] = useState<"asc" | "desc">("desc");

  // get category
  const params = {
    search: searchDeb,
    limit,
    page,
    order_by: orderBy,
    sort_by: sortBy,
  };
  const { data, isPending } = useGetCategory(params);

  // debounce
  useEffect(() => {
    if (data && data.data) {
      setCategories(data.data);
    }
  }, [data]);
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchDeb(search);
      setPage("1");
    }, 1000);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  // render
  return (
    <DataTable
      columns={columns(params)}
      data={categories}
      isPending={isPending}
      search={search}
      setSearch={setSearch}
      page={Number(page)}
      limit={Number(limit)}
      total={data?.meta?.total ?? 0}
      onPageChange={(nextPage) => setPage(String(nextPage))}
      orderBy={orderBy}
      sortBy={sortBy}
      onSortChange={(nextOrderBy, nextSortBy) => {
        setOrderBy(nextOrderBy);
        setSortBy(nextSortBy);
        setPage("1");
      }}
      createSlot={<AddCategory getParams={params} />}
    />
  );
}
