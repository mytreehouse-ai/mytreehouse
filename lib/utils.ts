import { cities } from "@/static_data/cities";
import { listingTypes } from "@/static_data/listing-types";
import { propertyTypes } from "@/static_data/property-types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatToPhp = (number?: number) => {
  if (!number) number = 0;

  const formattedNumber = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(number);

  return formattedNumber;
};

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

interface ImageKitLoaderParams {
  src: string;
  width: number;
  quality?: number;
}

export const imageKitLoader = ({
  src,
  width,
  quality,
}: ImageKitLoaderParams): string => {
  if (src[0] === "/") src = src.slice(1);

  const params = [`w-${width}`];

  if (quality) {
    params.push(`q-${quality}`);
  }

  const paramsString = params.join(",");
  let urlEndpoint = "https://ik.imagekit.io/hqvfmgyp2";

  if (urlEndpoint[urlEndpoint.length - 1] === "/")
    urlEndpoint = urlEndpoint.substring(0, urlEndpoint.length - 1);

  return `${urlEndpoint}/${src}?tr=${paramsString}`;
};
