import { cities } from "@/static_data/cities";
import { listingTypes } from "@/static_data/listing-types";
import { propertyTypes } from "@/static_data/property-types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toUrlFriendlyLabel(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "-and-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function createSearchParams(queryParams: Record<string, any>) {
  const isValidJSONObject =
    queryParams !== null &&
    typeof queryParams === "object" &&
    !Array.isArray(queryParams);

  if (isValidJSONObject) {
    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined && value !== "" && value !== null) {
        searchParams.append(key, String(value));
      }
    }

    return searchParams;
  }
}

export function getPropertyTypeUrlValue(propertyType: string) {
  const result = propertyTypes.find((pt) => pt.value === propertyType)
    ?.urlValue;

  if (!result) throw new Error("Property types from static data not found.");

  return result;
}

export function getCityUrlValue(city: string) {
  const result = cities.find((ct) => ct.value === city)?.urlValue;

  if (!result) throw new Error("City from static data not found.");

  return result;
}

export function getListingTypeUrlValue(listingType: string) {
  const result = listingTypes.find((lt) => lt.value === listingType)?.urlValue;

  if (!result) throw new Error("Listing type from static data not found.");

  return result;
}
