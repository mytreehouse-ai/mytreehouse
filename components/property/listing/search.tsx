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
  }

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

  const router = useRouter()
  const searchParams = useSearchParams();

  const filterSchema = z.object({
    city: z.string().optional(),
    listingType: z.string().optional(),
    propertyType: z.string().optional(),
    bedroom: z.string().optional(),
    bathroom: z.string().optional(),
    minimumSqm: z.string().optional(),
    maximumSqm: z.string().optional(),
    maximumPrice: z.number().optional(),
  });

  const additionalFiltersForm = useForm<z.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      city: searchParams.has("city") ? (searchParams.get("city") as string) : "",
      listingType: searchParams.has("listingType")
        ? (searchParams.get("listingType") as string)
        : "",
      propertyType: searchParams.has("propertyType")
        ? (searchParams.get("propertyType") as string)
        : "",
      bedroom: searchParams.has("bedroom")
        ? (searchParams.get("bedroom") as string)
        : "",
      bathroom: searchParams.has("bathroom")
        ? (searchParams.get("bathroom") as string)
        : "",
      minimumSqm: searchParams.has("minimumSqm")
        ? (searchParams.get("minimumSqm") as string)
        : "",
      maximumSqm: searchParams.has("maximumSqm")
        ? (searchParams.get("maximumSqm") as string)
        : "",
      // maximumPrice: searchParams.has("maximumPrice")
      //   ? (searchParams.get("maximumPrice") as string)
      //   : "",
    }
  });

  const onClearFilters = () => {
    additionalFiltersForm.reset()
    router.replace(window.location.pathname, {
      scroll: false,
    });
    console.log(additionalFiltersForm.getValues())
  }

  const onFilterFormSubmit = (value: z.infer<typeof filterSchema>) => {
    const filterSearchParams = createSearchParams(value);

    if (filterSearchParams && filterSearchParams.size) {
      router.replace(window.location.pathname + "?" + filterSearchParams.toString(), {
        scroll: false,
      });
    }

    setFilterOpen(false)
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
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="City location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="m@example.com">
                        m@example.com
                      </SelectItem>
                      <SelectItem value="m@google.com">m@google.com</SelectItem>
                      <SelectItem value="m@support.com">
                        m@support.com
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={additionalFiltersForm.control}
              name="listingType"
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
                      <SelectItem value="m@example.com">
                        m@example.com
                      </SelectItem>
                      <SelectItem value="m@google.com">m@google.com</SelectItem>
                      <SelectItem value="m@support.com">
                        m@support.com
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={additionalFiltersForm.control}
              name="propertyType"
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
                      <SelectItem value="m@example.com">
                        m@example.com
                      </SelectItem>
                      <SelectItem value="m@google.com">m@google.com</SelectItem>
                      <SelectItem value="m@support.com">
                        m@support.com
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <DialogTitle>Property Requirements</DialogTitle>
            <div className="flex space-x-4">
              <FormField
                control={additionalFiltersForm.control}
                name="bedroom"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Bedroom</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        placeholder="Enter bedroom count"
                        type="text"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={additionalFiltersForm.control}
                name="bathroom"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Bathroom</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ''}
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
                name="minimumSqm"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Minimum sqm</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        placeholder="Enter minimum sqm"
                        type="number"

                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={additionalFiltersForm.control}
                name="maximumSqm"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Maximum sqm</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        placeholder="Enter maximum sqm"
                        type="number"

                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={additionalFiltersForm.control}
              name="maximumPrice"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormControl>
                    <Slider
                      // id="maximumPrice"
                      // defaultValue={priceValue}
                      // onValueChange={(e) => {
                      //   void onChange()
                      //   setPriceValue([...e])
                      // }}
                      defaultValue={[value ?? 0]}
                      onValueChange={(values) => onChange(values[0])}
                      min={0}
                      max={9999999}
                      step={1}
                    />
                    {/* <div className="space-y-4">
                      <label
                        htmlFor="offers"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Maximum price
                      </label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Slider
                              id="maximumPrice"
                              defaultValue={priceValue}
                              onValueChange={(e) => {
                                void onChange()
                                setPriceValue([...e])
                              }}
                              min={0}
                              max={9999999}
                              step={1}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{priceValue}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div> */}
                  </FormControl>
                </FormItem>

              )}
            />

            <DialogFooter>
              <Button type="reset" variant="outline" onClick={onClearFilters}>Clear</Button>
              <Button type="submit" >Submit filters</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
