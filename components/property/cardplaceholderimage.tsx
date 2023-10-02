"use client";
import Image from "next/image";
import { imageKitLoader } from "@/lib/utils";

const CardPlaceholderImage = () => {
  return (
    <Image
      src="mytreehouse/property-card-placeholder.jpg"
      loader={imageKitLoader}
      sizes="(max-width: 768px) 100vw, 700px"
      priority={true}
      fill={true}
      alt="property_placeholder_image"
    />
  );
};

export default CardPlaceholderImage;
