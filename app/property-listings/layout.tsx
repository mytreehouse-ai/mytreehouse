import Footer from "@/components/layouts/footer";
import Navbar from "@/components/layouts/navbar";
import { PropsWithChildren } from "react";

const layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="z-50 flex h-screen flex-col justify-between">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default layout;
