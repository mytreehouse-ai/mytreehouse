import { PropsWithChildren } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mytreehouse - Property details",
  description: "Property details",
};

const layout: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="mt-20 px-20">{children}</div>;
};

export default layout;
