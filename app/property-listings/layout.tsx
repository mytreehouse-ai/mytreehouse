"use client";
import Footer from "@/components/layouts/footer";
import Navbar from "@/components/layouts/navbar";
import { useParams } from "next/navigation";
import { PropsWithChildren } from "react";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const params = useParams();

  return (
    <main className="z-50 flex h-screen flex-col justify-between">
      <Navbar shadowMd={params["property-id"] ? true : false} />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
