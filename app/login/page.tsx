import { LoginForm } from "@/components/view/login.view";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "POS eBelanja - Login",
  description: "Silahkan login dengan akun admin anda untuk melanjutkan.",
};

function LoginSkeleton() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center justify-center gap-2">
          <div className="bg-primary/20 h-6 w-6 rounded-md" />
          <div className="h-4 w-28 rounded bg-foreground/10" />
        </div>
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="space-y-3">
            <div className="h-6 w-40 rounded bg-foreground/10" />
            <div className="h-4 w-56 rounded bg-foreground/10" />
          </div>
          <div className="mt-6 space-y-4 animate-pulse">
            <div className="h-10 w-full rounded-md bg-foreground/10" />
            <div className="h-4 w-20 rounded bg-foreground/10" />
            <div className="space-y-3">
              <div className="h-4 w-16 rounded bg-foreground/10" />
              <div className="h-10 w-full rounded-md bg-foreground/10" />
            </div>
            <div className="space-y-3">
              <div className="h-4 w-20 rounded bg-foreground/10" />
              <div className="h-10 w-full rounded-md bg-foreground/10" />
            </div>
            <div className="h-10 w-full rounded-md bg-foreground/10" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginSkeleton />}>
      <LoginForm />
    </Suspense>
  );
}
