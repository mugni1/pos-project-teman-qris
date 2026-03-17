"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { Spinner } from "../ui/spinner";

export default function RedirectView() {
  const searchParams = useSearchParams();
  const token = searchParams.get("bb");
  const message = searchParams.get("message");
  const role = searchParams.get("role");
  const router = useRouter();

  // effect
  useEffect(() => {
    if (role && role.length > 0 && token && token.length > 0) {
      Cookies.set("token", atob(token));
      Cookies.set("role", role);
      router.replace("/");
      router.refresh();
    }
  }, [message, token]);
  return (
    <section className="flex flex-col h-screen items-center justify-center gap-4">
      <Spinner className="size-8 md:size-10" />
      <p className="font-medium text-lg md:text-2xl">Harap Tunggu..</p>
    </section>
  );
}
