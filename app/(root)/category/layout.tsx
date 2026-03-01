import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "POS eBelanja - Kategori",
};

export default function Layout({ children }: { children: ReactNode }) {
  return <section className="w-full mx-auto p-6">{children}</section>;
}
