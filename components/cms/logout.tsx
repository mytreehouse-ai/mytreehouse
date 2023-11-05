"use client";
import { useLogoutFunction } from "@propelauth/nextjs/client";
import { Button } from "../ui/button";

const Logout: React.FC = () => {
  const logoutFn = useLogoutFunction();

  return (
    <Button size="sm" onClick={logoutFn}>
      Logout
    </Button>
  );
};

export default Logout;
