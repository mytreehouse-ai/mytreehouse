import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Component() {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-gray-100 px-4 text-center dark:bg-gray-800 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100">
        404 Not Found
      </h1>
      <p className="mt-8 text-lg text-gray-700 dark:text-gray-300">
        {`Oops! The page you're looking for does not exist. It might have been
        moved or deleted.`}
      </p>
      <div className="mt-6">
        <Link href="/">
          <Button className="rounded-md px-4 py-2 text-white">
            Go Back Home
          </Button>
        </Link>
      </div>
    </main>
  );
}
