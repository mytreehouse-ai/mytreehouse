import Link from "next/link";
import Card from "@/components/property/card";
import Grid from "@/components/property/grid";
import Footer from "@/components/layouts/footer";
import HeroContent from "@/components/property/homepage/herocontent";
import HeroImageBanner from "@/components/property/homepage/heroimagebanner";
import Navbar from "@/components/layouts/navbar";
import { Property } from "@/interface/property";
import { FetchApiError } from "@/lib/exceptions";
import { env } from "@/lib/env.mjs";

export default async function Home() {
  const topFourProperties = await fetch(
    `${env.NEXT_PUBLIC_BASEAPI_URL}/api/properties/listing/search?page_limit=4`,
    {
      next: {
        revalidate: 350,
      },
    },
  );

  if (!topFourProperties.ok) {
    throw new FetchApiError("Error fetching top 4 properties");
  }

  const data: Property[] = await topFourProperties.json();

  return (
    <main className="h-screen">
      <Navbar />
      <div className="relative h-full lg:mx-8 lg:mt-[5.7rem]">
        <HeroContent />
        <HeroImageBanner />
      </div>
      <div className="w-full p-8">
        <div className="flex items-center justify-between">
          <p className="text-4xl font-bold tracking-wide text-emerald-600">
            Latest Properties
          </p>
          <Link
            className="rounded-md border px-4 py-2.5 text-base font-semibold text-emerald-600"
            href="/property-listings"
          >
            More Listing
          </Link>
        </div>
        <Grid>
          {data.map((pt) => (
            <Card key={pt.property_id} property={pt} />
          ))}
        </Grid>
      </div>
      <Footer />
    </main>
  );
}
