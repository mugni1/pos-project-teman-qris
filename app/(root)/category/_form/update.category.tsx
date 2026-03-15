"use client";

import { Category } from "@/@types/category.type";
import { GetParams } from "@/@types/global.type";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateCategory } from "@/hooks/useUpdateCategory";
import { useUpload } from "@/hooks/useUpload";
import {
  UpdateCategoryPayload,
  UpdateCategoryPayloadService,
  updateCategorySchema,
} from "@/validator/category.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { LoaderIcon, PenBoxIcon, SaveIcon, XCircleIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export function UpdateCategory({
  params,
  category,
}: {
  params?: GetParams;
  category: Category;
}) {
  // state
  const queryClient = useQueryClient();
  const { mutateAsync: updateMutate } = useUpdateCategory();
  const { mutateAsync: uploadMutate } = useUpload();
  const [open, setOpen] = useState(false);

  // form
  const form = useForm({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      column_1: category.column_1,
      column_2: category.column_2,
      column_1_title: category.column_1_title,
      column_2_title: category.column_2_title,
      studio: category.studio,
      title: category.title,
      type: category.type as "bill" | "credit" | "quota" | "games" | undefined,
    },
  });

  // methods
  const onSubmit = async (values: UpdateCategoryPayload) => {
    try {
      let image_url: string | undefined;
      let cover_url: string | undefined;
      if (values.image) {
        const imageUpload = await uploadMutate(values.image);
        if (imageUpload.status !== 200 || !imageUpload.data?.url) {
          toast.error(imageUpload.message || "Gagal upload gambar utama.");
          return;
        }
        image_url = imageUpload.data.url;
      }

      if (values.cover) {
        const coverUpload = await uploadMutate(values.cover);
        if (coverUpload.status !== 200 || !coverUpload.data?.url) {
          toast.error(coverUpload.message || "Gagal upload gambar cover.");
          return;
        }
        cover_url = coverUpload.data.url;
      }
      const payload: UpdateCategoryPayloadService = {
        id: category.id,
        column_1: values.column_1,
        column_2: values.column_2,
        column_1_title: values.column_1_title,
        column_2_title: values.column_2_title,
        cover_url: cover_url,
        image_url: image_url,
        studio: values.studio,
        title: values.title,
        type: values.type,
      };

      const data = await updateMutate(payload);
      if (data.status != 200) {
        toast.error(data.message);
      } else {
        form.reset();
        toast.success(data.message);
        await queryClient.invalidateQueries({
          queryKey: ["useGetCategory", params],
        });
        setOpen(false);
      }
    } catch {
      toast.error("Server sedang sibuk, Coba lagi nanti.");
      return;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            setOpen(true);
          }}
        >
          <PenBoxIcon /> Update
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent
        className="font-sans"
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PenBoxIcon /> Perbaharui Kategori
          </DialogTitle>
          <DialogDescription>
            Perbaharui <strong>{category.title}</strong> dengan mengubah data,
            lalu simpan untuk memperbaharui kategori ke sistem.
          </DialogDescription>
        </DialogHeader>

        <form
          id="create-category-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 -mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4"
        >
          <FieldGroup className="gap-4">
            <Field className="gap-2">
              <FieldLabel
                htmlFor="title"
                className={form.formState.errors.title && "text-destructive"}
              >
                Judul
              </FieldLabel>
              <FieldContent>
                <Input
                  id="title"
                  placeholder="Contoh: Telkomsel"
                  className={
                    form.formState.errors.title && "border border-destructive"
                  }
                  {...form.register("title")}
                />
                <FieldError errors={[form.formState.errors.title]} />
              </FieldContent>
            </Field>

            <Field className="gap-2">
              <FieldLabel
                htmlFor="studio"
                className={form.formState.errors.studio && "text-destructive"}
              >
                Studio
              </FieldLabel>
              <FieldContent>
                <Input
                  id="studio"
                  placeholder="Contoh: Telkomsel Provider"
                  className={
                    form.formState.errors.studio && "border border-destructive"
                  }
                  {...form.register("studio")}
                />
                <FieldError errors={[form.formState.errors.studio]} />
              </FieldContent>
            </Field>

            <Field className="gap-2">
              <FieldLabel
                htmlFor="type"
                className={form.formState.errors.type && "text-destructive"}
              >
                Tipe
              </FieldLabel>
              <FieldContent>
                <Controller
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        id="type"
                        className={
                          form.formState.errors.type
                            ? "border border-destructive w-full"
                            : "w-full"
                        }
                      >
                        <SelectValue placeholder="Pilih tipe" />
                      </SelectTrigger>
                      <SelectContent className="font-sans">
                        <SelectItem value="credit_quota">
                          Pulsa & Kuota
                        </SelectItem>
                        <SelectItem value="games">Permainan</SelectItem>
                        <SelectItem value="bill">Tagihan</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[form.formState.errors.type]} />
              </FieldContent>
            </Field>

            <Field className="gap-2">
              <FieldLabel
                htmlFor="image"
                className={form.formState.errors.image && "text-destructive"}
              >
                Gambar Utama
              </FieldLabel>
              <FieldContent>
                <Input
                  id="image"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp,image/jfif"
                  className={
                    form.formState.errors.image && "border border-destructive"
                  }
                  {...form.register("image")}
                />
                <FieldError errors={[form.formState.errors.image]} />
              </FieldContent>
            </Field>

            <Field className="gap-2">
              <FieldLabel
                htmlFor="cover"
                className={form.formState.errors.cover && "text-destructive"}
              >
                Gambar Cover
              </FieldLabel>
              <FieldContent>
                <Input
                  id="cover"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp,image/jfif"
                  className={
                    form.formState.errors.cover && "border border-destructive"
                  }
                  {...form.register("cover")}
                />
                <FieldError errors={[form.formState.errors.cover]} />
              </FieldContent>
            </Field>

            <Field className="gap-2">
              <FieldLabel
                htmlFor="column_1_title"
                className={
                  form.formState.errors.column_1_title && "text-destructive"
                }
              >
                Judul Kolom 1
              </FieldLabel>
              <FieldContent>
                <Input
                  id="column_1_title"
                  placeholder="Contoh: ID"
                  className={
                    form.formState.errors.column_1_title &&
                    "border border-destructive"
                  }
                  {...form.register("column_1_title")}
                />
                <FieldError errors={[form.formState.errors.column_1_title]} />
              </FieldContent>
            </Field>

            <Field className="gap-2">
              <FieldLabel
                htmlFor="column_2_title"
                className={
                  form.formState.errors.column_2_title && "text-destructive"
                }
              >
                Judul Kolom 2
              </FieldLabel>
              <FieldContent>
                <Input
                  id="column_2_title"
                  placeholder="Contoh: Harga"
                  className={
                    form.formState.errors.column_2_title &&
                    "border border-destructive"
                  }
                  {...form.register("column_2_title")}
                />
                <FieldError errors={[form.formState.errors.column_2_title]} />
              </FieldContent>
            </Field>

            <Field orientation="horizontal">
              <Controller
                control={form.control}
                name="column_2"
                render={({ field }) => (
                  <Checkbox
                    id="column_2"
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(!!checked)}
                  />
                )}
              />
              <FieldContent>
                <FieldLabel htmlFor="column_2">Gunakan Kolom 2</FieldLabel>
                <FieldError errors={[form.formState.errors.column_2]} />
              </FieldContent>
            </Field>
          </FieldGroup>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">
              <XCircleIcon /> Tutup
            </Button>
          </DialogClose>
          <Button
            type="submit"
            form="create-category-form"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              <SaveIcon />
            )}
            {form.formState.isSubmitting ? (
              <span>Harap Tunggu..</span>
            ) : (
              <span>Simpan</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
