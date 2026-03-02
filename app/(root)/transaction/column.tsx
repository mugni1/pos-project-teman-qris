"use client";

import { Order } from "@/@types/order.type";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

const STATUS_CLASSNAME: Record<Order["status"], string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  waiting: "bg-amber-100 text-amber-800 border-amber-200",
  processing: "bg-blue-100 text-blue-800 border-blue-200",
  paid: "bg-emerald-100 text-emerald-800 border-emerald-200",
  success: "bg-green-100 text-green-800 border-green-200",
  expired: "bg-zinc-200 text-zinc-700 border-zinc-300",
  failed: "bg-red-100 text-red-800 border-red-200",
  error: "bg-red-100 text-red-800 border-red-200",
  cancelled: "bg-slate-200 text-slate-700 border-slate-300",
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "transaction_id",
    header: "ID Transaksi",
    enableSorting: true,
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="w-42 break-all text-xs font-medium">
          {data.transaction_id}
        </div>
      );
    },
  },
  {
    accessorKey: "item.title",
    header: "Produk",
    enableSorting: false,
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="w-32">
          <p className="font-medium leading-tight">{data.item.title}</p>
          <p className="text-muted-foreground text-xs">
            {data.item.category.title}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "destination",
    header: "Tujuan",
    enableSorting: false,
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="w-36 break-all text-sm">
          {data.destination}{" "}
          {data.destination_second ? `(${data.destination_second})` : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Nominal",
    enableSorting: true,
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="w-28 font-medium">
          Rp {data.amount.toLocaleString("id-ID")}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: true,
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Badge
          variant="outline"
          className={`capitalize border ${STATUS_CLASSNAME[data.status]}`}
        >
          {data.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Dibuat",
    enableSorting: true,
    cell: ({ row }) => {
      const data = row.original;
      const date = new Date(data.created_at);
      return (
        <div className="w-44 text-sm">
          {date.toLocaleString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "expires_at",
    header: "Kadaluwarsa",
    enableSorting: true,
    cell: ({ row }) => {
      const data = row.original;
      const date = new Date(data.expires_at);
      return (
        <div className="w-44 text-sm">
          {date.toLocaleString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "paid_at",
    header: "Dibayar",
    enableSorting: true,
    cell: ({ row }) => {
      const data = row.original;
      const date = new Date(data.paid_at ?? "");
      return (
        <div className="w-44 text-sm">
          {data.paid_at
            ? date.toLocaleString("id-ID", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "-"}
        </div>
      );
    },
  },
];
