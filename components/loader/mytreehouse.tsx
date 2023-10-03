"use client";
import Image from "next/image";
import { imageKitLoader } from "@/lib/utils";

const MyTreehouse = () => {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="flex-shrink-0">
        <Image
          className="h-auto w-auto"
          loader={imageKitLoader}
          src="mytreehouse/mytreehouse-text-loader.svg"
          width={280}
          height={120}
          alt="mytreehouse-text-loader"
        />
      </div>
    </main>
  );
};

export default MyTreehouse;
