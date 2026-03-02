"use client";

import { News } from "@/@types/news.type";
import { columns } from "@/app/(root)/news/column";
import { DataTable } from "@/components/layout/data-table";
import { Button } from "@/components/ui/button";
import { useGetNews } from "@/hooks/useGetNews";
import { PlusIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function Page() {
  const [search, setSearch] = useState("");
  const [searchDeb, setSearchDeb] = useState("");
  const [page, setPage] = useState("1");
  const [limit] = useState("5");
  const [orderBy, setOrderBy] = useState("created_at");
  const [sortBy, setSortBy] = useState<"asc" | "desc">("desc");

  const { data, isPending } = useGetNews({
    search: searchDeb,
    limit,
    page,
    order_by: orderBy,
    sort_by: sortBy,
  });

  const news = useMemo<News[]>(() => data?.data ?? [], [data?.data]);

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
      columns={columns}
      data={news}
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
      createSlot={
        <Button type="button">
          <PlusIcon className="size-4" />
          Tambah News
        </Button>
      }
    />
  );
}
