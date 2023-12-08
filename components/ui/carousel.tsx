import React, { FC, useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface CarouselProps {
  images: string[];
}

const Carousel: FC<CarouselProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((current) => (current === images.length - 1 ? 0 : current + 1));
  }, [images]);

  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(timer);
  }, [nextSlide]);

  if (!Array.isArray(images) || images.length <= 0) {
    return null;
  }

  return (
    <section className="relative flex items-center justify-center">
      <button
        className="absolute left-0 z-10 rounded px-4 py-2 font-bold text-white"
        onClick={prevSlide}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        className="absolute right-0 z-10 rounded px-4 py-2 font-bold text-white"
        onClick={nextSlide}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
      {images.map((image, index) => (
        <div
          className={
            index === current
              ? "h-[350px] opacity-100 transition-transform duration-500"
              : "h-[350px] opacity-0 transition-transform duration-500 ease-in-out"
          }
          key={index}
        >
          {index === current && (
            <Image
              src={image}
              alt="carousel"
              className="h-full w-full rounded-md object-cover"
              sizes="(max-width: 768px) 100vw, 350px"
              fill={true}
              priority={true}
            />
          )}
        </div>
      ))}
      <div className="absolute bottom-0 mb-5 flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === current ? "bg-white" : "bg-gray-500"
            }`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;
