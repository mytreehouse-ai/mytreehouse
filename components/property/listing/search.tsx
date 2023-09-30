"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
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
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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

  function onSubmit(data: z.infer<typeof SearchSchema>) {
    const searchParams = createSearchParams(data);

    if (searchParams && searchParams.size) {
      router.replace(window.location.pathname + "?" + searchParams.toString(), {
        scroll: false,
      });
    }
  }

  return (
    <div className="flex items-center justify-center w-full gap-x-4">
      <Form {...form}>
        <form
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
                  <div className="relative border rounded-lg">
                    <Input
                      className="py-6 placeholder:text-base"
                      placeholder="Search property"
                      {...field}
                    />
                    {/* Position your button absolutely within the parent div */}
                    <Button
                      type="submit"
                      className="absolute right-0 flex items-center px-3 mr-1 text-base transform -translate-y-1/2 top-1/2"
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
      <Button className="py-6 text-sm" onClick={() => setFilterOpen(true)} variant="ghost" size="sm">
        Filters <BsFilter className="w-6 h-6 ml-1" />
      </Button>
      <Button className="py-6 text-sm" variant="secondary" size="sm">
        Map <BsMap className="w-6 h-6 ml-1" />
      </Button>
      <>
        <PropertyFilters filterOpen={filterOpen} setFilterOpen={setFilterOpen} />
      </>
    </div>
  );
}

interface PropertyFiltersProps {
  filterOpen: boolean;
  setFilterOpen: (open: boolean) => void;
}

const PropertyFilters = ({ filterOpen, setFilterOpen }: PropertyFiltersProps) => {
  const [priceValue, setPriceValue] = useState<number[]>([999999])

  const additionalFiltersForm = useForm()

  const onSubmit = () => {
    console.log('added');
  }

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
            onSubmit={additionalFiltersForm.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={additionalFiltersForm.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="City location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="m@example.com">m@example.com</SelectItem>
                      <SelectItem value="m@google.com">m@google.com</SelectItem>
                      <SelectItem value="m@support.com">m@support.com</SelectItem>
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Type of listing" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="m@example.com">m@example.com</SelectItem>
                      <SelectItem value="m@google.com">m@google.com</SelectItem>
                      <SelectItem value="m@support.com">m@support.com</SelectItem>
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Type of property" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="m@example.com">m@example.com</SelectItem>
                      <SelectItem value="m@google.com">m@google.com</SelectItem>
                      <SelectItem value="m@support.com">m@support.com</SelectItem>
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
                      <Input placeholder="Enter bedroom count" type="text" {...field} />
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
                      <Input placeholder="Enter bathroom count" type="text" {...field} />
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
                      <Input placeholder="Enter minimum sqm" type="number" {...field} />
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
                      <Input placeholder="Enter maximum sqm" type="number" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <label
                htmlFor="offers"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Maximum price
              </label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Slider id='maximumPrice' defaultValue={priceValue} onValueChange={(e) => setPriceValue([...e])} max={9999999} step={1} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{priceValue}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </form>
        </Form>

        <DialogFooter>
          <Button type="submit">Set filter</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  )
}
