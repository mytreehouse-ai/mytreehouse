import Valuation from "@/components/property/valuation";
import Image from "next/image";

const Page = () => {
  return (
    <div className="relative mt-14 flex h-full flex-col py-20 md:flex-row md:items-center md:justify-center md:px-14 lg:px-48 xl:px-72">
      <Image
        className="absolute brightness-50"
        src="/property-valuation-bg.jpg"
        alt="propery_valuation_bg"
        sizes="(max-width: 768px) 100vw, 700px"
        priority={true}
        fill={true}
      />
      <div className="z-10 w-full space-y-2 px-6 py-8 text-white md:mb-40">
        <h1 className="bg-gradient-to-r from-emerald-300 to-emerald-600 bg-clip-text text-2xl font-bold text-transparent md:text-4xl">
          Expert Property Valuation Service
        </h1>
        <p className="text-xs md:text-xl lg:text-base">
          Trust in our expertise to accurately assess and reveal the true value
          of your assets, empowering you to make informed decisions with
          confidence
        </p>
      </div>
      <div className="w-full md:mb-0 md:px-6">
        <Valuation />
      </div>
    </div>
  );
};

export default Page;
