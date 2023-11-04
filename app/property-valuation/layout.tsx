import Footer from "@/components/layouts/footer";
import Navbar from "@/components/layouts/navbar";
import { PropsWithChildren } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mytreehouse - Property valuation",
  description: "Property valuation",
};

const layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="z-50 flex h-full flex-col justify-between overflow-y-auto md:h-screen lg:h-screen xl:h-screen">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default layout;
