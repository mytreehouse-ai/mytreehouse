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
} from "@/components/ui/accordion";
import {
  Grid,
  Replace,
  Building2,
  ClipboardList,
  Link as LinkIcon,
  Bed,
  Bath,
  CarFront,
  BoxSelect,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <main className="mb-10 flex flex-col gap-y-4 lg:px-36">
      <div className="flex gap-x-2">
        <div className="relative h-96 w-full">
          <Image
            className="rounded-md object-cover"
            src={data.images[0]}
            alt="home_page_main_banner"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            priority={true}
          />
        </div>
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
        <h1 className="text-2xl font-semibold lg:w-full">
          {data.listing_title}
        </h1>
        <address className="inline-flex gap-x-1 font-semibold not-italic text-gray-800 ">
          <MapPin className="h-6 w-6" />
          {data.address}
        </address>
        <p className="text-2xl font-semibold">
          {formatToPhp(data.current_price)}
        </p>
      </div>



      <div>
                   <Separator />
        <PropertyDetailsAccordion description={data.description} />
      </div>

      <div className="flex flex-col space-y-6 lg:flex-row">
        <div>
          <h2 className="mb-2 font-semibold">Property details</h2>
          <section className="grid grid-cols-2 gap-6">
            {data.property_type_name === "Vacant Lot" && (
              <div>
                <div className="inline-flex items-center gap-x-1">
                  <Grid className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500 ">Lot Area</span>
                </div>
                <p className="text-sm font-semibold"> {data.sqm} sqm</p>
              </div>
            )}

            {data.property_type_name !== "Vacant Lot" && (
              <div>
                <div className="inline-flex items-center gap-x-1">
                  <Grid className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500 ">Floor area</span>
                </div>
                <p className="text-sm font-semibold"> {data.floor_area} sqm</p>
              </div>
            )}

            {data.property_type_name !== "Vacant Lot" && (
              <div>
                <div className="inline-flex items-center gap-x-1">
                  <BoxSelect className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500 ">Lot area</span>
                </div>
                <p className="text-sm font-semibold"> {data.lot_area} sqm</p>
              </div>
            )}

            {data.property_type_name !== "Vacant Lot" && (
              <div>
                <div className="inline-flex items-center gap-x-1">
                  <Bed className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500 ">Bedroom</span>
                </div>
                <p className="text-sm font-semibold">
                  {" "}
                  {data.bedroom} bedroom/s
                </p>
              </div>
            )}

            {data.property_type_name !== "Vacant Lot" && (
              <div>
                <div className="inline-flex items-center gap-x-1">
                  <Bath className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500 ">Bathroom</span>
                </div>
                <p className="text-sm font-semibold">
                  {" "}
                  {data.bathroom} bathroom/s
                </p>
              </div>
            )}

            {data.property_type_name !== "Vacant Lot" && (
              <div>
                <div className="inline-flex items-center gap-x-1">
                  <Replace className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500 ">
                    Turn over status
                  </span>
                </div>
                <p className="text-sm font-semibold">
                  {" "}
                  {data.turnover_status_name}
                </p>
              </div>
            )}

            {data.property_type_name !== "Vacant Lot" && (
              <div>
                <div className="inline-flex items-center gap-x-1">
                  <CarFront className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500 ">Parking lot</span>
                </div>
                <p className="text-sm font-semibold">
                  {" "}
                  {data.parking_lot} parking lot/s
                </p>
              </div>
            )}

            <div>
              <div className="inline-flex items-center gap-x-1">
                <Building2 className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500 ">Property type</span>
              </div>
              <p className="text-sm font-semibold">
                {" "}
                {data.property_type_name}
              </p>
            </div>

            <div>
              <div className="inline-flex items-center gap-x-1">
                <ClipboardList className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500 ">Listing type</span>
              </div>
              <p className="text-sm font-semibold"> {data.listing_type_name}</p>
            </div>

            <div className="col-span-2">
              <div className="inline-flex items-center gap-x-1">
                <LinkIcon className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500 ">Listing URL</span>
              </div>
              <Link
                href={data.listing_url}
                className="flex text-sm font-semibold underline"
              >
                {data.listing_url}
              </Link>
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

const PropertyDetailsAccordion: React.FC<{ description: string }> = ({
  description,
}) => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="description">
        <AccordionTrigger className="font-bold text-emerald-700">
          Click to know more about the property
        </AccordionTrigger>
        <AccordionContent>
          <p>{description}</p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

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
  );
};
