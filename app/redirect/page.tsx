import RedirectView from "@/components/view/redirect.view";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Redirecting...",
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RedirectView />
    </Suspense>
  );
}
