import Properties from "@/components/property/listing/properties";
import { Search } from "@/components/property/listing/search";

const page = () => {
  return (
    <div>
      <div className="fixed z-50 mt-14 flex w-full items-center justify-center border-b border-t bg-white p-4">
        <Search />
      </div>
      <div>
      <Properties />
      </div>
    </div>
  );
};

export default page;
