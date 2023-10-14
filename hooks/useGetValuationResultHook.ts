import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createSearchParams } from "@/lib/utils";
import { propertyTypes } from "@/static_data/property-types";
import type { Valuation } from "@/interface/valuation";

interface PropertyDetailValues {
  sqm: number;
  yearBuilt: number;
  location: string;
  propertyType: string;
}

const propertyValuation = async (data: PropertyDetailValues) => {
  const { sqm, yearBuilt, location, propertyType } = data;

  const propertyTypeUrlValue = propertyTypes.find(
    (pt) => pt.value === propertyType,
  )?.urlValue;

  const searchParams = createSearchParams({
    sqm,
    year_built: yearBuilt,
    city_id: location,
  });

  let url = `/api/properties/valuation/${propertyTypeUrlValue}`;

  if (searchParams?.size) {
    url = url + "?" + searchParams.toString();
  }

  const response = await fetch(url);

  return (await response.json()) as Valuation;
};

export const useGetValuationResultHook = (
  propertyDetailValues: PropertyDetailValues,
) => {
  const { sqm, yearBuilt, location, propertyType } = propertyDetailValues;

  const { data, isLoading, isError, error } = useQuery<Valuation>({
    queryKey: [
      "valuation",
      JSON.stringify({
        sqm,
        year_built: yearBuilt,
        city_id: location,
      }),
    ],
    queryFn: () =>
      propertyValuation({
        sqm,
        yearBuilt,
        location,
        propertyType,
      }),
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
};
