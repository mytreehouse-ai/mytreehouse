import Valuation from "@/components/property/valuation";
import Image from "next/image";

const Page = () => {
  return (
    <div className="relative flex flex-col h-full mt-14 md:flex-row md:items-center">
      <Image
        className="absolute brightness-50"
        src="/property-valuation-bg.jpg"
        alt="propery_valuation_bg"
        sizes="(max-width: 768px) 100vw"
        priority={true}
        fill={true}
      />
      <div className="z-10 w-full px-6 py-8 space-y-2 text-white">
        <h1 className="text-2xl font-bold text-transparent bg-gradient-to-r from-emerald-300 to-emerald-600 bg-clip-text md:text-4xl">
          Expert Property Valuation Service
        </h1>
        <p className="text-xs md:text-xl">
          Trust in our expertise to accurately assess and reveal the true value
          of your assets, empowering you to make informed decisions with
          confidence
        </p>
      </div>
      <div className="w-full mb-14 md:mb-0 md:px-6">
        <Valuation />
      </div>
    </div>
  );
};

export default Page;
