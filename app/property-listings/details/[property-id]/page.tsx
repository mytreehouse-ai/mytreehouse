import { Property } from "@/interface/property";
import { env } from "@/lib/env.mjs";
import Image from "next/image";
import Link from "next/link";

interface pageProps {
  params: {
    "property-id": string;
  };
}

const page: React.FC<pageProps> = async ({ params }) => {
  const response = await fetch(
    `${env.NESTJS_BASE_API_URL}/api/property-listing/search/${params["property-id"]}`,
  );

  if (!response.ok) throw new Error("Property not found");

  const data: Property = await response.json();

  console.log(data);

  return (
    <>
      <div className="flex gap-x-2">
        <Image
          className="rounded-md"
          src={data.images[0]}
          alt="home_page_main_banner"
          width={700}
          height={500}
          sizes="(max-width: 768px) 100vw, 700px"
          priority={true}
        />
        {data.images.length >= 3 && (
          <div className="relative grid grid-cols-2 gap-2">
            {data.images.slice(1, 4).map((image) => (
              <Image
                key={image}
                src={image}
                className="h-[250px] rounded-md"
                alt="home_page_main_banner"
                width={350}
                height={250}
                sizes="(max-width: 768px) 100vw, 350px"
                priority={true}
              />
            ))}
          </div>
        )}
      </div>
      <Link href="/property-listings">Go back to listings</Link>
    </>
  );
};

export default page;
