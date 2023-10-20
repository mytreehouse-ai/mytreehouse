"use client";
import z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import ValuationStepper from "@/hooks/useStepperStore";
import PropertyDetails from "./propertydetails";
import PersonalDetails from "./personaldetails";
import ValuationResults from "./valuationresults";

const componentsMap = {
  Property: PropertyDetails,
  Personal: PersonalDetails,
  Results: ValuationResults,
};

export const propertyValuationFormSchema = z.object({
  propertyType: z.string().nonempty(),
  address: z.string().nonempty(),
  location: z.string().uuid(),
  sqm: z.preprocess((val) => Number(val), z.number().positive()),
  yearBuilt: z.string().nonempty(),
  whenAreyouLookingToSell: z.string().nonempty(),
});

export const personalDetailsFormSchema = z.object({
  lastName: z.string().nonempty(),
  firstName: z.string().nonempty(),
  phoneNumber: z.string().nonempty(),
  emailAddress: z.string().email().nonempty(),
  termsAndConditions: z.boolean().refine((val) => val === true),
  offers: z.boolean().optional(),
});

const Valuation: React.FC = () => {
  const { steps, currentStepIndex, markStepAsComplete } = ValuationStepper();

  const ComponentToRender =
    componentsMap[
      steps[currentStepIndex]?.name as keyof typeof componentsMap
    ] || null;

  return (
    <Card className="relative w-full overflow-y-auto rounded-xl md:rounded-xl">
      <div className="sticky left-0 top-0 z-10 flex h-20 w-full items-center justify-center bg-white px-6">
        <Progress
          value={
            currentStepIndex === 1
              ? 33.33
              : currentStepIndex === 2
              ? 100
              : currentStepIndex === 3
              ? 100
              : 0
          }
        />
      </div>
      <CardContent>{ComponentToRender && <ComponentToRender />}</CardContent>
    </Card>
  );
};

export default Valuation;
