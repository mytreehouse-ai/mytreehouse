"use client";

import Image from "next/image";

const Mytreehouse = () => {
  return (
    <main className="flex h-screen items-center justify-center">
      <Image
        style={{ width: "auto", height: "auto" }}
        src="/mytreehouse-text-loader.svg"
        priority
        width="280"
        height="280"
        alt="mytreehouse-text-loader"
      />
    </main>
  );
};

export default Mytreehouse;
