"use client";

import { Category } from "@/@types/category.type";
import { GetParams } from "@/@types/global.type";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { CopyIcon, Eye, MoreHorizontalIcon, PencilIcon } from "lucide-react";
import DeleteCategory from "./_form/delete.category";
import { UpdateCategory } from "./_form/update.category";

export const columns = (params?: GetParams): ColumnDef<Category>[] => [
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
            className="bg-muted-foreground aspect-square rounded-md h-20 "
          />
        </div>
      );
    },
  },
  {
    accessorKey: "cover_url",
    header: "Banner",
    enableSorting: true,
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="w-60 h-20">
          <img
            src={data.cover_url}
            alt={data.title}
            className="bg-muted-foreground rounded-md  w-full h-full object-cover object-center"
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
      return (
        <div className="capitalize w-30">
          {data.type == "credit_and_quota" && "Pulsa & Kuota"}
          {data.type == "credit" && "Pulsa"}
          {data.type == "quota" && "Kuota"}
          {data.type == "games" && "Permainan"}
          {data.type == "check" && "Tagihan"}
        </div>
      );
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
            <UpdateCategory category={row.original} params={params} />
            <DeleteCategory category={row.original} params={params} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
