import { Property } from "@/interface/property";

// Function to generate sitemap data for property listings and static routes
// Only runs in production to avoid unnecessary load during development
export default async function sitemap() {
  let allPropertyListings: Property[] = [];

  try {
    // Fetch the list of properties from the API
    const res = await fetch(
      `https://beta.mytree.house/api/properties/listing/search`,
    );

    // Throw an error if the response is not OK
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    // Parse the JSON response
    const data = await res.json();

    // Validate that the data is an array
    if (!Array.isArray(data)) {
      throw new Error("Data is not an array");
    }

    // Assign the data to allPropertyListings
    allPropertyListings = data;
  } catch (error) {
    // Log any fetch errors
    console.error("Fetch error: ", error);
  }

  // Map property listings to sitemap format
  const propertyListings = allPropertyListings.map((propertyListing) => ({
    url: `https://beta.mytree.house/property-listings/details/${propertyListing.property_id}`,
    lastModified: new Date().toISOString(),
  }));

  // Define static routes for the sitemap
  const routes = ["/property-valuation", "/contact-us"].map((route) => ({
    url: `https://beta.mytree.house${route}`,
    lastModified: new Date().toISOString(),
  }));

  // Combine property listings and static routes into a single array
  return [...propertyListings, ...routes];
}
