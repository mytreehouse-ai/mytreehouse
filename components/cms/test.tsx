"use client";
import { useLogoutFunction } from "@propelauth/nextjs/client";

const Test: React.FC = () => {
  const logout = useLogoutFunction();

  return <button onClick={logout}>Logout</button>;
};

export default Test;
