"use client";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import PropertyDetails from "./propertyDetails";
import ValuationStepper from "@/hooks/useStepperStore";
import PersonalDetails from "./personalDetails";
import ValuationResults from "./valuationResults";
import z from 'zod'


const componentsMap = {
  Property: PropertyDetails,
  Personal: PersonalDetails,
  Results: ValuationResults,
};

export const propertyValuationFormSchema = z.object({
  propertyType: z.string().nonempty(),
  address: z.string().nonempty(),
  location: z.string().nonempty(),
  sqm: z.preprocess((val) => Number(val), z.number().positive()),
  yearBuilt: z.string().nonempty(),
  whenAreyouLookingToSell: z.string().nonempty(),
});

export const personalDetailsFormSchema = z.object({
  lastName: z.string().nonempty(),
  firstName: z.string().nonempty(),
  address: z.string().nonempty(),
  phoneNumber: z.string().nonempty(),
  emailAddress: z.string().nonempty(),
  termsAndConditions: z.boolean().optional(),
  offers: z.boolean().optional()
})

const Valuation: React.FC = () => {
  const { steps, currentStepIndex, markStepAsComplete } = ValuationStepper()

  const ComponentToRender =
    componentsMap[
    steps[currentStepIndex]?.name as keyof typeof componentsMap
    ] || null;

  return (
    <Card className="relative w-full h-[calc(100vh)] md:h-[calc(100vh_-_70%)] overflow-y-auto rounded-t-3xl rounded-b-none md:rounded-xl">
      <div className="px-6 py-6 sticky top-0 left-0 h-20 w-full bg-white z-20 md:pt-6 md:pb-2">
        <Progress value={currentStepIndex === 1 ? 33.33 : currentStepIndex === 2 ? 100 : currentStepIndex === 3 ? 100 : 0} />
      </div>
      <CardContent>
        {ComponentToRender && <ComponentToRender />}
      </CardContent>
    </Card >
  );
};

export default Valuation;
