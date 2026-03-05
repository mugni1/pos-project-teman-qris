"use client";

import { Item } from "@/@types/item.type";
import { columns } from "@/app/(root)/item/column";
import { DataTable } from "@/components/layout/data-table";
import { useGetItem } from "@/hooks/useGetItem";
import { useEffect, useMemo, useState } from "react";
import CreateItem from "./_form/create.item";

export default function Page() {
  const [search, setSearch] = useState("");
  const [searchDeb, setSearchDeb] = useState("");
  const [page, setPage] = useState("1");
  const [limit] = useState("5");
  const [orderBy, setOrderBy] = useState("created_at");
  const [sortBy, setSortBy] = useState<"asc" | "desc">("desc");

  const params = {
    search: searchDeb,
    limit,
    page,
    order_by: orderBy,
    sort_by: sortBy,
  };

  const { data, isPending } = useGetItem(params);

  const items = useMemo<Item[]>(() => data?.data ?? [], [data?.data]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchDeb(search);
      setPage("1");
    }, 1000);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  return (
    <DataTable
      columns={columns(params)}
      data={items}
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
      createSlot={<CreateItem getParams={params} />}
    />
  );
}
