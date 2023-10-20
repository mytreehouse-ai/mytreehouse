"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface PropertyImagesPlaceholderProps {
  images: string[];
}

const PropertyImagesPlaceholder = ({
  images,
}: PropertyImagesPlaceholderProps) => {
const [imgShowcase, setImgShowcase] = useState("");

useEffect(()=>{
  setImgShowcase(images[0])
},[images])

  return (
    <div className="flex flex-col gap-x-2 gap-y-2 lg:flex-row">
      <div className="relative h-96 w-full">
        <Image
          className="rounded-md object-cover"
          src={imgShowcase}
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
          <div className="relative grid h-64 grid-cols-2 grid-rows-2 gap-2 lg:h-full ">
            {images?.slice(1, 4).map((image) => (
              <div
                key={image}
                className="relative h-full w-full overflow-clip rounded-md"
              >
                <Image
                  src={image}
                  className="h-[250px] rounded-md object-cover transition ease-in-out hover:scale-110 hover:cursor-pointer col-span-2"
                  alt="home_page_main_banner"
                  sizes="(max-width: 768px) 100vw, 350px"
                  fill={true}
                  priority={true}
                  onClick={()=>setImgShowcase(image)}
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