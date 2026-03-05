"use client";

import { Item } from "@/@types/item.type";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { CopyIcon, MoreHorizontalIcon } from "lucide-react";
import UpdateItem from "./_form/update.item";
import { GetParams } from "@/@types/global.type";

export const columns = (params?: GetParams): ColumnDef<Item>[] => [
  {
    accessorKey: "image_url",
    header: "Gambar",
    enableSorting: true,
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div>
          <img
            src={data.image_url}
            alt={data.title}
            className="aspect-square rounded-md w-15 object-cover"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Nama Item",
    cell: ({ row }) => {
      const data = row.original;
      return <div className="w-40">{data.title}</div>;
    },
  },
  {
    accessorKey: "price",
    header: "Harga",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="w-30">Rp {data.price.toLocaleString("id-ID")}</div>
      );
    },
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="w-20">
          {data.unlimited_stock
            ? "Unlimited"
            : data.stock.toLocaleString("id-ID")}
        </div>
      );
    },
  },
  {
    accessorKey: "seller_name",
    header: "Seller",
    cell: ({ row }) => {
      const data = row.original;
      return <div className="w-30">{data.seller_name}</div>;
    },
  },
  {
    accessorKey: "sku_code",
    header: "SKU",
    cell: ({ row }) => {
      const data = row.original;
      return <div className="w-30">{data.sku_code}</div>;
    },
  },
  {
    id: "actions",
    header: () => {
      return <span>Tindakan</span>;
    },
    enableSorting: false,
    cell: ({ row }) => {
      const data = row.original;
      const id = data.id;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <span className="sr-only">Open Menu</span>
              <MoreHorizontalIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="font-sans">
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(id)}>
              <CopyIcon /> Copy ID
            </DropdownMenuItem>
            <UpdateItem params={params} item={data} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
