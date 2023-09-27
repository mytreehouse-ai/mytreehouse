"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import ValuationStepper from "@/hooks/useStepperStore";

const ValuationResults: React.FC = () => {
  const { setCurrentStepIndex } = ValuationStepper();
  return <>
    <div className="relative mx-auto h-48 w-48 md:h-72 md:w-72">
      <Image src="/valuation-success-image.svg" fill alt="Oops, we're lost" />
    </div>
    <div>
      <h1 className="w-full text-base text-neutral-800  text-center">Your property results</h1>
    </div>
    <div className="space-y-4 mt-4">
      <section className="border rounded-md p-4">
        <h1 className="w-full text-neutral-800 font-bold">For sale value</h1>
        <span className="flex justify-between mt-1">
          <p className="text-xs text-neutral-600">Estimated value:</p>
          <p className="text-xs text-neutral-800 font-bold">₱ 124,415,000</p>
        </span>

      </section>
      <section className="border rounded-md p-4">
        <h1 className="w-full text-neutral-800 font-bold">For rent value</h1>
        <span className="flex justify-between mt-1">
          <p className="text-xs text-neutral-600">Estimated value:</p>
          <p className="text-xs text-neutral-800 font-bold">₱ 124,415,000</p>
        </span>
      </section>
    </div>

    <Button className="w-full mt-24" type="submit" variant='outline' onClick={() => {
      setCurrentStepIndex(0);

    }}>
      Valuate again
    </Button>
  </>;
};

export default ValuationResults;
