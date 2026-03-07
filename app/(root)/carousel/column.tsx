"use client";

import { GetParams } from "@/@types/global.type";
import { Carousel } from "@/@types/carousel.type";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { CopyIcon, MoreHorizontalIcon } from "lucide-react";
import DeleteCarousel from "./_form/delete.carousel";
import UpdateCarousel from "./_form/update.carousel";

export const columns = (params?: GetParams): ColumnDef<Carousel>[] => [
  {
    accessorKey: "image_url",
    header: "Gambar",
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
    accessorKey: "description",
    header: "Deskripsi",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <p className="w-64 truncate text-sm text-muted-foreground">
          {data.description}
        </p>
      );
    },
  },
  {
    accessorKey: "link",
    header: "Tautan",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <a
          href={data.link}
          target="_blank"
          rel="noreferrer"
          className="w-52 inline-block truncate text-primary hover:underline"
        >
          {data.link}
        </a>
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
    accessorKey: "is_active",
    header: "Status",
    enableSorting: true,
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="w-20">{data.is_active ? "Aktif" : "Nonaktif"}</div>
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
            <UpdateCarousel params={params} carousel={data} />
            <DeleteCarousel params={params} carousel={data} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
