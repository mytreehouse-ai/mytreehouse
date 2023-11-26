import Properties from "@/components/property/listing/properties";
import Search from "@/components/property/listing/search";

const page = () => {
  return (
    <>
      <div className="fixed top-0 z-40 mt-16 w-full items-center justify-center border-b border-t bg-white p-4 lg:z-50 xl:z-50">
        <Search />
      </div>
      <div>
        <Properties />
      </div>
    </>
  );
};

export default page;
