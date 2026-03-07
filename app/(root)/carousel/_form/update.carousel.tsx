"use client";

import { Carousel } from "@/@types/carousel.type";
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
import { useUpdateCarousel } from "@/hooks/useUpdateCarousel";
import { useUpload } from "@/hooks/useUpload";
import {
  UpdateCarouselPayload,
  UpdateCarouselPayloadService,
  updateCarouselSchema,
} from "@/validator/carousel.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { LoaderIcon, PenBoxIcon, SaveIcon, XCircleIcon } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function UpdateCarousel({
  params,
  carousel,
}: {
  params?: GetParams;
  carousel: Carousel;
}) {
  const queryClient = useQueryClient();
  const { mutateAsync: updateMutate } = useUpdateCarousel();
  const { mutateAsync: uploadMutate } = useUpload();
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(updateCarouselSchema),
    defaultValues: {
      title: carousel.title,
      description: carousel.description,
      link: carousel.link,
      is_active: carousel.is_active,
    },
  });

  const onSubmit = async (values: UpdateCarouselPayload) => {
    try {
      let image_url: string | undefined;
      if (values.image) {
        const imageUpload = await uploadMutate(values.image);
        if (imageUpload.status !== 200 || !imageUpload.data?.url) {
          toast.error(imageUpload.message || "Gagal upload gambar carousel.");
          return;
        }
        image_url = imageUpload.data.url;
      }

      const payload: UpdateCarouselPayloadService = {
        id: carousel.id,
        title: values.title,
        description: values.description,
        link: values.link,
        is_active: values.is_active,
        image_url,
      };

      const data = await updateMutate(payload);
      if (data.status !== 200) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      form.reset();
      await queryClient.invalidateQueries({
        queryKey: ["useGetCarousel", params],
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
            <PenBoxIcon /> Perbaharui Carousel
          </DialogTitle>
          <DialogDescription>
            Perbaharui <strong>{carousel.title}</strong> dengan mengubah data,
            lalu simpan untuk memperbaharui carousel ke sistem.
          </DialogDescription>
        </DialogHeader>

        <form
          id="update-carousel-form"
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
                  placeholder="Contoh: Promo Ramadhan"
                  aria-invalid={!!form.formState.errors.title}
                  {...form.register("title")}
                />
                <FieldError errors={[form.formState.errors.title]} />
              </FieldContent>
            </Field>

            <Field
              className="gap-2"
              data-invalid={!!form.formState.errors.description}
            >
              <FieldLabel htmlFor="description">Deskripsi</FieldLabel>
              <FieldContent>
                <Input
                  id="description"
                  placeholder="Contoh: Promo spesial sampai akhir bulan"
                  aria-invalid={!!form.formState.errors.description}
                  {...form.register("description")}
                />
                <FieldError errors={[form.formState.errors.description]} />
              </FieldContent>
            </Field>

            <Field className="gap-2" data-invalid={!!form.formState.errors.link}>
              <FieldLabel htmlFor="link">Tautan</FieldLabel>
              <FieldContent>
                <Input
                  id="link"
                  placeholder="Contoh: /promo-ramadhan"
                  aria-invalid={!!form.formState.errors.link}
                  {...form.register("link")}
                />
                <FieldError errors={[form.formState.errors.link]} />
              </FieldContent>
            </Field>

            <Field
              className="gap-2"
              data-invalid={!!form.formState.errors.image}
            >
              <FieldLabel htmlFor="image">Gambar</FieldLabel>
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

            <Field orientation="horizontal">
              <Controller
                control={form.control}
                name="is_active"
                render={({ field }) => (
                  <Checkbox
                    id="is_active"
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(!!checked)}
                  />
                )}
              />
              <FieldContent>
                <FieldLabel htmlFor="is_active">Status Aktif</FieldLabel>
                <FieldError errors={[form.formState.errors.is_active]} />
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
            form="update-carousel-form"
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
