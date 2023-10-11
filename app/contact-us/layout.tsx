import Footer from "@/components/layouts/footer";
import Navbar from "@/components/layouts/navbar";
import type { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Mytreehouse - Contact us",
  description: "Contact us",
};

const layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="z-50 flex h-screen flex-col justify-between">
      <Navbar shadowMd />
      {children}
      <Footer />
    </main>
  );
};

export default layout;
