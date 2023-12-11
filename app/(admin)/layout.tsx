import { AuthProvider } from "@propelauth/nextjs/client";
import { env } from "@/lib/env.mjs";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider authUrl={env.NEXT_PUBLIC_AUTH_URL}>
      <main className="h-screen p-6 sm:p-12">{children}</main>
    </AuthProvider>
  );
};

export default layout;