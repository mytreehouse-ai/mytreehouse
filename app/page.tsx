import Card from "@/components/property/card";
import Grid from "@/components/property/grid";
import Footer from "@/components/layouts/footer";
import HeroContent from "@/components/property/homepage/herocontent";
import HeroImageBanner from "@/components/property/homepage/heroimagebanner";
import Navbar from "@/components/layouts/navbar";
import { Property } from "@/interface/property";
import { env } from "@/lib/env.mjs";
import Link from "next/link";

export default async function Home() {
  const topFourProperties = await fetch(
    `${env.NESTJS_BASE_API_URL}/api/property-listing/search?page_limit=4`,
  );

  if (!topFourProperties.ok) throw new Error("Error loading top 4 properties");

  const data: Property[] = await topFourProperties.json();

  return (
    <main className="h-screen">
      <Navbar shadowMd />
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
