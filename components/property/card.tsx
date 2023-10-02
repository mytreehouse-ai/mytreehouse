import Image from "next/image";
import { Badge } from "../ui/badge";
import { Property } from "@/interface/property";
import Link from "next/link";
import { formatToPhp } from "@/lib/utils";
import CardPlaceholderImage from "./cardplaceholderimage";

interface cardProps {
  property: Property;
}

const Card: React.FC<cardProps> = ({ property }) => {
  return (
    <div className="group relative space-y-2.5">
      <div className="aspect-h-1 aspect-w-1 lg:aspect-none relative w-full overflow-hidden rounded-lg bg-gray-200 shadow-sm group-hover:opacity-75 lg:h-80">
        {property.images.length ? (
          <Image
            src={property.images[0]}
            alt="property_image"
            sizes="66vw(min-width: 1000px) 100vw, 700px"
            priority={true}
            fill={true}
          />
        ) : (
          <CardPlaceholderImage />
        )}
        <div className="absolute inset-0 my-2 ml-2 space-x-2">
          <Badge variant="secondary">{property.listing_type_name}</Badge>
          <Badge variant="secondary">{property.property_type_name}</Badge>
        </div>
      </div>
      <h3 className="text-base font-bold text-gray-700">
        <Link href={`/property-listings/details/${property.property_id}`}>
          <span aria-hidden="true" className="absolute inset-0" />
          {property.listing_title}
        </Link>
      </h3>
      <p className="mt-1 text-sm text-gray-500">{property.address}</p>
      <p className="mt-1 text-base font-bold text-gray-700">
        {formatToPhp(property.current_price)}
      </p>
    </div>
  );
};

export default Card;
