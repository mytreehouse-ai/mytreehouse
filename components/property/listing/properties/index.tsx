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
