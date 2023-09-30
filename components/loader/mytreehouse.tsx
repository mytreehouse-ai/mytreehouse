import Image from "next/image";

const MyTreehouse = () => {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="flex-shrink-0">
        <Image
          className="h-auto w-auto"
          src="/mytreehouse-text-loader.svg"
          width={280}
          height={60}
          alt="mytreehouse-text-loader"
        />
      </div>
    </main>
  );
};

export default MyTreehouse;
