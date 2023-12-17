import Properties from "@/components/property/listing/properties";
import Search from "@/components/property/listing/search";
interface pageProps {
  params: {
    "property-type": string;
    "property-location": string;
    "listing-type": string;
  };
  searchParams: Record<string, any>;
}

const page: React.FC<pageProps> = (props) => {
  console.log("from dynamic page", props);

  return (
    <>
      <div className="fixed z-50 mt-14 flex w-full items-center justify-center border-b border-t bg-white p-4">
        <Search params={props.params} />
      </div>
      <div>
        <Properties params={props.params} />
      </div>
    </>
  );
};

export default page;
