import { Property } from "@/interface/property";
import { env } from "@/lib/env.mjs";

export default async function sitemap() {
  const res = await fetch(
    `${env.NESTJS_BASE_API_URL}/api/property-listing/search`,
  );

  const allPropertyListings = (await res.json()) as Property[];

  const propertyListings = allPropertyListings.map((propertyListing) => ({
    url: `https://mytreehouse.vercel.app/property-listings/details/${propertyListing.property_id}`,
    lastModified: new Date().toISOString(),
  }));

  const routes = ["/property-valuation", "/contact-us"].map((route) => ({
    url: `https://mytreehouse.vercel.app${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...propertyListings, ...routes];
}
