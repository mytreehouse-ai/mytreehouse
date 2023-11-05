import { AuthProvider } from "@propelauth/nextjs/client";
import { env } from "@/lib/env.mjs";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    // <AuthProvider authUrl={env.NEXT_PUBLIC_AUTH_URL}>
    //   <main>{children}</main>
    // </AuthProvider>

    <main>{children}</main>
  );
};

export default layout;
