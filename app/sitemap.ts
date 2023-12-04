import { Property } from "@/interface/property";

export default async function sitemap() {
  const res = await fetch(
    `https://beta.mytree.house/api/properties/listing/search`,
  );

  const allPropertyListings: Property[] = await res.json();

  const propertyListings = allPropertyListings?.map((propertyListing) => ({
    url: `https://beta.mytree.house/property-listings/details/${propertyListing.property_id}`,
    lastModified: new Date().toISOString(),
  }));

  const routes = ["/property-valuation", "/contact-us"]?.map((route) => ({
    url: `https://beta.mytree.house${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...propertyListings, ...routes];
}
