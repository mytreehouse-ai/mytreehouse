"use client";
import { CardTitle, CardDescription, Card } from "@/components/ui/card";
import { imageKitLoader } from "@/lib/utils";
import Image from "next/image";

const V0Card = () => {
  return (
    <Card className="overflow-hidden rounded-lg shadow-sm">
      <div className="relative">
        <Image
          loader={imageKitLoader}
          src="mytreehouse/property-card-placeholder.jpg"
          alt="property-card-placeholder"
          sizes="(max-width: 768px) 100vw, 700px"
          priority={true}
          width={400}
          height={200}
        />
        <span className="absolute left-0 top-0 rounded-br bg-blue-500 px-2 py-1 text-xs font-semibold uppercase text-white">
          Warehouse
        </span>
        <span className="absolute left-0 top-0 ml-24 rounded-b bg-green-500 px-2 py-1 text-xs font-semibold uppercase text-white">
          For Sale
        </span>
      </div>
      <div className="p-4">
        <CardTitle className="text-xl font-semibold">Luxury Villa</CardTitle>
        <CardDescription className="my-2 text-base font-bold text-gray-800 dark:text-gray-400">
          $1,500,000
        </CardDescription>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          1234 Main St, Anytown, USA
        </p>
      </div>
    </Card>
  );
};

export default V0Card;
