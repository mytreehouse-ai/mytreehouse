import Valuation from "@/components/property/valuation";
import BgImage from "@/components/property/valuation/bgimage";

const Page = () => {
  return (
    <div className="relative mt-5 flex h-full flex-col py-20 md:flex-row md:items-center md:justify-center md:px-14 lg:px-14 xl:px-72">
      <BgImage />
      <div className="z-10 space-y-2 text-white">
        <h1 className="bg-gradient-to-r from-emerald-300 to-emerald-600 bg-clip-text text-2xl font-bold text-transparent md:text-5xl">
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
