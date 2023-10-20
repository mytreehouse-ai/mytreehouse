"use client";
import { Button } from "@/components/ui/button";
import ValuationStepper from "@/hooks/useStepperStore";
import useValuationFormStore from "@/hooks/useValuationFormStore";
import SuccessResultImage from "./successresultimage";
import { useGetValuationResultHook } from "@/hooks/useGetValuationResultHook";
import { Separator } from "@/components/ui/separator";

const ValuationResults: React.FC = () => {
  const { setCurrentStepIndex } = ValuationStepper();

  const { propertyDetailValues } = useValuationFormStore();

  const { data: valuationData } = useGetValuationResultHook({
    sqm: propertyDetailValues.sqm,
    yearBuilt: parseInt(propertyDetailValues.yearBuilt),
    location: propertyDetailValues.location,
    propertyType: propertyDetailValues.propertyType,
  });

  const forSaleValue = valuationData?.phpFormat.withoutClosedTransaction.forSale;
  const forRentValue = valuationData?.phpFormat.withoutClosedTransaction.forRent

  return (
    <>
      <div className="relative mx-auto h-40 w-40 md:h-60 md:w-60">
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
          <span className="mt-1 flex justify-between items-end">
            <p className=" text-neutral-600 text-sm">Estimated value:</p>
            <p className="font-bold text-emerald-700">{forSaleValue?.pricePerSqm}</p>
          </span>
          <Separator className="my-2"/>
            <span className="mt-4 flex justify-between items-end">
            <p className=" text-neutral-600 text-sm">Appraisal value:</p>
            <p className="font-bold text-emerald-700">{forSaleValue?.appraisalValue}</p>
          </span>
        </section>
        <section className="rounded-md border p-4">
          <h1 className="w-full font-bold text-neutral-800">For rent value</h1>
          <span className="mt-4 flex justify-between">
          <p className=" text-neutral-600 text-sm">Estimated value:</p>
          <p className="font-bold text-emerald-700">{forRentValue?.pricePerSqm}</p>
          </span>
                 <Separator className="my-2"/>
          <span className="mt-1 flex justify-between items-end ">
            <p className=" text-neutral-600 text-sm">Appraisal value:</p>
            <p className="font-bold text-emerald-700">{forRentValue?.appraisalValue}</p>
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
