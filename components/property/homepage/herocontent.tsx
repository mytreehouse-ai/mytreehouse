"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CityCombobox } from "@/components/ui/citycombobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCityUrlValue, getPropertyTypeUrlValue } from "@/lib/utils";
import { propertyTypes } from "@/static_data/property-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { AiOutlineSearch } from "react-icons-all-files/ai/AiOutlineSearch";
import { z } from "zod";

const FormSchema = z.object({
  listingType: z.enum(["for-rent", "for-sale"]).default("for-rent"),
  propertyType: z.string().nonempty(),
  location: z.string().uuid(),
});

const HeroContent: React.FC = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const propertyTypeUrlValue = getPropertyTypeUrlValue(data.propertyType);

    const cityUrlValue = getCityUrlValue(data.location);

    router.push(
      `/property-listings/${propertyTypeUrlValue}/${cityUrlValue}/${data.listingType}`,
    );
  }

  return (
    <div className="absolute inset-0 z-10 flex w-full flex-col items-center justify-center gap-y-10 px-4 lg:flex-row lg:justify-between lg:px-10 xl:px-14">
      <div className="flex w-full flex-col justify-center">
        <p className="text-2xl font-semibold tracking-wide text-white md:text-5xl">
          Your Competitive Edge
        </p>
        <p className="text-2xl font-semibold tracking-wide text-white md:text-5xl">
          in today&apos;s{" "}
          <span className="bg-gradient-to-r from-emerald-300 to-emerald-600 bg-clip-text font-bold text-transparent">
            Real Estate Market.
          </span>
        </p>
      </div>
      <div className="flex w-full flex-col justify-center">
        <Card className="p-5 shadow-sm">
          <CardHeader>
            <CardTitle>Property search</CardTitle>
            <CardDescription>
              Discover the ideal property effortlessly with our advanced search
              functionalities.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs defaultValue="for-rent" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="for-rent"
                  onClick={() => form.setValue("listingType", "for-rent")}
                >
                  For rent
                </TabsTrigger>
                <TabsTrigger
                  value="for-sale"
                  onClick={() => form.setValue("listingType", "for-sale")}
                >
                  For sale
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Form {...form}>
              <form
                name="main_page_search"
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                <FormField
                  control={form.control}
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
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <CityCombobox onCityChange={field.onChange} />
                    </FormItem>
                  )}
                />
                <Button className="w-full text-base" size="lg" type="submit">
                  Find listing
                  <AiOutlineSearch className="ml-2 h-6 w-6" />
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HeroContent;
