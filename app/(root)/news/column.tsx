"use client";

import { GetParams } from "@/@types/global.type";
import { News } from "@/@types/news.type";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { CopyIcon, MoreHorizontalIcon } from "lucide-react";
import DeleteNews from "./_form/delete.news";
import UpdateNews from "./_form/update.news";

export const columns = (params?: GetParams): ColumnDef<News>[] => [
  {
    accessorKey: "image_url",
    header: "Gambar",
    enableSorting: true,
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="w-60">
          <img
            src={data.image_url}
            alt={data.title}
            className="aspect-video rounded-md w-full object-cover bg-muted-foreground"
          />
        </div>
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
        <div className="w-70 line-clamp-4">
          <span
            className="text-muted-foreground  "
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Tanggal Dibuat",
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
    accessorKey: "updated_at",
    header: "Tanggal Diperbaharui",
    enableSorting: true,
    cell: ({ row }) => {
      const data = row.original;
      const date = new Date(data.updated_at);
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
            <UpdateNews params={params} news={data} />
            <DeleteNews params={params} news={data} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
