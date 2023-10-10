

import { Property } from "@/interface/property";
import { env } from "@/lib/env.mjs";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { formatToPhp } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Grid, Replace, Building2, ClipboardList, Link as LinkIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import PropertyContactCard from "@/components/property/contact/propertyContactCard";
interface pageProps {
  params: {
    "property-id": string;
  };
}

const page: React.FC<pageProps> = async ({ params }) => {
  const response = await fetch(
    `${env.NESTJS_BASE_API_URL}/api/property-listing/search/${params["property-id"]}`,
  );

  if (!response.ok) throw new Error("Property not found");

  const data: Property = await response.json();

  return (
    <main className="flex flex-col space-y-4 mb-10 lg:px-36">
      <div className="flex gap-x-2">
        <Image
          className="rounded-md"
          src={data.images[0]}
          alt="home_page_main_banner"
          width={700}
          height={500}
          sizes="(max-width: 768px) 100vw, 700px"
          priority={true}
        />
        {data.images.length >= 3 && (
          <div className="relative grid grid-cols-2 gap-2">
            {data.images.slice(1, 4).map((image) => (
              <Image
                key={image}
                src={image}
                className="h-[250px] rounded-md"
                alt="home_page_main_banner"
                width={350}
                height={250}
                sizes="(max-width: 768px) 100vw, 350px"
                priority={true}
              />
            ))}
          </div>
        )}
      </div>
      <div className="space-y-2">
         <h1 className="text-2xl font-semibold  lg:w-full">
            {data.listing_title}
          </h1>
          <address className="inline-flex gap-x-1 font-semibold text-gray-800 not-italic ">
            <MapPin className="h-6 w-6"/>
            {data.address}
          </address>
          <p className="text-2xl font-semibold">
            {formatToPhp(data.current_price)}
          </p>
      </div>
      <Separator />
      <div>
            <PropertyDetailsAccordion description={data.description}/>
      </div>
      <div className="flex flex-col space-y-6 lg:flex-row">

      <div>
          <h2 className="font-semibold"> Property details</h2>
          <section className="grid grid-cols-2 gap-6">
          <div>
              <div className="inline-flex gap-x-1 items-center">
                <Grid className="h-4 w-4 text-gray-500"/>
                <span className=" text-sm text-gray-500">Floor area</span>
              </div>
              <p className="text-sm font-semibold"> {data.floor_area} sqm</p>       
          </div>

            <div>
              <div className="inline-flex gap-x-1 items-center">
                <Replace className="h-4 w-4 text-gray-500"/>
                <span className=" text-sm text-gray-500">Turn over status</span>
              </div>
              <p className="text-sm font-semibold"> {data.turnover_status_name}</p>       
            </div>

            <div>
              <div className="inline-flex gap-x-1 items-center">
                <Building2 className="h-4 w-4 text-gray-500"/>
                <span className=" text-sm text-gray-500">Property type</span>
              </div>
              <p className="text-sm font-semibold"> {data.property_type_name}</p>       
            </div>

              <div>
              <div className="inline-flex gap-x-1 items-center">
                <ClipboardList className="h-4 w-4 text-gray-500"/>
                <span className=" text-sm text-gray-500">Listing type</span>
              </div>
              <p className="text-sm font-semibold"> {data.listing_type_name}</p>       
            </div>

              <div className="col-span-2">
              <div className="inline-flex gap-x-1 items-center">
                <LinkIcon className="h-4 w-4 text-gray-500"/>
                <span className=" text-sm text-gray-500">Listing URL</span>
              </div>
              <Link href={data.listing_url} className="text-sm font-semibold flex underline">{data.listing_url}</Link>       
            </div>
          </section>
      </div>
      <ContactLessor />
      </div>

      {/* <Link href="/property-listings">Go back to listings</Link> */}
    </main>
  );
};

export default page;

const PropertyDetailsAccordion: React.FC<{ description: string }> = ({ description }) => {
  return (
    <Accordion type="single" collapsible className="w-full" >
      <AccordionItem value="description">
        <AccordionTrigger className="text-emerald-700 font-bold">Click to know about the property</AccordionTrigger>
        <AccordionContent>
         <p>{description}</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

const ContactLessor = () => {
  return (
  <Card className="lg:w-1/2">
  <CardHeader>
    <CardTitle className="text-emerald-600">Contact us now!</CardTitle>
    <CardDescription>Know more about this property</CardDescription>
  </CardHeader>
  <CardContent>
    <PropertyContactCard />
  </CardContent>

</Card>
  )
}