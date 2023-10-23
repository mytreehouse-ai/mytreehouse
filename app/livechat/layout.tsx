import { NextPage } from "next";

const layout: NextPage<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <main className="flex h-screen items-center justify-center">
      {children}
    </main>
  );
};

export default layout;
