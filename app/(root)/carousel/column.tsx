"use client";

import { Carousel } from "@/@types/carousel.type";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Carousel>[] = [
  {
    accessorKey: "image_url",
    header: "Gambar",
    enableSorting: false,
    cell: ({ row }) => {
      const data = row.original;
      return (
        <img
          src={data.image_url}
          alt={data.title}
          className="aspect-video rounded-md w-15 object-cover"
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
    accessorKey: "description",
    header: "Deskripsi",
    enableSorting: false,
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
    enableSorting: false,
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
];
