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
import { cn, createSearchParams, formatToPhp } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
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
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

const SearchSchema = z.object({
  text_search: z.string(),
});

export function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);

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
    <Collapsible
      className="w-full"
      open={collapsibleOpen}
      onOpenChange={setCollapsibleOpen}
    >
      <div className="flex w-full items-center justify-center gap-x-4">
        <Form {...form}>
          <form
            name="property_search"
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative w-1/3 space-y-8 "
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
        <CollapsibleTrigger asChild>
          <Button
            className={cn(
              collapsibleOpen ? "text-emerald-600" : "text-neutral-800",
              "py-6 text-sm",
            )}
            // onClick={() => setFilterOpen(true)}
            variant="ghost"
            size="sm"
          >
            {collapsibleOpen ? "Hide filters" : "Filters"}{" "}
            <BsFilter className="ml-1 h-6 w-6" />
          </Button>
        </CollapsibleTrigger>
        <Button className="py-6 text-sm" variant="secondary" size="sm">
          Map <BsMap className="ml-1 h-6 w-6" />
        </Button>
      </div>
      <CollapsibleContent className="mt-8 w-full">
        <PropertyFilters
          closeCollapsible={() => setCollapsibleOpen(!collapsibleOpen)}
        />
      </CollapsibleContent>
    </Collapsible>
  );
}

interface PropertyFiltersProps {
  closeCollapsible: () => void;
}

const PropertyFilters = ({ closeCollapsible }: PropertyFiltersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  console.log("test");

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
      location: searchParams.has("location")
        ? String(searchParams.get("location"))
        : "",
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
        ? parseInt(searchParams.get("max_price") || "")
        : undefined,
    },
  });

  const onClearFilters = () => {
    additionalFiltersForm.reset();
    router.replace(window.location.pathname, {
      scroll: false,
    });
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
    void closeCollapsible();
  };

  return (
    <div className="mx-auto mt-6 w-full">
      <Form {...additionalFiltersForm}>
        <form
          name="additionalFilters"
          onSubmit={additionalFiltersForm.handleSubmit(onFilterFormSubmit)}
        >
          <div className="space-y-4">
            <div className="mx-auto flex w-5/6 items-end justify-center gap-x-2">
              <FormField
                control={additionalFiltersForm.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-neutral-500">City</FormLabel>
                    <FormControl>
                      <CityCombobox onCityChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={additionalFiltersForm.control}
                name="listing_type"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-neutral-500">Listing</FormLabel>
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
                  <FormItem className="w-full">
                    <FormLabel className="text-neutral-500">Property</FormLabel>
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
            </div>
            <div className="mx-auto flex w-5/6 flex-row items-start justify-center gap-x-2">
              <FormField
                control={additionalFiltersForm.control}
                name="bedroom_count"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-neutral-500 ">Bedroom</FormLabel>
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
                    <FormLabel className="text-neutral-500">Bathroom</FormLabel>
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
              <FormField
                control={additionalFiltersForm.control}
                name="sqm_min"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-neutral-500">
                      Minimum sqm
                    </FormLabel>
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
                    <FormLabel className="text-neutral-500">
                      Maximum sqm
                    </FormLabel>
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
              <div className="w-full space-y-4">
                <label
                  htmlFor="maximumPrice"
                  className="text-sm font-medium leading-none text-neutral-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                                max={999_999_999}
                                step={1}
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{formatToPhp(value)}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="mx-auto flex w-1/2 items-end justify-center gap-x-2 pt-4">
              <Button type="reset" variant="outline" onClick={onClearFilters}>
                Clear
              </Button>
              <Button type="submit">Submit filters</Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
