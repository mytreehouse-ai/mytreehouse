import Image from "next/image";

const MyTreehouse = () => {
  return (
    <main className="flex h-screen items-center justify-center">
      <div className="flex-shrink-0">
        <Image
          src="/mytreehouse-text-loader.svg"
          width={280}
          height={280}
          alt="mytreehouse-text-loader"
        />
      </div>
    </main>
  );
};

export default MyTreehouse;
