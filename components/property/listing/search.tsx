"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { BsFilter } from "react-icons-all-files/bs/BsFilter";
import { BsMap } from "react-icons-all-files/bs/BsMap";
import { createSearchParams } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CityCombobox } from "@/components/ui/citycombobox";
import { propertyTypes } from "@/static_data/property-types";
import { listingTypes } from "@/static_data/listing-types";

const SearchSchema = z.object({
  text_search: z.string(),
});

export function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filterOpen, setFilterOpen] = useState(false);

  const form = useForm<z.infer<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      text_search: searchParams.has("text_search")
        ? (searchParams.get("text_search") as string)
        : "",
    },
  });

  const onSubmit = (data: z.infer<typeof SearchSchema>) => {
    const searchParams = createSearchParams(data);

    if (searchParams && searchParams.size) {
      router.replace(window.location.pathname + "?" + searchParams.toString(), {
        scroll: false,
      });
    }
  };

  return (
    <div className="flex w-full items-center justify-center gap-x-4">
      <Form {...form}>
        <form
          name="property_search"
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative w-1/3 space-y-8"
        >
          <FormField
            control={form.control}
            name="text_search"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  {/* Add this div with a relative position */}
                  <div className="relative rounded-lg border">
                    <Input
                      className="py-6 placeholder:text-base"
                      placeholder="Search property"
                      {...field}
                    />
                    {/* Position your button absolutely within the parent div */}
                    <Button
                      type="submit"
                      className="absolute right-0 top-1/2 mr-1 flex -translate-y-1/2 transform items-center px-3 text-base"
                    >
                      Search
                    </Button>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
      <Button
        className="py-6 text-sm"
        onClick={() => setFilterOpen(true)}
        variant="ghost"
        size="sm"
      >
        Filters <BsFilter className="ml-1 h-6 w-6" />
      </Button>
      <Button className="py-6 text-sm" variant="secondary" size="sm">
        Map <BsMap className="ml-1 h-6 w-6" />
      </Button>
      <>
        <PropertyFilters
          filterOpen={filterOpen}
          setFilterOpen={setFilterOpen}
        />
      </>
    </div>
  );
}

interface PropertyFiltersProps {
  filterOpen: boolean;
  setFilterOpen: (open: boolean) => void;
}

const PropertyFilters = ({
  filterOpen,
  setFilterOpen,
}: PropertyFiltersProps) => {
  const [priceValue, setPriceValue] = useState<number[]>([999999]);

  const router = useRouter();
  const searchParams = useSearchParams();

  const filterSchema = z.object({
    location: z.string().optional(),
    listing_type: z.string().optional(),
    property_type: z.string().optional(),
    bedroom_count: z.string().optional(),
    bathroom_count: z.string().optional(),
    sqm_min: z.string().optional(),
    sqm_max: z.string().optional(),
    max_price: z.number().optional(),
  });

  const additionalFiltersForm = useForm<z.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      location: searchParams.has("location") ? String(searchParams.get("location")) : "",
      listing_type: searchParams.has("listing_type")
        ? String(searchParams.get("listing_type"))
        : "",
      property_type: searchParams.has("property_type")
        ? String(searchParams.get("property_type"))
        : "",
      bedroom_count: searchParams.has("bedroom_count")
        ? String(searchParams.get("bedroom_count"))
        : "",
      bathroom_count: searchParams.has("bathroom_count")
        ? String(searchParams.get("bathroom_count"))
        : "",
      sqm_min: searchParams.has("sqm_min")
        ? String(searchParams.get("sqm_min"))
        : "",
      sqm_max: searchParams.has("sqm_max")
        ? String(searchParams.get("sqm_max"))
        : "",
      max_price: searchParams.has("max_price")
        ? (parseInt(searchParams.get("max_price") || ""))
        : undefined,
    },
  });

  const onClearFilters = () => {
    additionalFiltersForm.reset();
    router.replace(window.location.pathname, {
      scroll: false,
    });
    console.log(additionalFiltersForm.getValues());
  };

  const onFilterFormSubmit = (value: z.infer<typeof filterSchema>) => {
    const filterSearchParams = createSearchParams(value);

    if (filterSearchParams && filterSearchParams.size) {
      router.replace(
        window.location.pathname + "?" + filterSearchParams.toString(),
        {
          scroll: false,
        },
      );
    }

    setFilterOpen(false);
  };

  return (
    <Dialog open={filterOpen} onOpenChange={setFilterOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
          <DialogDescription>
            Refine your property search with specific criteria and filters
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <DialogTitle className="mt-2">Location and Type</DialogTitle>
        <Form {...additionalFiltersForm}>
          <form
            name="additionalFilters"
            onSubmit={additionalFiltersForm.handleSubmit(onFilterFormSubmit)}
            className="space-y-4"
          >
            <FormField
              control={additionalFiltersForm.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <CityCombobox onCityChange={val => field.onChange(val)} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={additionalFiltersForm.control}
              name="listing_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Listing type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Type of listing" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {listingTypes.map((pt) => (
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
              control={additionalFiltersForm.control}
              name="property_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Type of property" />
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

            <DialogTitle>Property Requirements</DialogTitle>
            <div className="flex space-x-4">
              <FormField
                control={additionalFiltersForm.control}
                name="bedroom_count"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Bedroom</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Enter bedroom count"
                        type="text"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={additionalFiltersForm.control}
                name="bathroom_count"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Bathroom</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Enter bathroom count"
                        type="text"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex space-x-4">
              <FormField
                control={additionalFiltersForm.control}
                name="sqm_min"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Minimum sqm</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Enter minimum sqm"
                        type="number"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={additionalFiltersForm.control}
                name="sqm_max"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Maximum sqm</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        placeholder="Enter maximum sqm"
                        type="number"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4">
              <label
                htmlFor="maximumPrice"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Maximum price
              </label>
              <FormField
                control={additionalFiltersForm.control}
                name="max_price"
                render={({ field: { value, onChange } }) => (

                  <FormItem>
                    <FormControl>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Slider
                              defaultValue={[value ?? 0]}
                              onValueChange={(values) => onChange(values[0])}
                              min={0}
                              max={9999999}
                              step={1}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{value}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormControl>
                  </FormItem>
                )}
              />

            </div>

            <DialogFooter>
              <Button type="reset" variant="outline" onClick={onClearFilters}>
                Clear
              </Button>
              <Button type="submit">Submit filters</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
