import { PropsWithChildren } from "react";

const layout: React.FC<PropsWithChildren> = ({ children }) => {
  return <main className="mx-10 mt-20">{children}</main>;
};

export default layout;
