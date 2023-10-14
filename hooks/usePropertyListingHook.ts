import { Property } from "@/interface/property";
import { createSearchParams } from "@/lib/utils";
import { PropertyListingSearchType } from "@/schema/propertyListingSearch.schema";
import { useQuery } from "@tanstack/react-query";

async function getPropertiesApiQuery(
  query?: PropertyListingSearchType,
): Promise<Property[]> {
  const searchParams = createSearchParams(query || {});

  let url = "/api/properties/listing/search";

  if (searchParams?.size) {
    url = url + "?" + searchParams.toString();
  }

  const response = await fetch(url);

  if (!response.ok) throw new Error("Error while querying properties");

  return await response.json();
}

export const usePropertyListingHook = (query?: PropertyListingSearchType) => {
  const propertyQuery = useQuery({
    queryKey: ["properties", JSON.stringify(query)],
    queryFn: () => getPropertiesApiQuery(query),
  });

  return propertyQuery;
};
