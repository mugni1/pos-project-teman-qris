import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "@/components/view/login.view";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "POS eBelanja - Login",
  description: "Silahkan login dengan akun admin anda untuk melanjutkan.",
};

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          POS eBelanja
        </Link>
        <LoginForm />
      </div>
    </div>
  );
}
