"use client";

import { Category } from "@/@types/category.type";
import { GetParams } from "@/@types/global.type";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useDeleteCategory } from "@/hooks/useDeleteCategory";
import { useQueryClient } from "@tanstack/react-query";
import { LoaderIcon, Trash2Icon, TrashIcon, XCircleIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteCategory({
  category,
  params,
}: {
  category: Category;
  params?: GetParams;
}) {
  // state
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { isPending, mutateAsync } = useDeleteCategory();

  // methods
  const handleDelete = async () => {
    try {
      const data = await mutateAsync(category.id);
      if (data.status != 200) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        await queryClient.invalidateQueries({
          queryKey: ["useGetCategory", params],
        });
        setOpen(false);
      }
    } catch {
      toast.error("Server sedang sibuk, Coba lagi nanti.");
    }
  };

  // render
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenuItem
        variant="destructive"
        onSelect={(event) => {
          event.preventDefault();
          setOpen(true);
        }}
      >
        <TrashIcon /> Hapus
      </DropdownMenuItem>
      <DialogContent className="font-sans">
        <DialogHeader className="text-destructive">
          <DialogTitle className="flex items-center gap-2">
            <Trash2Icon /> Hapus Kategori
          </DialogTitle>
          <DialogDescription>
            Kategori <strong>{category.title}</strong> akan dihapus permanen.
            Lanjutkan?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">
              <XCircleIcon /> Tutup
            </Button>
          </DialogClose>
          <Button
            onClick={handleDelete}
            variant="destructive"
            disabled={isPending}
          >
            {isPending ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              <TrashIcon />
            )}
            {isPending ? <span> Harap Tunggu..</span> : <span>Hapus</span>}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
