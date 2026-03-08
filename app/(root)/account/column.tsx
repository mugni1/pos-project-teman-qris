"use client";

import { User } from "@/@types/user.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "avatar",
    header: "Gambar Avatar",
    cell: ({ row }) => {
      const data = row.original;
      const fallback = data.fullname
        ? data.fullname
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((name) => name[0]?.toUpperCase() ?? "")
            .join("")
        : "CN";

      return (
        <div>
          <Avatar size="xl">
            <AvatarImage
              src={data.avatar ?? "/blankpp.jpg"}
              alt={data.firstname ?? "Anonim"}
            />
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
        </div>
      );
    },
  },
  {
    accessorKey: "fullname",
    header: "Nama Lengkap",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Peran",
    cell: ({ row }) => (
      <div>
        {row.original.role == "super_user" ? <p>Admin</p> : <p>Pengguna</p>}
      </div>
    ),
  },
  {
    accessorKey: "provider",
    header: "Provider",
  },
];
