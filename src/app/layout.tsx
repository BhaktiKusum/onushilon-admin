import type { Metadata } from "next";

import "./globals.css";

import 'katex/dist/katex.min.css'; 

import QueryProvider from "@/providers/query-provider";


import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Onushilon Admin",
  description: "Onushilon Admin Panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          {children}

          <Toaster richColors />
        </QueryProvider>
      </body>
    </html>
  );
}