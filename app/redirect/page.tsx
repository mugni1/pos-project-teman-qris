import RedirectView from "@/components/view/redirect.view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Redirecting...",
};

export default function Page() {
  return <RedirectView />;
}
