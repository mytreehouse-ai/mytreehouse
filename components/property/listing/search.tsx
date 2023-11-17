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
import { cn, createSearchParams, formatToPhpForSlider } from "@/lib/utils";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CityCombobox } from "@/components/ui/citycombobox";
import { propertyTypes } from "@/static_data/property-types";
import { listingTypes } from "@/static_data/listing-types";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { cities } from "@/static_data/cities";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MultiSlider } from "@/components/ui/multislider";
import type { NextPage } from "next";

const SearchSchema = z.object({
  text_search: z.string(),
});

type PageProps = {
  params?: {
    "property-type": string;
    "property-location": string;
    "listing-type": string;
  };
};

const Search: NextPage<PageProps> = ({ params }) => {
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

  const handleMapButtonClick = () => {
    const searchParamsObject = Array.from(searchParams.entries()).reduce(
      (acc: Record<string, string>, [key, value]) => {
        acc[key] = value;
        return acc;
      },
      {},
    );

    const newUrlValue =
      searchParams.get("map-view") === "true"
        ? { ...searchParamsObject, "map-view": "false" }
        : { ...searchParamsObject, "map-view": "true" };

    const newSearchParams = createSearchParams(newUrlValue);

    if (newSearchParams) {
      router.replace(
        window.location.pathname + "?" + newSearchParams.toString(),
        {
          scroll: false,
        },
      );
    }
  };

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
      className="relative w-full"
      open={collapsibleOpen}
      onOpenChange={setCollapsibleOpen}
    >
      <div className="flex flex-col items-center justify-center sm:flex-row sm:gap-x-4">
        <Form {...form}>
          <form
            name="property_search"
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative w-full space-y-8 sm:w-1/3"
          >
            <FormField
              control={form.control}
              name="text_search"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative rounded-lg border">
                      <Input
                        className="py-6 placeholder:text-base"
                        placeholder="Search property"
                        {...field}
                      />
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
        <div className="mt-4 flex space-x-2 sm:mt-0">
          <CollapsibleTrigger asChild>
            <Button
              className={cn(
                collapsibleOpen ? "text-emerald-600" : "text-neutral-800",
                "py-6 text-sm",
              )}
              variant="ghost"
              size="sm"
            >
              More Filters
              <BsFilter className="ml-1 h-6 w-6" />
            </Button>
          </CollapsibleTrigger>
          <Button
            className="py-6 text-sm"
            variant="ghost"
            size="sm"
            onClick={handleMapButtonClick}
          >
            Map <BsMap className="ml-1 h-6 w-6" />
          </Button>
        </div>
      </div>
      <CollapsibleContent className="mt-8 w-full">
        <PropertyFilters
          pagePropParams={params}
          closeCollapsible={() => setCollapsibleOpen(!collapsibleOpen)}
        />
      </CollapsibleContent>
    </Collapsible>
  );
};

interface PropertyFiltersProps {
  closeCollapsible: () => void;
  pagePropParams?: {
    "property-type": string;
    "property-location": string;
    "listing-type": string;
  };
}

const PropertyFilters = ({
  closeCollapsible,
  pagePropParams,
}: PropertyFiltersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filterSchema = z
    .object({
      location: z.string(),
      listing_type: z.string(),
      property_type: z.string(),
      bedroom_count: z.string(),
      bathroom_count: z.string(),
      sqm_min: z.string(),
      sqm_max: z.string(),
      max_price: z.number(),
      min_price: z.number(),
    })
    .partial();

  const additionalFiltersForm = useForm<z.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
    values: {
      location: pagePropParams
        ? cities.find(
            (ct) => ct.urlValue === pagePropParams?.["property-location"],
          )?.value
        : searchParams.has("location")
        ? cities.find(
            (ct) => ct.urlValue === String(searchParams.get("location")),
          )?.value
        : "",
      listing_type: pagePropParams
        ? listingTypes.find(
            (lt) => lt.urlValue === pagePropParams?.["listing-type"],
          )?.value
        : searchParams.has("listing_type")
        ? listingTypes.find(
            (lt) => lt.urlValue === String(searchParams.get("listing_type")),
          )?.value
        : "",
      property_type: pagePropParams
        ? propertyTypes.find(
            (pt) => pt.urlValue === pagePropParams?.["property-type"],
          )?.value
        : searchParams.has("property_type")
        ? propertyTypes.find(
            (pt) => pt.urlValue === String(searchParams.get("property_type")),
          )?.value
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
        ? Number(searchParams.get("max_price"))
        : 999_999_999,
      // max_price: searchParams.has("max_price")
      //   ? String(searchParams.get("max_price")).split(",").map(Number)
      //   : undefined,
    },
  });

  const { watch } = additionalFiltersForm;

  const watchPropertyType = watch(["property_type"]);

  const VACANT_LOT_KEY = "238aa2f4-d1aa-4af7-8afe-9413b24cf3ae";

  const WAREHOUSE_KEY = "166968a2-1c59-412c-8a50-4a75f61e56bc";

  const shouldShowFields =
    watchPropertyType[0] !== VACANT_LOT_KEY &&
    watchPropertyType[0] !== WAREHOUSE_KEY;

  const onClearFilters = () => {
    additionalFiltersForm.reset();
    router.replace(window.location.pathname, {
      scroll: false,
    });
  };

  const onFilterFormSubmit = (value: z.infer<typeof filterSchema>) => {
    if (pagePropParams) {
      const propertyType = propertyTypes.find(
        (pt) => pt.value === value.property_type,
      )?.urlValue;

      const city = cities.find((ct) => ct.value === value.location)?.urlValue;

      const listingType = listingTypes.find(
        (lt) => lt.value === value.listing_type,
      )?.urlValue;

      const { location, listing_type, property_type, ...newFilters } = value;

      const filterSearchParams = createSearchParams(newFilters);

      console.log(filterSearchParams?.toString());

      if (filterSearchParams) {
        router.push(
          `/property-listings/${propertyType}/${city}/${listingType}?${filterSearchParams.toString()}`,
          {
            scroll: false,
          },
        );
      }
    } else {
      if (value?.location) {
        value.location = cities.find((ct) => ct.value === value.location)
          ?.urlValue;
      }

      if (value?.listing_type) {
        value.listing_type = listingTypes.find(
          (lt) => lt.value === value.listing_type,
        )?.urlValue;
      }

      if (value?.property_type) {
        value.property_type = propertyTypes.find(
          (pt) => pt.value === value.property_type,
        )?.urlValue;
      }

      const urlValue = searchParams.has("map-view")
        ? {
            ...value,
            "map-view": searchParams.get("map-view"),
          }
        : value;

      const filterSearchParams = createSearchParams(urlValue);

      if (filterSearchParams && filterSearchParams.size) {
        router.replace(
          window.location.pathname + "?" + filterSearchParams.toString(),
          {
            scroll: false,
          },
        );
      }
    }

    void closeCollapsible();
  };

  return (
    <ScrollArea className="mx-auto mt-6 h-96 w-full md:h-auto">
      <div>
        <Form {...additionalFiltersForm}>
          <form
            name="additionalFilters"
            onSubmit={additionalFiltersForm.handleSubmit(onFilterFormSubmit)}
          >
            <div className="space-y-4">
              <div className="mx-auto flex w-5/6 flex-col items-end justify-center gap-x-2 gap-y-4 md:flex-row md:gap-y-0">
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
                      <FormLabel className="text-neutral-500">
                        Listing
                      </FormLabel>
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
                      <FormLabel className="text-neutral-500">
                        Property
                      </FormLabel>
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
              <div className="mx-auto flex w-5/6 flex-col items-start justify-center gap-x-2 gap-y-4 md:flex-row md:gap-y-0">
                {shouldShowFields && (
                  <>
                    <FormField
                      control={additionalFiltersForm.control}
                      name="bedroom_count"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel className="text-neutral-500 ">
                            Bedroom
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value ?? ""}
                              placeholder="Enter bedroom count"
                              type="number"
                              min={1}
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
                          <FormLabel className="text-neutral-500">
                            Bathroom
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value ?? ""}
                              placeholder="Enter bathroom count"
                              type="number"
                              min={1}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </>
                )}

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
                          min={1}
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
                          min={1}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="w-full space-y-4">
                  <label
                    htmlFor="max_price"
                    className="text-sm font-medium leading-none text-neutral-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Price Range
                  </label>
                  <MultiSlider
                    max={1_000_000_000}
                    min={0}
                    step={1}
                    value={[0, 1_000_000_000]}
                    minStepsBetweenThumbs={100_000_000}
                    onValueChange={(values) => {
                      // console.log(values)
                      additionalFiltersForm.setValue("min_price", values[0]);
                      additionalFiltersForm.setValue("max_price", values[1]);
                    }}
                    formatLabel={(value) => `${formatToPhpForSlider(value)}`}
                    withoutLabel={false}
                  />
                </div>
              </div>
              <div className="mx-auto flex w-full flex-col items-end justify-center gap-x-2 gap-y-2 pt-4 md:w-1/2 md:flex-row md:gap-y-0">
                <Button
                  type="reset"
                  variant="outline"
                  onClick={onClearFilters}
                  className="w-full md:w-fit"
                >
                  Clear
                </Button>
                <Button type="submit" className="w-full md:w-fit">
                  Submit filters
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </ScrollArea>
  );
};

export default Search;
