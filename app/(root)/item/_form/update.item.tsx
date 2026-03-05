"use client";

import { GetParams } from "@/@types/global.type";
import { Item } from "@/@types/item.type";
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
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetCategory } from "@/hooks/useGetCategory";
import { useUpdateItem } from "@/hooks/useUpdateItem";
import { useUpload } from "@/hooks/useUpload";
import {
  UpdateItemPayload,
  UpdateItemPayloadService,
  updateItemSchema,
} from "@/validator/item.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { LoaderIcon, PenBoxIcon, SaveIcon, XCircleIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function UpdateItem({
  params,
  item,
}: {
  params?: GetParams;
  item: Item;
}) {
  const queryClient = useQueryClient();
  const { mutateAsync: updateMutate } = useUpdateItem();
  const { mutateAsync: uploadMutate } = useUpload();
  const [open, setOpen] = useState(false);

  const { data: categoryData, isPending: isCategoryPending } = useGetCategory({
    limit: "1000",
    page: "1",
    order_by: "title",
    sort_by: "asc",
    search: "",
  });

  const form = useForm({
    resolver: zodResolver(updateItemSchema),
    defaultValues: {
      category_id: item.category_id,
      price: item.price,
      seller_name: item.seller_name,
      sku_code: item.sku_code,
      stock: item.stock,
      title: item.title,
      unlimited_stock: item.unlimited_stock,
    },
  });

  const onSubmit = async (values: UpdateItemPayload) => {
    try {
      let image_url: string | undefined;
      if (values.image) {
        const imageUpload = await uploadMutate(values.image);
        if (imageUpload.status !== 200 || !imageUpload.data?.url) {
          toast.error(imageUpload.message || "Gagal upload gambar item.");
          return;
        }
        image_url = imageUpload.data.url;
      }

      const payload: UpdateItemPayloadService = {
        id: item.id,
        category_id: values.category_id,
        image_url,
        price: values.price,
        seller_name: values.seller_name,
        sku_code: values.sku_code,
        stock: values.stock,
        title: values.title,
        unlimited_stock: values.unlimited_stock,
      };

      const data = await updateMutate(payload);
      if (data.status !== 200) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      form.reset();
      await queryClient.invalidateQueries({
        queryKey: ["useGetItem", params],
      });
      setOpen(false);
    } catch {
      toast.error("Server sedang sibuk, coba lagi nanti.");
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
            <PenBoxIcon /> Perbaharui Item
          </DialogTitle>
          <DialogDescription>
            Perbaharui <strong>{item.title}</strong> dengan mengubah data, lalu
            simpan untuk memperbaharui item ke sistem.
          </DialogDescription>
        </DialogHeader>

        <form
          id="update-item-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 -mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4"
        >
          <FieldGroup className="gap-4">
            <Field
              className="gap-2"
              data-invalid={!!form.formState.errors.title}
            >
              <FieldLabel htmlFor="title">Nama Item</FieldLabel>
              <FieldContent>
                <Input
                  id="title"
                  placeholder="Contoh: Voucher 20.000"
                  aria-invalid={!!form.formState.errors.title}
                  {...form.register("title")}
                />
                <FieldError errors={[form.formState.errors.title]} />
              </FieldContent>
            </Field>

            <Field
              className="gap-2"
              data-invalid={!!form.formState.errors.category_id}
            >
              <FieldLabel htmlFor="category_id">Kategori</FieldLabel>
              <FieldContent>
                <Controller
                  control={form.control}
                  name="category_id"
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        id="category_id"
                        aria-invalid={!!form.formState.errors.category_id}
                        className="w-full"
                      >
                        <SelectValue
                          placeholder={
                            isCategoryPending
                              ? "Memuat kategori..."
                              : "Pilih kategori"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent className="font-sans" position="popper">
                        <SelectGroup>
                          <SelectLabel>Pilih Kategori</SelectLabel>
                          {(categoryData?.data ?? []).map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.title}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[form.formState.errors.category_id]} />
              </FieldContent>
            </Field>

            <Field
              className="gap-2"
              data-invalid={!!form.formState.errors.seller_name}
            >
              <FieldLabel htmlFor="seller_name">Nama Penjual</FieldLabel>
              <FieldContent>
                <Input
                  id="seller_name"
                  placeholder="Contoh: PT Provider A"
                  aria-invalid={!!form.formState.errors.seller_name}
                  {...form.register("seller_name")}
                />
                <FieldError errors={[form.formState.errors.seller_name]} />
              </FieldContent>
            </Field>

            <Field
              className="gap-2"
              data-invalid={!!form.formState.errors.sku_code}
            >
              <FieldLabel htmlFor="sku_code">Kode SKU</FieldLabel>
              <FieldContent>
                <Input
                  id="sku_code"
                  placeholder="Contoh: VCR20"
                  aria-invalid={!!form.formState.errors.sku_code}
                  {...form.register("sku_code")}
                />
                <FieldError errors={[form.formState.errors.sku_code]} />
              </FieldContent>
            </Field>

            <Field
              className="gap-2"
              data-invalid={!!form.formState.errors.image}
            >
              <FieldLabel htmlFor="image">Gambar Item</FieldLabel>
              <FieldContent>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  aria-invalid={!!form.formState.errors.image}
                  {...form.register("image")}
                />
                <FieldError errors={[form.formState.errors.image]} />
              </FieldContent>
            </Field>

            <Field
              className="gap-2"
              data-invalid={!!form.formState.errors.price}
            >
              <FieldLabel htmlFor="price">Harga</FieldLabel>
              <FieldContent>
                <InputGroup>
                  <InputGroupInput
                    id="price"
                    type="number"
                    min={0}
                    placeholder="1.000"
                    aria-invalid={!!form.formState.errors.price}
                    {...form.register("price")}
                  />
                  <InputGroupAddon>Rp</InputGroupAddon>
                </InputGroup>
                <FieldError errors={[form.formState.errors.price]} />
              </FieldContent>
            </Field>

            <Field
              className="gap-2"
              data-invalid={!!form.formState.errors.stock}
            >
              <FieldLabel htmlFor="stock">Stok</FieldLabel>
              <FieldContent>
                <Input
                  id="stock"
                  type="number"
                  min={0}
                  placeholder="Contoh: 100"
                  aria-invalid={!!form.formState.errors.stock}
                  {...form.register("stock")}
                />
                <FieldError errors={[form.formState.errors.stock]} />
              </FieldContent>
            </Field>

            <Field orientation="horizontal">
              <Controller
                control={form.control}
                name="unlimited_stock"
                render={({ field }) => (
                  <Checkbox
                    id="unlimited_stock"
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(!!checked)}
                  />
                )}
              />
              <FieldContent>
                <FieldLabel htmlFor="unlimited_stock">
                  Gunakan Stok Unlimited
                </FieldLabel>
                <FieldError errors={[form.formState.errors.unlimited_stock]} />
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
            form="update-item-form"
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
