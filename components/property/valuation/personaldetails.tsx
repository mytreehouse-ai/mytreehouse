"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import ValuationStepper from "@/hooks/useStepperStore";
import { personalDetailsFormSchema } from ".";
import { Checkbox } from "@/components/ui/checkbox";
import useValuationFormStore from "@/hooks/useValuationFormStore";
import { useQuery } from "@tanstack/react-query";
import { propertyTypes } from "@/static_data/property-types";
import { createSearchParams } from "@/lib/utils";
import { Valuation } from "@/interface/valuation";

const PersonalDetails: React.FC = () => {
  const { currentStepIndex, setCurrentStepIndex, steps } = ValuationStepper();
  const { propertyDetailValues, personalDetailValues,setPersonalDetailValues } =
    useValuationFormStore();

  const form = useForm<z.infer<typeof personalDetailsFormSchema>>({
    resolver: zodResolver(personalDetailsFormSchema),
    values: personalDetailValues
  });

  const onSubmit = (values: z.infer<typeof personalDetailsFormSchema>) => {
   
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const goBack = () => {
    const formValues = form.getValues();
     setPersonalDetailValues(formValues);
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  // TODO: Prefetch query to avoid loading on the next step
  useQuery({
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

      return (await response.json()) as Valuation;
    },
  });

  return (
    <Form {...form}>
      <h2 className="w-full text-lg font-bold text-neutral-800">
        Tell us more about the seller
      </h2>
      <form
        name="personalDetailsForm"
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-4 space-y-6"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Type your First name"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Type your Last name"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Type your phone number here"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="emailAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Type your email address here"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex space-x-2">
          <Checkbox id="termsAndConditions" />
          <label
            htmlFor="termsAndConditions"
            className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Using this valuation tool, I agree to mytree.house terms and
            conditions
          </label>
        </div>

        <div className="flex space-x-2">
          <Checkbox id="offers" />
          <label
            htmlFor="offers"
            className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            MyTreeHouse can contact me about my property journey, with relevant
            properties, offers and news
          </label>
        </div>

        <div className="flex space-x-2">
          <Button
            className="w-full"
            type="button"
            variant="outline"
            onClick={goBack}
          >
            Previous
          </Button>
          <Button className="w-full" type="submit">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PersonalDetails;
