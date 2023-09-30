"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ValuationStepper from "@/hooks/useStepperStore";

const ValuationResults: React.FC = () => {
  const { setCurrentStepIndex } = ValuationStepper();
  return (
    <>
      <div className="relative mx-auto h-48 w-48 md:h-72 md:w-72">
        <Image src="/valuation-success-image.svg" fill alt="Oops, we're lost" />
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
