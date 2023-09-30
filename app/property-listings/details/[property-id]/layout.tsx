import { PropsWithChildren } from "react";

const layout: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="mt-20 px-20">{children}</div>;
};

export default layout;
