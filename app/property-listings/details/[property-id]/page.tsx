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
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PropertyContactCard from "@/components/property/contact/propertyContactCard";
import { FetchApiError } from "@/lib/exceptions";

interface pageProps {
  params: {
    "property-id": string;
  };
}

const page: React.FC<pageProps> = async ({ params }) => {
  const response = await fetch(
    `${env.NESTJS_BASE_API_URL}/api/property-listing/search/${params["property-id"]}`,
  );

  if (!response.ok) throw new FetchApiError("Property not found.");

  const data: Property = await response.json();

  return (
    <main className="mb-10 flex flex-col space-y-4">
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
      <Separator />
      <div>
        <PropertyDetailsAccordion description={data.description} />
      </div>
      <div className="flex flex-col space-y-6 lg:flex-row">
        <div>
          <h2 className="font-semibold"> Property details</h2>
          <section className="grid grid-cols-2 gap-6">
            <div>
              <div className="inline-flex items-center gap-x-1">
                <Grid className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500 ">Floor area</span>
              </div>
              <p className="text-sm font-semibold">{data.floor_area} sqm</p>
            </div>

            <div>
              <div className="inline-flex items-center gap-x-1">
                <Replace className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500 ">Turn over status</span>
              </div>
              <p className="text-sm font-semibold">
                {data.turnover_status_name}
              </p>
            </div>

            <div>
              <div className="inline-flex items-center gap-x-1">
                <Building2 className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-500 ">Property type</span>
              </div>
              <p className="text-sm font-semibold">{data.property_type_name}</p>
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
        <pre>{JSON.stringify(data, null, 2)}</pre>
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
          Click to know about the property
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
    <Card>
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
