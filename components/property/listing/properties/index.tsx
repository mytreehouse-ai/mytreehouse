"use client";
import { usePropertyListingHook } from "@/hooks/usePropertyListingHook";
import PropertyCardSkeletonLoader from "./propertycardskeletonloader";
import { useSearchParams } from "next/navigation";
import Grid from "../../grid";
import Card from "../../card";
import { listingTypes } from "@/static_data/listing-types";
import { cities } from "@/static_data/cities";
import { propertyTypes } from "@/static_data/property-types";
import MapboxMultiPin from "@/components/map/MapboxMultiPin";
import { cn } from "@/lib/utils";

const Properties: React.FC = () => {
  const searchParams = useSearchParams();

  const { isLoading, data } = usePropertyListingHook({
    text_search: searchParams.has("text_search")
      ? String(searchParams.get("text_search"))
      : undefined,
    bedroom_count: searchParams.has("bedroom_count")
      ? Number(searchParams.get("bedroom_count"))
      : undefined,
    bathroom_count: searchParams.has("bathroom_count")
      ? Number(searchParams.get("bathroom_count"))
      : undefined,
    sqm_min: searchParams.has("sqm_min")
      ? Number(searchParams.get("sqm_min"))
      : undefined,
    sqm_max: searchParams.has("sqm_max")
      ? Number(searchParams.get("sqm_max"))
      : undefined,
    max_price: searchParams.has("max_price")
      ? Number(searchParams.get("max_price"))
      : undefined,
    city: searchParams.has("location")
      ? cities.find(
          (ct) => ct.urlValue === String(searchParams.get("location")),
        )?.value
      : undefined,
    property_type: searchParams.has("property_type")
      ? propertyTypes.find(
          (pt) => pt.urlValue === String(searchParams.get("property_type")),
        )?.value
      : undefined,
    listing_type: searchParams.has("listing_type")
      ? listingTypes.find(
          (lt) => lt.urlValue === String(searchParams.get("listing_type")),
        )?.value
      : undefined,
  });

  if (isLoading) return <PropertyCardSkeletonLoader />;

  return (
    <div className="relative mx-5 mb-10 mt-60 sm:mt-40 md:mt-40 lg:mt-40 xl:mt-40">
      <Grid>
        <div className={cn(searchParams.get("map-view") === 'true'?  "col-span-2 grid grid-cols-2 gap-6 h-screen overflow-y-auto" : "col-span-4 grid grid-cols-4 gap-x-6 overflow-y-auto gap-y-8")}>
        {data?.map((pt) => <Card key={pt.property_id} property={pt} />)}
        </div>
        {searchParams.get("map-view") === 'true' && (
            <div className="w-full h-screen col-span-2">
              {data && <MapboxMultiPin propertyListings={data} />} 
            </div>
        ) }
      </Grid>
    </div>
  );
};

export default Properties;
