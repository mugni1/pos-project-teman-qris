"use client";

import { Category } from "@/@types/category.type";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, MoreHorizontalIcon, PencilIcon, TrashIcon } from "lucide-react";

export const columns: ColumnDef<Category>[] = [
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
            className="bg-card-foreground aspect-square rounded-md w-20"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Judul",
    cell: ({ row }) => {
      const data = row.original;
      return <div className="w-30">{data.title}</div>;
    },
  },
  {
    accessorKey: "studio",
    header: "Studio",
    cell: ({ row }) => {
      const data = row.original;
      return <div className="w-30">{data.studio}</div>;
    },
  },
  {
    accessorKey: "type",
    header: "Tipe",
    cell: ({ row }) => {
      const data = row.original;
      return <div className="capitalize w-30">{data.type}</div>;
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
