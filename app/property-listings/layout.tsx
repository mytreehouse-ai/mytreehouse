import Footer from "@/components/layouts/footer";
import Navbar from "@/components/layouts/navbar";
import { PropsWithChildren } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mytreehouse - Property listings",
  description: "Property listings",
};

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="z-50 flex h-screen flex-col justify-between">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
