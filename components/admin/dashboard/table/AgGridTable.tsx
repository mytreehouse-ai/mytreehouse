"use client";

import React from "react";
import { AgGridReact } from "ag-grid-react";
import { useRef, useState, useMemo } from "react";
import type { AgGridReact as AgGridReactType } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";
import type { GridOptions } from "ag-grid-community";
import type { GetRowIdParams } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

interface IPropertyData {
  id: string;
  address: string;
  amenities: string[];
  bathroom: number;
  bedroom: number;
  building_name: string | null;
  city_name: string;
  created_at: string;
  current_price: string;
  description: string;
  floor_area: number;
  images: string[];
  is_active: boolean;
  is_cbd: boolean;
  is_corner_lot: boolean;
  latitude: string;
  lease_end: string | null;
  listing_title: string;
  listing_type_name: string;
  listing_url: string;
  longitude: string;
  lot_area: number;
  parking_lot: number;
  property_id: string;
  property_type_name: string;
  sqm: number;
  studio_type: boolean;
  turnover_status_name: string;
  year_built: string | null;
}

const dummyData: IPropertyData[] = [
  {
    id: "1",
    address: "Ortigas CBD, Pasig",
    amenities: [],
    bathroom: 1,
    bedroom: 1,
    building_name: null,
    city_name: "Pasig",
    created_at: "2023-10-29T07:12:06.227Z",
    current_price: "26582000.00",
    description: "Description for Property 1",
    floor_area: 69,
    images: [
      "https://static-ph.lamudi.com/static/media/bm9uZS9ub25l/2x2x5x880x450/614913aa7bed19.jpg",
    ],
    is_active: true,
    is_cbd: false,
    is_corner_lot: false,
    latitude: "14.58377100",
    lease_end: null,
    listing_title:
      "Residences at The Galleon | 1BR Condo Unit for Sale in Ortigas CBD, Pasig City | 43K",
    listing_type_name: "For Sale",
    listing_url:
      "https://www.lamudi.com.ph/residences-at-the-galleon-1br-condo-unit-for-sale-169501854719.html",
    longitude: "121.05967500",
    lot_area: 0,
    parking_lot: 0,
    property_id: "da3d02f5-82fa-4eca-a0bf-50d14326489f",
    property_type_name: "Condominium",
    sqm: 69,
    studio_type: false,
    turnover_status_name: "Furnished",
    year_built: null,
  },
  {
    id: "2",
    address: "Ortigas CBD, Pasig",
    amenities: [],
    bathroom: 1,
    bedroom: 1,
    building_name: null,
    city_name: "Pasig",
    created_at: "2023-10-29T07:12:06.227Z",
    current_price: "26582000.00",
    description: "Description for Property 1",
    floor_area: 69,
    images: [
      "https://static-ph.lamudi.com/static/media/bm9uZS9ub25l/2x2x5x880x450/614913aa7bed19.jpg",
    ],
    is_active: true,
    is_cbd: false,
    is_corner_lot: false,
    latitude: "14.58377100",
    lease_end: null,
    listing_title:
      "Maple at Verdant Towers | 1BR Condo Unit for Sale in Ortigas East, Pasig City | 3011",
    listing_type_name: "For Sale",
    listing_url:
      "https://www.lamudi.com.ph/residences-at-the-galleon-1br-condo-unit-for-sale-169501854719.html",
    longitude: "121.05967500",
    lot_area: 0,
    parking_lot: 0,
    property_id: "da3d02f5-82fa-4eca-a0bf-50d14326489f",
    property_type_name: "Condominium",
    sqm: 69,
    studio_type: false,
    turnover_status_name: "Furnished",
    year_built: null,
  },
  {
    id: "3",
    address: "Ortigas CBD, Pasig",
    amenities: [],
    bathroom: 1,
    bedroom: 1,
    building_name: null,
    city_name: "Las Piñas",
    created_at: "2023-10-29T07:12:06.227Z",
    current_price: "10000000.00",
    description: "Description for Property 1",
    floor_area: 69,
    images: [
      "https://static-ph.lamudi.com/static/media/bm9uZS9ub25l/2x2x5x880x450/614913aa7bed19.jpg",
    ],
    is_active: true,
    is_cbd: false,
    is_corner_lot: false,
    latitude: "14.58377100",
    lease_end: null,
    listing_title:
      "Brand New Duplex House and Lot For Sale in BF Resort, Las Piñas",
    listing_type_name: "For Sale",
    listing_url:
      "https://www.lamudi.com.ph/residences-at-the-galleon-1br-condo-unit-for-sale-169501854719.html",
    longitude: "121.05967500",
    lot_area: 0,
    parking_lot: 0,
    property_id: "da3d02f5-82fa-4eca-a0bf-50d14326489f",
    property_type_name: "House and Lot",
    sqm: 69,
    studio_type: false,
    turnover_status_name: "Semi-Furnished",
    year_built: null,
  },
  {
    id: "4",
    address: "Ortigas CBD, Pasig",
    amenities: [],
    bathroom: 1,
    bedroom: 1,
    building_name: null,
    city_name: "Taguig",
    created_at: "2023-10-29T07:12:06.227Z",
    current_price: "14000000.00",
    description: "Description for Property 1",
    floor_area: 69,
    images: [
      "https://static-ph.lamudi.com/static/media/bm9uZS9ub25l/2x2x5x880x450/614913aa7bed19.jpg",
    ],
    is_active: true,
    is_cbd: false,
    is_corner_lot: false,
    latitude: "14.58377100",
    lease_end: null,
    listing_title:
      "Fully Furnished 1-Bedroom Unit For Sale at Bellagio 3, Taguig City",
    listing_type_name: "For Sale",
    listing_url:
      "https://www.lamudi.com.ph/residences-at-the-galleon-1br-condo-unit-for-sale-169501854719.html",
    longitude: "121.05967500",
    lot_area: 0,
    parking_lot: 0,
    property_id: "da3d02f5-82fa-4eca-a0bf-50d14326489f",
    property_type_name: "Condominium",
    sqm: 69,
    studio_type: false,
    turnover_status_name: "Semi-Furnished",
    year_built: null,
  },
  {
    id: "5",
    address: "Ortigas CBD, Pasig",
    amenities: [],
    bathroom: 1,
    bedroom: 1,
    building_name: null,
    city_name: "Dumaguete",
    created_at: "2023-10-29T07:12:06.227Z",
    current_price: "25000.00",
    description: "Description for Property 1",
    floor_area: 69,
    images: [
      "https://static-ph.lamudi.com/static/media/bm9uZS9ub25l/2x2x5x880x450/614913aa7bed19.jpg",
    ],
    is_active: true,
    is_cbd: false,
    is_corner_lot: false,
    latitude: "14.58377100",
    lease_end: null,
    listing_title: "Apartment for Rent in Daro Dumaguete City",
    listing_type_name: "For Rent",
    listing_url:
      "https://www.lamudi.com.ph/residences-at-the-galleon-1br-condo-unit-for-sale-169501854719.html",
    longitude: "121.05967500",
    lot_area: 0,
    parking_lot: 0,
    property_id: "da3d02f5-82fa-4eca-a0bf-50d14326489f",
    property_type_name: "Townhouse",
    sqm: 69,
    studio_type: false,
    turnover_status_name: "Furnished",
    year_built: null,
  },
  {
    id: "6",
    address: "Ortigas CBD, Pasig",
    amenities: [],
    bathroom: 1,
    bedroom: 1,
    building_name: null,
    city_name: "Quezon City",
    created_at: "2023-10-29T07:12:06.227Z",
    current_price: "6325600.00",
    description: "Description for Property 1",
    floor_area: 69,
    images: [
      "https://static-ph.lamudi.com/static/media/bm9uZS9ub25l/2x2x5x880x450/614913aa7bed19.jpg",
    ],
    is_active: true,
    is_cbd: false,
    is_corner_lot: false,
    latitude: "14.58377100",
    lease_end: null,
    listing_title:
      "Vacant Residential Lot for Sale inside Filinvest 2, Quezon City",
    listing_type_name: "For Rent",
    listing_url:
      "https://www.lamudi.com.ph/residences-at-the-galleon-1br-condo-unit-for-sale-169501854719.html",
    longitude: "121.05967500",
    lot_area: 0,
    parking_lot: 0,
    property_id: "da3d02f5-82fa-4eca-a0bf-50d14326489f",
    property_type_name: "Vacant Lot",
    sqm: 69,
    studio_type: false,
    turnover_status_name: "Unknown",
    year_built: null,
  },
  {
    id: "7",
    address: "Ortigas CBD, Pasig",
    amenities: [],
    bathroom: 1,
    bedroom: 1,
    building_name: null,
    city_name: "Bulacan",
    created_at: "2023-10-29T07:12:06.227Z",
    current_price: "280000000.00",
    description: "Description for Property 1",
    floor_area: 69,
    images: [
      "https://static-ph.lamudi.com/static/media/bm9uZS9ub25l/2x2x5x880x450/614913aa7bed19.jpg",
    ],
    is_active: true,
    is_cbd: false,
    is_corner_lot: false,
    latitude: "14.58377100",
    lease_end: null,
    listing_title: "INDUSTRIAL WAREHOUSE FOR SALE IN STA. MARIA BULACAN",
    listing_type_name: "For Sale",
    listing_url:
      "https://www.lamudi.com.ph/residences-at-the-galleon-1br-condo-unit-for-sale-169501854719.html",
    longitude: "121.05967500",
    lot_area: 0,
    parking_lot: 0,
    property_id: "da3d02f5-82fa-4eca-a0bf-50d14326489f",
    property_type_name: "Warehouse",
    sqm: 69,
    studio_type: false,
    turnover_status_name: "Unknown",
    year_built: null,
  },
];

const AgGridTable = () => {
  const [rowData, setRowData] = useState<IPropertyData[]>(dummyData);
  const [columnDefs, setColumnDefs] = useState<ColDef<IPropertyData>[]>([
    {
      field: "listing_title",
      headerName: "Title",
      filter: false,
      sortable: false,
    },
    { field: "property_type_name", headerName: "Property type", filter: true },
    { field: "listing_type_name", headerName: "Listing type", filter: true },
    {
      field: "turnover_status_name",
      headerName: "Turnover status",
      filter: true,
    },
    { field: "city_name", headerName: "City", filter: false },
    {
      field: "current_price",
      headerName: "Current price",
      sortable: true,
      filter: false,
    },
  ]);

  const gridRef = useRef<AgGridReactType<IPropertyData>>(null);

  const getRowId = useMemo(() => {
    return (data: GetRowIdParams<IPropertyData>) => data.data.id;
  }, []);

  const gridOptions: GridOptions<IPropertyData> = {
    rowData: rowData,
    getRowId: getRowId,
    editType: "fullRow",
    pagination: true,
    onRowValueChanged: (event) => {
      console.log(event.data);
    },
  };

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      editable: true,
      sortable: true,
      filter: true,
    };
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="ag-theme-alpine " style={{ width: "100%", height: 500 }}>
        <AgGridReact
          ref={gridRef}
          gridOptions={gridOptions}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
        />
      </div>
    </div>
  );
};

export default AgGridTable;
