"use client";
import Image from "next/image";
import { imageKitLoader } from "@/lib/utils";

const BgImage = () => {
  return (
    <Image
      className="absolute brightness-50"
      loader={imageKitLoader}
      src="mytreehouse/valuation_banner_by_dalle3.png"
      alt="propery_valuation_bg"
      sizes="(max-width: 768px) 100vw, 700px"
      priority={true}
      fill={true}
    />
  );
};

export default BgImage;
