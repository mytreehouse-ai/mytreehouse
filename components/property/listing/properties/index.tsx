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
import type { NextPage } from "next";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useMobileDetect } from "@/hooks/useMobileDetect";
import { useState } from "react";
import type { Property } from "@/interface/property";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

type PageProps = {
  params?: {
    "property-type": string;
    "property-location": string;
    "listing-type": string;
  };
};

const Properties: NextPage<PageProps> = ({ params }) => {
  const [] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const isMobile = useMobileDetect();

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
    city: params
      ? cities.find((ct) => ct.urlValue === params?.["property-location"])
          ?.value
      : searchParams.has("location")
      ? cities.find(
          (ct) => ct.urlValue === String(searchParams.get("location")),
        )?.value
      : undefined,
    property_type: params
      ? propertyTypes.find((pt) => params?.["property-type"] === pt.urlValue)
          ?.value
      : searchParams.has("property_type")
      ? propertyTypes.find(
          (pt) => pt.urlValue === String(searchParams.get("property_type")),
        )?.value
      : undefined,
    listing_type: params
      ? listingTypes.find((lt) => lt.urlValue === params?.["listing-type"])
          ?.value
      : searchParams.has("listing_type")
      ? listingTypes.find(
          (lt) => lt.urlValue === String(searchParams.get("listing_type")),
        )?.value
      : undefined,
    page_number:
      parseInt(
        (searchParams.has("page_number") &&
          searchParams.get("page_number")?.toString()) ||
          "1",
      ) || 1,
  });

  const onPreviousPageHandler = () => {
    const currentPageNumber = searchParams.has("page_number")
      ? parseInt(searchParams.get("page_number") as string)
      : 1;
    const previousPageNumber =
      currentPageNumber > 1 ? currentPageNumber - 1 : 1;

    const newSearchParams = new URLSearchParams(window.location.search);

    newSearchParams.set("page_number", previousPageNumber.toString());

    router.replace(
      `${window.location.pathname}?${newSearchParams.toString()}`,
      {
        scroll: false,
      },
    );
  };

  const onNextPageHandler = () => {
    const currentPageNumber = searchParams.has("page_number")
      ? parseInt(searchParams.get("page_number") as string)
      : 1;
    const nextPageNumber = currentPageNumber + 1;

    const totalPages = data?.totalPages;

    const newSearchParams = new URLSearchParams(window.location.search);

    newSearchParams.set("page_number", nextPageNumber.toString());

    if (currentPageNumber !== totalPages) {
      router.replace(
        `${window.location.pathname}?${newSearchParams.toString()}`,
        {
          scroll: false,
        },
      );
    }
  };

  if (isLoading) return <PropertyCardSkeletonLoader />;

  return (
    <div className="relative mx-5 mb-10 mt-60 sm:mt-40 md:mt-40 lg:mt-40 xl:mt-40">
      <Grid>
        <div
          className={cn(
            searchParams.get("map-view") === "true"
              ? "col-span-2 grid h-screen gap-x-6 gap-y-8 overflow-y-auto sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2"
              : "col-span-4 grid gap-x-6 gap-y-8 overflow-y-auto sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4",
          )}
        >
          {data?.properties?.map((pt) => (
            <Card key={pt.property_id} property={pt} />
          ))}
        </div>

        {searchParams.get("map-view") === "true" &&
          (isMobile ? (
            <Drawer
              open={searchParams.get("map-view") === "true" ? true : false}
              onOpenChange={(isOpen) => {
                if (!isOpen) {
                  const newSearchParams = new URLSearchParams(
                    window.location.search,
                  );
                  newSearchParams.set("map-view", "false");
                  router.replace(
                    `${window.location.pathname}?${newSearchParams.toString()}`,
                  );
                }
              }}
            >
              <PopupMap propertyListings={data?.properties || []} />
            </Drawer>
          ) : (
            <div className="col-span-2 h-screen w-full">
              {data && (
                <MapboxMultiPin propertyListings={data.properties || []} />
              )}
            </div>
          ))}

        <div
          className={cn(
            "col-span-4 mt-4 flex items-center justify-between",
            searchParams.get("map-view") === "true" && "col-span-2",
          )}
        >
          <div className="text-sm text-neutral-500">
            <p>
              Page {searchParams.get("page_number")?.toString() || "1"} of{" "}
              {data && data?.totalPages ? data?.totalPages : 1}
            </p>
          </div>
          <div className="space-x-2">
            <Button variant="outline" onClick={onPreviousPageHandler}>
              Back
            </Button>
            <Button variant="outline" onClick={onNextPageHandler}>
              Next
            </Button>
          </div>
        </div>
      </Grid>
    </div>
  );
};

export default Properties;

interface PopupMapProps {
  propertyListings: Property[];
}

const PopupMap = ({ propertyListings }: PopupMapProps) => {
  return (
    <DrawerContent className="rounded-lg px-2 py-0 ">
      <div className="my-10 h-[calc(100vh_-_200px)] w-full">
        <MapboxMultiPin propertyListings={propertyListings} />
      </div>
    </DrawerContent>
  );
};
