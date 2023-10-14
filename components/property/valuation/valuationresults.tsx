"use client";
import { Button } from "@/components/ui/button";
import ValuationStepper from "@/hooks/useStepperStore";
import useValuationFormStore from "@/hooks/useValuationFormStore";
import SuccessResultImage from "./successresultimage";
import { propertyTypes } from "@/static_data/property-types";
import { useQuery } from "@tanstack/react-query";
import { createSearchParams } from "@/lib/utils";

const ValuationResults: React.FC = () => {
  const { setCurrentStepIndex } = ValuationStepper();

  const { personalDetailValues, propertyDetailValues } =
    useValuationFormStore();

  const { isLoading, data } = useQuery({
    queryKey: [
      "valuation",
      JSON.stringify({
        sqm: propertyDetailValues.sqm,
        year_built: propertyDetailValues.yearBuilt,
        city_id: propertyDetailValues.location,
      }),
    ],
    queryFn: async () => {
      const propertyType = propertyTypes.find(
        (pt) => pt.value === propertyDetailValues.propertyType,
      )?.urlValue as string;

      const searchParams = createSearchParams({
        sqm: propertyDetailValues.sqm,
        year_built: propertyDetailValues.yearBuilt,
        city_id: propertyDetailValues.location,
      });

      let url = `/api/properties/valuation/${propertyType}`;

      if (searchParams?.size) {
        url = url + "?" + searchParams.toString();
      }

      const response = await fetch(url);

      return await response.json();
    },
  });

  console.log("RESULTS", personalDetailValues, propertyDetailValues);

  console.log(data);

  // TODO: Improve UI when query is loading...
  if (isLoading) {
    return <div>Is loading</div>;
  }

  return (
    <>
      <div className="relative mx-auto h-48 w-48 md:h-72 md:w-72">
        <SuccessResultImage />
      </div>
      <div>
        <h1 className="w-full text-center text-base text-neutral-800">
          Your property results
        </h1>
      </div>
      <div className="mt-4 space-y-4">
        <section className="rounded-md border p-4">
          <h1 className="w-full font-bold text-neutral-800">For sale value</h1>
          <span className="mt-1 flex justify-between">
            <p className="text-xs text-neutral-600">Estimated value:</p>
            <p className="text-xs font-bold text-neutral-800">₱ 124,415,000</p>
          </span>
        </section>
        <section className="rounded-md border p-4">
          <h1 className="w-full font-bold text-neutral-800">For rent value</h1>
          <span className="mt-1 flex justify-between">
            <p className="text-xs text-neutral-600">Estimated value:</p>
            <p className="text-xs font-bold text-neutral-800">₱ 124,415,000</p>
          </span>
        </section>
      </div>

      <Button
        className="mt-24 w-full"
        type="submit"
        variant="outline"
        onClick={() => {
          setCurrentStepIndex(0);
        }}
      >
        Valuate again
      </Button>
    </>
  );
};

export default ValuationResults;
