"use client";

import { User } from "@/@types/user.type";
import { columns } from "@/app/(root)/account/column";
import { DataTable } from "@/components/layout/data-table";
import { useGetUser } from "@/hooks/useGetUser";
import { useEffect, useState } from "react";

export default function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [searchDeb, setSearchDeb] = useState("");
  const [page, setPage] = useState("1");
  const [limit] = useState("10");
  const [orderBy, setOrderBy] = useState("created_at");
  const [sortBy, setSortBy] = useState<"asc" | "desc">("desc");

  // get user
  const params = {
    search: searchDeb,
    limit,
    page,
    order_by: orderBy,
    sort_by: sortBy,
  };
  const { data, isPending } = useGetUser(params);

  // debounce
  useEffect(() => {
    if (data && data.data) {
      setUsers(data.data);
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
      columns={columns}
      data={users}
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
