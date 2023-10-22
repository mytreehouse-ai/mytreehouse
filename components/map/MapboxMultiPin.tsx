'use client'
import { useQuery } from "@tanstack/react-query";
import "mapbox-gl/dist/mapbox-gl.css";
import { useMemo, useState } from "react";
import Map, {
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
} from "react-map-gl";
import { Property } from "@/interface/property";
import { formatToPhp } from "@/lib/utils";


interface MapboxMultiPinProps {
    propertyListings: Property[];
}

const MapboxMultiPin = ({propertyListings}:MapboxMultiPinProps) => {

  // TODO: IMRPOVE IMPROVE IMPROVE!
//   const { isLoading, data: propertyListings } = useGetPropertyListingsHook({
//     city: router.query.searchParams?.[0] || "",
//     listing_type: router.query.searchParams?.[1] || "",
//     property_type: router.query.searchParams?.[2] || "",
//     page_limit: 100,
//   });

  const [viewState, setViewState] = useState({
    longitude: Number(propertyListings?.[0]?.longitude || "121.02354"),
    latitude: Number(propertyListings?.[0]?.latitude || "14.55472"),
    zoom: 8,
  });

  const [showPopup, setShowPopup] = useState(false);

  const [popUpLocation, setShowPopupLocation] = useState<{
    property_id: string;
    longitude: number;
    latitude: number;
  }>({
    property_id: "",
    longitude: 0,
    latitude: 0,
  });

  const { data: clickedProperty } = useQuery({
    queryKey: ["property_id", popUpLocation.property_id],
    queryFn: () => console.log('test'),
    enabled: popUpLocation.property_id !== "",
  });

  const pins = useMemo(
    () =>
      propertyListings?.map((property) => {
        return (
          <Marker
            key={property.property_id}
            longitude={Number(property.longitude)}
            latitude={Number(property.latitude)}
            anchor="center"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setShowPopupLocation({
                property_id: property.property_id,
                latitude: Number(property.latitude),
                longitude: Number(property.longitude),
              });
              setShowPopup(!showPopup);
            }}
          >
            <div className="custom-map-pin">
              <div className="absolute left-2 top-2 h-3 w-3 rounded-full bg-emerald-300"></div>
            </div>
          </Marker>
        );
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [propertyListings],
  );

//   if (isLoading) {
//     return null;
//   }

  return (
    <Map
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        borderRadius: "0.5rem",
      }}
      {...viewState}
      onMove={(nextViewState) => setViewState(nextViewState.viewState)}
      mapboxAccessToken={"pk.eyJ1IjoiY2FzdWxpdCIsImEiOiJjbGhpaG95b24wN3piM2RwYmNsejBodGIwIn0.s-EaLYosGWCP_yuWppR_wQ"}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      attributionControl={false}
    >
      <>
        <NavigationControl position="top-right" />
        <ScaleControl position="bottom-right" />
        {pins}
      </>


      {propertyListings?.map((property) => {
        if (!property.longitude && !property.latitude) {
          return null;
        }

        return (
          <Popup
            key={property.property_id}
            closeButton={false}
            closeOnClick={false}
            longitude={Number(property.longitude)}
            latitude={Number(property.latitude)}
          >
            <p className="pointer-events-none font-medium text-emerald-700">
              {/* {formatPrice(parseFloat(property.current_price))} */}
              {formatToPhp(property.current_price)}
            </p>
          </Popup>
        );
      })}
    </Map>
  );
};

export default MapboxMultiPin;
