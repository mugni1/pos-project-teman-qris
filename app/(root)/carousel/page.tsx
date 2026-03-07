"use client";

import { Carousel } from "@/@types/carousel.type";
import { columns } from "@/app/(root)/carousel/column";
import { DataTable } from "@/components/layout/data-table";
import { useGetCarousel } from "@/hooks/useGetCarousel";
import { useEffect, useMemo, useState } from "react";

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

  const { data, isPending } = useGetCarousel(params);

  const carousels = useMemo<Carousel[]>(() => data?.data ?? [], [data?.data]);

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
      data={carousels}
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
    />
  );
}
