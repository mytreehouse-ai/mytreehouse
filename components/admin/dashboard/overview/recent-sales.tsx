"use client";
import { formatPrice, formatToPhp } from "@/lib/utils";
import React from "react";

const salesData = [
  {
    title: "1BR W/BALCONY @ La VERTI Residences for LEASE",
    propertType: "Condominium",
    listingType: "For Rent",
    price: 20210.0,
    location: "Manila",
  },
  {
    title: "1 Storey House and Lot For Sale in Pusil, Lipa City, Batangas",
    propertType: "House & Lot",
    listingType: "For Sale",
    price: 16000000.0,
    location: "Batangas",
  },
  {
    title:
      "For Sale Talisay City Cebu Brand New Single Detached House and Lot Near SRP",
    propertType: "House & Lot",
    listingType: "For Sale",
    price: 7968000.0,
    location: "Cebu",
  },
  {
    title:
      "For Sale: Pre-Selling 2 BR Loft w/ Lanai in Uptown, BGC - Uptown Modern, Taguig",
    propertType: "Condominium",
    listingType: "For Sale",
    price: 40000000.0,
    location: "Taguig",
  },
];

const RecentSales = () => {
  return (
    <div className="space-y-8">
      {salesData.map((sale, index) => (
        <div className="flex items-center" key={index}>
          <div className="ml-4 space-y-1">
            <h3
              className="line-clamp-1 overflow-hidden overflow-ellipsis text-sm font-medium leading-none"
              title={sale.title}
            >
              {sale.title}
            </h3>
            <p className="text-xs">
              {sale.listingType} in {sale.location}
            </p>
            <p className="flex items-center text-sm text-muted-foreground">
              {sale.propertType}
            </p>
          </div>
          <div className="ml-auto flex items-center font-medium">
            {formatToPhp(formatPrice(sale.price)[0])}
            {formatPrice(sale.price)[1]}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentSales;
