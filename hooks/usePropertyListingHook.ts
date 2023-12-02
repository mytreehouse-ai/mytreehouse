import {  PropertyResponse } from "@/interface/property";
import { createSearchParams } from "@/lib/utils";
import { PropertyListingSearchType } from "@/schema/propertyListingSearch.schema";
import { useQuery } from "@tanstack/react-query";


async function getPropertiesApiQuery(
  query?: PropertyListingSearchType,
): Promise<PropertyResponse> {
  const searchParams = createSearchParams(query || {});

  let url = "/api/properties/listing/search";

  if (searchParams?.size) {
    url = url + "?" + searchParams.toString();
  }

  const response = await fetch(url);

  if (!response.ok) throw new Error("Error while querying properties");


    return (await response.json()) as PropertyResponse;

  // const data = (await response.json()) as {
  //   data: Property[]
  //   totalPages: number
  // };

  // const properties = data.data as Property[];
  // const totalPages = data.totalPages as number

}

export const usePropertyListingHook = (query?: PropertyListingSearchType) => {

  const {data, isLoading} = useQuery({
    queryKey: ["properties", JSON.stringify(query)],
    queryFn: () => getPropertiesApiQuery(query),
  });


  return {
    data, 
    isLoading
  };
};
