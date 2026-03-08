"use client";

import { GetParams } from "@/@types/global.type";
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
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateNews } from "@/hooks/useCreateNews";
import { useGenerateNews } from "@/hooks/useGenerateNews";
import { useUpload } from "@/hooks/useUpload";
import { generateNewsSchema } from "@/validator/gemini.schema";
import {
  CreateNewsPayload,
  CreateNewsPayloadService,
  createNewsSchema,
} from "@/validator/news.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import {
  LoaderIcon,
  PlusCircleIcon,
  SaveIcon,
  SparklesIcon,
  XCircleIcon,
} from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function CreateNews({ getParams }: { getParams: GetParams }) {
  const queryClient = useQueryClient();
  const { mutateAsync: createMutate } = useCreateNews();
  const { mutateAsync: generateMutate, isPending: isGeneratePending } =
    useGenerateNews();
  const { mutateAsync: uploadMutate } = useUpload();
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState("");

  const form = useForm({
    resolver: zodResolver(createNewsSchema),
    defaultValues: {
      title: "",
      content: "",
      summary: "",
    },
  });

  const onSubmit = async (values: CreateNewsPayload) => {
    try {
      const imageUpload = await uploadMutate(values.image);
      if (imageUpload.status !== 200 || !imageUpload.data?.url) {
        toast.error(imageUpload.message || "Gagal upload gambar utama.");
        return;
      }

      const payload: CreateNewsPayloadService = {
        image_url: imageUpload.data.url,
        title: values.title,
        content: values.content,
        summary: values.summary,
      };

      const data = await createMutate(payload);
      if (data.status !== 201) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      form.reset();
      await queryClient.invalidateQueries({
        queryKey: ["useGetNews", getParams],
      });
      setOpen(false);
    } catch {
      toast.error("Server sedang sibuk, coba lagi nanti.");
    }
  };

  const onGenerateNews = async () => {
    const parsed = generateNewsSchema.safeParse({ topic });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Topik tidak valid.");
      return;
    }

    try {
      const data = await generateMutate(parsed.data);
      if (data.status !== 201 || !data.data) {
        toast.error(data.message || "Gagal generate berita.");
        return;
      }
      form.setValue("title", data.data.title, {
        shouldDirty: true,
        shouldValidate: true,
      });
      form.setValue("content", data.data.content, {
        shouldDirty: true,
        shouldValidate: true,
      });
      form.setValue("summary", data.data.summary, {
        shouldDirty: true,
        shouldValidate: true,
      });
      toast.success("Berita berhasil dibuat. Silakan review sebelum simpan.");
    } catch {
      toast.error("Server sedang sibuk, coba lagi nanti.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircleIcon /> Tambah Berita
        </Button>
      </DialogTrigger>
      <DialogContent
        className="font-sans"
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PlusCircleIcon /> Tambah Berita Baru
          </DialogTitle>
          <DialogDescription>
            Lengkapi data berita, lalu simpan untuk menambahkan berita baru ke
            sistem.
          </DialogDescription>
        </DialogHeader>

        <form
          id="create-news-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 -mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4"
        >
          <FieldGroup className="gap-4">
            <Field className="gap-2">
              <FieldLabel htmlFor="topic">Buat dengan AI </FieldLabel>
              <FieldContent>
                <div className="flex gap-2">
                  <Input
                    id="topic"
                    placeholder="Contoh: Dampak promo ramadhan untuk UMKM"
                    value={topic}
                    onChange={(event) => setTopic(event.target.value)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isGeneratePending}
                    onClick={onGenerateNews}
                  >
                    {isGeneratePending ? (
                      <LoaderIcon className="animate-spin" />
                    ) : (
                      <SparklesIcon />
                    )}
                    {isGeneratePending ? "Tunggu..." : "Buat"}
                  </Button>
                </div>
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
              data-invalid={!!form.formState.errors.summary}
            >
              <FieldLabel htmlFor="summary">Ringkasan</FieldLabel>
              <FieldContent>
                <Textarea
                  id="summary"
                  placeholder="Tulis ringkasan disini..."
                  aria-invalid={!!form.formState.errors.summary}
                  {...form.register("summary")}
                />
                <FieldError errors={[form.formState.errors.summary]} />
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
                      value={field.value}
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
            form="create-news-form"
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
