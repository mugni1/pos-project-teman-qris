"use client";

import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="font-sans">
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              {children}
              <Toaster
                theme="system"
                position="top-right"
                className="font-sans"
                duration={5000}
                toastOptions={{
                  classNames: {
                    title: "font-sans",
                  },
                }}
              />
            </TooltipProvider>
          </QueryClientProvider>
        </main>
      </body>
    </html>
  );
}
