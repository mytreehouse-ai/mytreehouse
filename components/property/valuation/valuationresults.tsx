"use client";
import { Button } from "@/components/ui/button";
import ValuationStepper from "@/hooks/useStepperStore";
import useValuationFormStore from "@/hooks/useValuationFormStore";
import SuccessResultImage from "./successresultimage";
import { useGetValuationResultHook } from "@/hooks/useGetValuationResultHook";

const ValuationResults: React.FC = () => {
  const { setCurrentStepIndex } = ValuationStepper();

  const { propertyDetailValues } = useValuationFormStore();

  const { data: valuationData } = useGetValuationResultHook({
    sqm: propertyDetailValues.sqm,
    yearBuilt: parseInt(propertyDetailValues.yearBuilt),
    location: propertyDetailValues.location,
    propertyType: propertyDetailValues.propertyType,
  });

  console.log("VALUATION HOOK RESULT", valuationData);

  return (
    <>
      <div className="relative mx-auto h-48 w-48 md:h-72 md:w-72">
        <SuccessResultImage />
      </div>
      <div>
        <h1 className="w-full text-center text-base font-bold text-neutral-800">
          Your property valuation result
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
        className="mt-4 w-full"
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
