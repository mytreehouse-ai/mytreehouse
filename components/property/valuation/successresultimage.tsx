"use client";
import Image from "next/image";
import { imageKitLoader } from "@/lib/utils";

const SuccessResultImage = () => {
  return (
    <Image
      src="mytreehouse/valuation-success-image.svg"
      loader={imageKitLoader}
      sizes="(max-width: 768px) 100vw, 700px"
      priority={true}
      fill={true}
      alt="Valuation_result_success_image"
    />
  );
};

export default SuccessResultImage;
