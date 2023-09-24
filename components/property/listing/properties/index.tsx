"use client";
import { usePropertyListingHook } from "@/hooks/usePropertyListingHook";
import Card from "../../card";
import Grid from "../../grid";
import Loader from "./loader";
import { useSearchParams } from "next/navigation";

const Properties: React.FC = () => {
  const searchParams = useSearchParams();

  const { isLoading, data } = usePropertyListingHook({
    text_search: searchParams.has("text_search")
      ? (searchParams.get("text_search") as string)
      : undefined,
  });

  if (isLoading) return <Loader />;

  return (
    <div className="mx-5 mb-10 mt-40">
      <Grid>
        {data?.map((pt) => <Card key={pt.property_id} property={pt} />)}
      </Grid>
    </div>
  );
};

export default Properties;
