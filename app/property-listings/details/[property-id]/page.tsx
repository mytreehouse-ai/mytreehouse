import { Property } from "@/interface/property";
import { env } from "@/lib/env.mjs";
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

  return (
    <div className="text-sm">
      {data.address}
      <Link href="/">Go Back</Link>
    </div>
  );
};

export default page;
