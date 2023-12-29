"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import CarouselManual from "@/components/ui/carousel-manual";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface PropertyImagesPlaceholderProps {
  images: string[];
}

const PropertyImagesPlaceholder = ({
  images,
}: PropertyImagesPlaceholderProps) => {
  const [imgShowcase, setImgShowcase] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Add this line

  useEffect(() => {
    if (images && images.length > 0) {
      setIsLoading(true); // Set loading to true when changing image
      setImgShowcase(images[0]);
    }
  }, [images]);

  if (!images || !images.length) {
    return null;
  }

  return (
    <>
      <div className="mt-5 sm:hidden">
        {/* <CarouselManual images={images} /> */}
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent>
            {images?.slice(0, images?.length + 1).map((image) => (
              <React.Fragment key={image}>
                <CarouselItem>
                  <div className="relative h-96 w-full overflow-clip rounded-md">
                    <Image
                      src={image}
                      className="col-span-2 h-[250px] rounded-md object-cover transition ease-in-out hover:scale-110 hover:cursor-pointer"
                      alt="home_page_main_banner"
                      sizes="(max-width: 768px) 100vw, 350px"
                      fill={true}
                      priority={true}
                      onClick={() => setImgShowcase(image)}
                    />
                  </div>
                </CarouselItem>
              </React.Fragment>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="hidden sm:block">
        <div className="flex flex-col gap-x-2 gap-y-2 lg:flex-row">
          <div className="relative h-96 w-full">
            {isLoading && <Skeleton className="h-96 w-full" />}
            <Image
              className="rounded-md object-cover"
              src={imgShowcase}
              alt="home_page_main_banner"
              sizes="(max-width: 768px) 100vw, 700px"
              fill={true}
              priority={true}
              onLoad={() => setIsLoading(false)}
            />
          </div>
          <div
            className={cn(
              images?.length > 2 ? "block" : "hidden",
              "w-full lg:w-1/2 ",
            )}
          >
            {images?.length >= 3 && (
              <div className="relative grid h-64 grid-cols-2 grid-rows-2 gap-2 lg:h-full ">
                {images?.slice(1, 4).map((image) => (
                  <div
                    key={image}
                    className="relative h-full w-full overflow-clip rounded-md"
                  >
                    <Image
                      src={image}
                      className="col-span-2 h-[250px] rounded-md object-cover transition ease-in-out hover:scale-110 hover:cursor-pointer"
                      alt="home_page_main_banner"
                      sizes="(max-width: 768px) 100vw, 350px"
                      fill={true}
                      priority={true}
                      onClick={() => setImgShowcase(image)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyImagesPlaceholder;
