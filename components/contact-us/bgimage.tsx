"use client";

import { imageKitLoader } from "@/lib/utils";
import Image from "next/image";

const BgImage = () => {
  return (
    <Image
      className="absolute brightness-50"
      loader={imageKitLoader}
      src="mytreehouse/contact_banner_by_dalle3.png"
      alt="contact_bg"
      sizes="(max-width: 758px) 100vw, 700px"
      priority={true}
      fill={true}
    />
  );
};

export default BgImage;
