"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowUpDownIcon,
  SearchIcon,
} from "lucide-react";
import { ReactNode } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isPending: boolean;
  search: string;
  setSearch: (value: string) => void;
  page: number;
  limit: number;
  total: number;
  onPageChange: (nextPage: number) => void;
  orderBy: string;
  sortBy: "asc" | "desc";
  onSortChange: (nextOrderBy: string, nextSortBy: "asc" | "desc") => void;
  createSlot?: ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isPending,
  search,
  setSearch,
  page,
  limit,
  total,
  onPageChange,
  orderBy,
  sortBy,
  onSortChange,
  createSlot,
}: DataTableProps<TData, TValue>) {
  // state
  const sorting: SortingState = [{ id: orderBy, desc: sortBy === "desc" }];
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const canPreviousPage = page > 1;
  const canNextPage = page < totalPages;
  const shouldShowSimplePagination = totalPages <= 7;
  const middlePages = [page - 1, page, page + 1].filter(
    (pageNumber) => pageNumber > 1 && pageNumber < totalPages,
  );

  // table
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    enableSortingRemoval: false,
    onSortingChange: (updater) => {
      const nextSorting =
        typeof updater === "function" ? updater(sorting) : updater;

      if (!nextSorting.length) {
        return;
      }

      const next = nextSorting[0];
      onSortChange(String(next.id), next.desc ? "desc" : "asc");
    },
    state: {
      sorting,
    },
  });

  // render
  return (
    <div className="space-y-4">
      {/* search  */}
      <div className="flex flex-col md:flex-row justify-between gap-2">
        <InputGroup className="max-w-sm">
          <InputGroupInput
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
        {createSlot}
      </div>

      {/* table  */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const isSorted = header.column.getIsSorted();
                  return (
                    <TableHead key={header.id} className="px-4">
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <Button
                          variant="ghost"
                          className="h-auto px-0! font-semibold"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {isSorted === "asc" ? (
                            <ArrowUpIcon className="ml-2 size-4" />
                          ) : isSorted === "desc" ? (
                            <ArrowDownIcon className="ml-2 size-4" />
                          ) : (
                            <ArrowUpDownIcon className="ml-2 size-4" />
                          )}
                        </Button>
                      ) : (
                        <div className="font-semibold">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isPending ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Tidak ada data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* pagination  */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-muted-foreground flex-1 text-sm">
          Halaman {page} dari {totalPages} ({total} total data)
        </div>
        <Pagination className="mx-0 w-auto justify-start sm:justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  if (!canPreviousPage || isPending) return;
                  onPageChange(page - 1);
                }}
                aria-disabled={!canPreviousPage || isPending}
                className={
                  !canPreviousPage || isPending
                    ? "pointer-events-none opacity-50"
                    : undefined
                }
              />
            </PaginationItem>

            {shouldShowSimplePagination ? (
              Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href="#"
                      isActive={pageNumber === page}
                      onClick={(event) => {
                        event.preventDefault();
                        if (isPending || pageNumber === page) return;
                        onPageChange(pageNumber);
                      }}
                      aria-disabled={isPending}
                      className={isPending ? "pointer-events-none" : undefined}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )
            ) : (
              <>
                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive={page === 1}
                    onClick={(event) => {
                      event.preventDefault();
                      if (isPending || page === 1) return;
                      onPageChange(1);
                    }}
                    aria-disabled={isPending}
                    className={isPending ? "pointer-events-none" : undefined}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>

                {page > 3 ? (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : null}

                {middlePages.map((pageNumber) => (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href="#"
                      isActive={pageNumber === page}
                      onClick={(event) => {
                        event.preventDefault();
                        if (isPending || pageNumber === page) return;
                        onPageChange(pageNumber);
                      }}
                      aria-disabled={isPending}
                      className={isPending ? "pointer-events-none" : undefined}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {page < totalPages - 2 ? (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : null}

                <PaginationItem>
                  <PaginationLink
                    href="#"
                    isActive={page === totalPages}
                    onClick={(event) => {
                      event.preventDefault();
                      if (isPending || page === totalPages) return;
                      onPageChange(totalPages);
                    }}
                    aria-disabled={isPending}
                    className={isPending ? "pointer-events-none" : undefined}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(event) => {
                  event.preventDefault();
                  if (!canNextPage || isPending) return;
                  onPageChange(page + 1);
                }}
                aria-disabled={!canNextPage || isPending}
                className={
                  !canNextPage || isPending
                    ? "pointer-events-none opacity-50"
                    : undefined
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
