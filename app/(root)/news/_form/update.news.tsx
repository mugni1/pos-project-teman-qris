"use client";

import { GetParams } from "@/@types/global.type";
import { News } from "@/@types/news.type";
import Editor from "@/components/layout/editor";
import { Button } from "@/components/ui/button";
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
import { useUpdateNews } from "@/hooks/useUpdateNews";
import { useUpload } from "@/hooks/useUpload";
import {
  UpdateNewsPayload,
  UpdateNewsPayloadService,
  updateNewsSchema,
} from "@/validator/news.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { LoaderIcon, PenBoxIcon, SaveIcon, XCircleIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function UpdateNews({
  params,
  news,
}: {
  params?: GetParams;
  news: News;
}) {
  const queryClient = useQueryClient();
  const { mutateAsync: updateMutate } = useUpdateNews();
  const { mutateAsync: uploadMutate } = useUpload();
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(updateNewsSchema),
    defaultValues: {
      title: news.title,
      content: news.content,
    },
  });

  const onSubmit = async (values: UpdateNewsPayload) => {
    try {
      let image_url: string | undefined;
      if (values.image) {
        const imageUpload = await uploadMutate(values.image);
        if (imageUpload.status !== 200 || !imageUpload.data?.url) {
          toast.error(imageUpload.message || "Gagal upload gambar utama.");
          return;
        }
        image_url = imageUpload.data.url;
      }

      const payload: UpdateNewsPayloadService = {
        id: news.id,
        image_url,
        title: values.title,
        content: values.content,
      };

      const data = await updateMutate(payload);
      if (data.status !== 200) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      form.reset();
      await queryClient.invalidateQueries({
        queryKey: ["useGetNews", params],
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
            <PenBoxIcon /> Perbaharui News
          </DialogTitle>
          <DialogDescription>
            Perbaharui <strong>{news.title}</strong> dengan mengubah data, lalu
            simpan untuk memperbaharui news ke sistem.
          </DialogDescription>
        </DialogHeader>

        <form
          id="update-news-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 -mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4"
        >
          <FieldGroup className="gap-4">
            <Field
              className="gap-2"
              data-invalid={!!form.formState.errors.title}
            >
              <FieldLabel htmlFor="title">Judul</FieldLabel>
              <FieldContent>
                <Input
                  id="title"
                  placeholder="Contoh: Promo terbaru bulan ini"
                  aria-invalid={!!form.formState.errors.title}
                  {...form.register("title")}
                />
                <FieldError errors={[form.formState.errors.title]} />
              </FieldContent>
            </Field>

            <Field
              className="gap-2"
              data-invalid={!!form.formState.errors.image}
            >
              <FieldLabel htmlFor="image">Gambar Utama</FieldLabel>
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
              data-invalid={!!form.formState.errors.content}
            >
              <FieldLabel htmlFor="content">Konten</FieldLabel>
              <FieldContent>
                <Controller
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <Editor
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      placeholder="Tulis isi berita di sini..."
                      aria-invalid={!!form.formState.errors.content}
                    />
                  )}
                />
                <FieldError errors={[form.formState.errors.content]} />
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
            form="update-news-form"
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
