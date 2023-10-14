"use client";
import Image from "next/image";
import { imageKitLoader } from "@/lib/utils";

const HeroImageBanner = () => {
  return (
    <Image
      className="brightness-75 lg:rounded-2xl"
      loader={imageKitLoader}
      src="mytreehouse/image_10_by_dalle3.png"
      alt="home_page_main_banner"
      sizes="(max-width: 768px) 100vw, 700px"
      priority={true}
      fill={true}
    />
  );
};

export default HeroImageBanner;
