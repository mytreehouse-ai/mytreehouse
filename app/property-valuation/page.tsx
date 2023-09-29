import Valuation from "@/components/property/valuation";
import Image from "next/image";

const Page = () => {
  return (
    <div className="relative flex flex-col h-full py-20 mt-14 md:px-14  md:flex-row md:items-center md:justify-center lg:px-48 xl:px-72">
      <Image
        className="absolute brightness-50"
        src="/property-valuation-bg.jpg"
        alt="propery_valuation_bg"
        sizes="(max-width: 768px) 100vw"
        priority={true}
        fill={true}
      />
      <div className="z-10 w-full px-6 py-8 space-y-2 text-white md:mb-40">
        <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-emerald-300 to-emerald-600 bg-clip-text md:text-4xl">
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
