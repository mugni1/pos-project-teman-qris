"use client";

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
import {
  CreateCategoryPayload,
  createCategorySchema,
} from "@/validator/category.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircleIcon, SaveIcon, XCircleIcon } from "lucide-react";
import { Controller, useForm, useWatch } from "react-hook-form";

export function AddCategory() {
  // form
  const form = useForm({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      column_1: true,
      column_2: false,
      column_1_title: "",
      column_2_title: "Tidak ada judul",
      studio: "",
      title: "",
    },
  });

  // methods
  const onSubmit = (values: CreateCategoryPayload) => {
    console.log("category payload:", values);
  };

  const isColumn2Active = useWatch({
    control: form.control,
    name: "column_2",
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircleIcon /> Tambah Kategori
        </Button>
      </DialogTrigger>
      <DialogContent className="font-sans">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PlusCircleIcon /> Tambah Kategori Baru
          </DialogTitle>
          <DialogDescription>
            Lengkapi data kategori, lalu simpan untuk menambahkan kategori baru
            ke sistem.
          </DialogDescription>
        </DialogHeader>
        <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
          <form
            id="create-category-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5"
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
                      form.formState.errors.studio &&
                      "border border-destructive"
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
                          <SelectItem value="credit">Pulsa</SelectItem>
                          <SelectItem value="quota">Kuota</SelectItem>
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
        </div>
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
            <SaveIcon /> Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
