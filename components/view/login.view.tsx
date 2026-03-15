"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  EyeClosedIcon,
  EyeIcon,
  LoaderIcon,
  Lock,
  LogInIcon,
  Mail,
} from "lucide-react";
import React, { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { loginSchema } from "@/validator/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/hooks/useLogin";
import z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAuthStore } from "@/stores/useAuthStore";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  // state
  const { mutateAsync, isPending } = useLogin();
  const [isPassword, setIsPassword] = useState(true);
  const router = useRouter();
  const { changeData } = useAuthStore();

  // form
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // methods
  const handleSubmit = async (data: z.infer<typeof loginSchema>) => {
    const result = await mutateAsync(data);
    if (result.status != 200) {
      toast.error(result.message);
    } else {
      toast.success(result.message);
      Cookies.set("token", result.data?.token || "");
      Cookies.set("role", result.data?.user.role || "");
      changeData(result.data?.user);
      console.log("redirecting...");
      router.replace("/");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center gap-1">
          <CardTitle className="text-xl ">Selamat Datang Kembali</CardTitle>
          <CardDescription>
            Silahkan masuk dengan akun admin anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FieldGroup>
              <Field>
                <Button variant="outline" type="button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="size-4"
                  >
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Masuk dengan Google
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Atau dengan
              </FieldSeparator>
              <div className="space-y-4">
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field className="gap-2" data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="email">
                        <Mail className="size-4" /> Email
                      </FieldLabel>
                      <Input
                        {...field}
                        className={
                          fieldState.error && "border border-destructive"
                        }
                        placeholder="yourmail@example.com"
                        autoComplete="off"
                        type="email"
                        id="email"
                      />
                      {fieldState.invalid && (
                        <FieldError
                          className="text-xs"
                          errors={[fieldState.error]}
                        />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field className="gap-2" data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="password">
                        <Lock className="size-4" /> Kata Sandi
                      </FieldLabel>
                      <InputGroup
                        className={
                          fieldState.error && "border border-destructive"
                        }
                      >
                        <InputGroupInput
                          {...field}
                          placeholder={
                            isPassword
                              ? "••••••••••••••••••"
                              : "Masukan kata sandi"
                          }
                          autoComplete="off"
                          type={isPassword ? "password" : "text"}
                          id="password"
                        />
                        <InputGroupAddon align="inline-end">
                          <button
                            type="button"
                            onClick={() => setIsPassword(!isPassword)}
                          >
                            {!isPassword && <EyeIcon className="size-5 me-2" />}
                            {isPassword && (
                              <EyeClosedIcon className="size-5 me-2" />
                            )}
                          </button>
                        </InputGroupAddon>
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError
                          className="text-xs"
                          errors={[fieldState.error]}
                        />
                      )}
                    </Field>
                  )}
                />

                <Field>
                  <Button type="submit" disabled={isPending}>
                    {!isPending && <LogInIcon />}
                    {!isPending && <span>Masuk</span>}
                    {isPending && <LoaderIcon className="animate-spin" />}
                    {isPending && <span>Harap Tunggu..</span>}
                  </Button>
                </Field>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
