"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ValuationStepper from "@/hooks/useStepperStore";
import { propertyValuationFormSchema } from ".";
import useValuationFormStore from "@/hooks/useValuationFormStore";
import { propertyTypes } from "@/static_data/property-types";
import { yearBuilt } from "@/static_data/year-built";
import { listingDuration } from "@/static_data/listing-duration";
import { listingTypes } from "@/static_data/listing-types";
import { CityCombobox } from "@/components/ui/citycombobox";

const PropertyDetails: React.FC = () => {
  const { currentStepIndex, setCurrentStepIndex, steps } = ValuationStepper();
  const { propertyDetailValues, setPropertyDetailValues } =
    useValuationFormStore();

  const form = useForm<z.infer<typeof propertyValuationFormSchema>>({
    resolver: zodResolver(propertyValuationFormSchema),
    values: propertyDetailValues,
  });

  function onSubmit(values: z.infer<typeof propertyValuationFormSchema>) {
    setPropertyDetailValues(values);
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(+1);
    }
  }

  return (
    <Form {...form}>
      <h2 className="w-full text-lg font-bold text-neutral-800">
        Tell us about your property
      </h2>
      <form
        name="test"
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-4 space-y-4"
      >
        <FormField
          control={form.control}
          name="propertyType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Property type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {propertyTypes.map((pt) => (
                    <SelectItem key={pt.value} value={pt.value}>
                      {pt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Address"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <CityCombobox onCityChange={field.onChange} />
            </FormItem>
          )}
        />

        <div className="w-full md:flex md:gap-x-6">
          <FormField
            control={form.control}
            name="sqm"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Sqm</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Sqm"
                    type="number"
                    min="1"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="yearBuilt"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Year built</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Year built" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {yearBuilt.map((data) => (
                      <SelectItem key={data.value} value={data.value}>
                        {data.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="listingType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Looking to?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {listingTypes.map((data) => (
                    <SelectItem key={data.value} value={data.value}>
                      {data.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="whenAreyouLookingToSell"
          render={({ field }) => (
            <FormItem>
              <FormLabel>When are you looking to sell?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Listing urgency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {listingDuration.map((data) => (
                    <SelectItem key={data.value} value={data.value}>
                      {data.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Next
        </Button>
      </form>
    </Form>
  );
};

export default PropertyDetails;
