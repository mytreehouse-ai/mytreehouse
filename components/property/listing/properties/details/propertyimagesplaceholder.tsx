"use client";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PropertyImagesPlaceholderProps {
  images: string[];
}

const PropertyImagesPlaceholder = ({
  images,
}: PropertyImagesPlaceholderProps) => {
  return (
    <div className="flex flex-col gap-x-2 gap-y-2 lg:flex-row">
      <div className="relative h-96 w-full">
        <Image
          className="rounded-md object-cover"
          src={images[0]}
          alt="home_page_main_banner"
          sizes="(max-width: 768px) 100vw, 700px"
          fill={true}
          priority={true}
        />
      </div>
      <div
        className={cn(
          images.length > 2 ? "block" : "hidden",
          "w-full lg:w-1/2 ",
        )}
      >
        {images.length >= 3 && (
          <div className="relative grid h-64 grid-cols-2 gap-2 lg:h-full ">
            {images?.slice(1, 4).map((image) => (
              <div
                key={image}
                className="relative h-full w-full overflow-clip rounded-md"
              >
                <Image
                  src={image}
                  className="h-[250px] rounded-md object-cover transition ease-in-out hover:scale-110 hover:cursor-pointer "
                  alt="home_page_main_banner"
                  sizes="(max-width: 768px) 100vw, 350px"
                  fill={true}
                  priority={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyImagesPlaceholder;
