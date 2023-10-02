"use client";
import { usePropertyListingHook } from "@/hooks/usePropertyListingHook";
import PropertyCardSkeletonLoader from "./propertycardskeletonloader";
import { useSearchParams } from "next/navigation";
import Grid from "../../grid";
import Card from "../../card";

const Properties: React.FC = () => {
  const searchParams = useSearchParams();

  const { isLoading, data } = usePropertyListingHook({
    text_search: searchParams.has("text_search")
      ? String(searchParams.get("text_search"))
      : undefined,
    bedroom_count: searchParams.has("bedroom_count") ? Number(searchParams.get("bedroom_count")) : undefined,
    bathroom_count: searchParams.has("bathroom_count") ? Number(searchParams.get("bathroom_count")) : undefined,
    sqm_min: searchParams.has("sqm_min") ? Number(searchParams.get("sqm_min")) : undefined,
    sqm_max: searchParams.has("sqm_max") ? Number(searchParams.get("sqm_max")) : undefined,
    max_price: searchParams.has("max_price") ? Number(searchParams.get("max_price")) : undefined,
    city: searchParams.has("city") ? String(searchParams.get("city")) : undefined,
    property_type: searchParams.has("property_type") ? String(searchParams.get("property_type")) : undefined,
    listing_type: searchParams.has("listing_type") ? String(searchParams.get("listing_type")) : undefined,
  });

  if (isLoading) return <PropertyCardSkeletonLoader />;

  return (
    <div className="mx-5 mb-10 mt-40">
      <Grid>
        {data?.map((pt) => <Card key={pt.property_id} property={pt} />)}
      </Grid>
    </div>
  );
};

export default Properties;
