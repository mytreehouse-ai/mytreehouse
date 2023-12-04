import { Property } from "@/interface/property";

// export default async function sitemap() {
//   const res = await fetch(
//     `https://beta.mytree.house/api/properties/listing/search`,
//   );

//   const allPropertyListings: Property[] = await res.json();

//   const propertyListings = allPropertyListings?.map((propertyListing) => ({
//     url: `https://beta.mytree.house/property-listings/details/${propertyListing.property_id}`,
//     lastModified: new Date().toISOString(),
//   }));

//   const routes = ["/property-valuation", "/contact-us"]?.map((route) => ({
//     url: `https://beta.mytree.house${route}`,
//     lastModified: new Date().toISOString(),
//   }));

//   return [...propertyListings, ...routes];
// }

export default async function sitemap() {
  let allPropertyListings: Property[] = [];

  try {
    const res = await fetch(
      `https://beta.mytree.house/api/properties/listing/search`,
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      throw new Error("Data is not an array");
    }

    allPropertyListings = data;
  } catch (error) {
    console.error("Fetch error: ", error);
    // Handle error as needed, e.g. return a default sitemap or throw the error
  }

  const propertyListings = allPropertyListings.map((propertyListing) => ({
    url: `https://beta.mytree.house/property-listings/details/${propertyListing.property_id}`,
    lastModified: new Date().toISOString(),
  }));

  const routes = ["/property-valuation", "/contact-us"].map((route) => ({
    url: `https://beta.mytree.house${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...propertyListings, ...routes];
}
