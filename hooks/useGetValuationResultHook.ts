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

interface UseGetValuationResultHookProps {
    propertyDetailValues: PropertyDetailValues;
}

export const useGetValuationResultHook =  ({propertyDetailValues}:UseGetValuationResultHookProps) => {
  const { sqm, yearBuilt, location, propertyType } = propertyDetailValues;

  const valuationQueryClient = useQueryClient();

  const valuationQueryFunction = async () => {
  const propertyTypeUrlValue = propertyTypes.find((pt) => pt.value === propertyType)?.urlValue;

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
    
  }

// TODO: Prefetch query to avoid loading on the next step
   const { data, isLoading, isError, error } = 
 useQuery<Valuation>({
    queryKey: [
      "valuation",
      JSON.stringify({
        sqm,
        year_built: yearBuilt,
        city_id: location,
      }),
    ],
    queryFn: valuationQueryFunction
    
  });

  return { data, isLoading, isError, error, valuationQueryClient,valuationQueryFunction };
}