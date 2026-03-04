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
import { Eye, MoreHorizontalIcon, PencilIcon, TrashIcon } from "lucide-react";

export const columns: ColumnDef<Item>[] = [
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
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <span className="sr-only">Open Menu</span>
              <MoreHorizontalIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="font-sans">
            <DropdownMenuItem>
              <Eye /> Lihat
            </DropdownMenuItem>
            <DropdownMenuItem>
              <PencilIcon /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive">
              <TrashIcon /> Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
