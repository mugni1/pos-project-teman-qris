"use client";

import { News } from "@/@types/news.type";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, MoreHorizontalIcon, PencilIcon, TrashIcon } from "lucide-react";

export const columns: ColumnDef<News>[] = [
  {
    accessorKey: "image_url",
    header: "Gambar",
    enableSorting: true,
    cell: ({ row }) => {
      const data = row.original;
      return (
        <img
          src={data.image_url}
          alt={data.title}
          className="aspect-square rounded-md w-15 object-cover"
        />
      );
    },
  },
  {
    accessorKey: "title",
    header: "Judul",
    enableSorting: true,
    cell: ({ row }) => {
      const data = row.original;
      return <div className="w-40 font-medium">{data.title}</div>;
    },
  },
  {
    accessorKey: "content",
    header: "Konten",
    enableSorting: false,
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p className="w-64 truncate text-sm text-muted-foreground">
          {data.content}
        </p>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Tanggal",
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
