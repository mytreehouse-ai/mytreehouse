import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import ReactQueryProvider from "@/components/provider/ReactQueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mytreehouse",
  description: "Property listing search and property valuation calculator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
          <Analytics />
        </body>
      </html>
    </ReactQueryProvider>
  );
}
