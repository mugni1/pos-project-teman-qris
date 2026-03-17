import RedirectView from "@/components/view/redirect.view";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Redirecting...",
};

function RedirectSkeleton() {
  return (
    <div className="bg-muted flex min-h-svh items-center justify-center p-6">
      <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-sm">
        <div className="space-y-4 animate-pulse">
          <div className="h-5 w-32 rounded bg-foreground/10" />
          <div className="h-4 w-56 rounded bg-foreground/10" />
          <div className="h-2 w-full rounded bg-foreground/10" />
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<RedirectSkeleton />}>
      <RedirectView />
    </Suspense>
  );
}
