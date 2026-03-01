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
import { MoreHorizontalIcon, PencilIcon, TrashIcon } from "lucide-react";

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
            className="bg-red-400 aspect-square rounded-md w-20"
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
      return <span>Action</span>;
    },
    enableSorting: false,
    cell: ({ row }) => {
      const data = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <span className="sr-only">Open Menu</span>
              <MoreHorizontalIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <PencilIcon /> Update
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive">
              <TrashIcon /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
