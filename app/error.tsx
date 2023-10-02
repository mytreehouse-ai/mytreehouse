"use client";
import { Button } from "@/components/ui/button";

interface errorProps {
  error: Error;
  reset: () => void;
}

const error: React.FC<errorProps> = ({ error, reset }) => {
  return (
    <main>
      <p>{error.message}</p>
      <Button onClick={reset}>Try again</Button>
    </main>
  );
};

export default error;
