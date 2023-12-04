export interface Property {
  property_id: string;
  listing_title: string;
  listing_url: string;
  property_type_name: string;
  listing_type_name: string;
  turnover_status_name: string;
  current_price: number;
  floor_area: number | null;
  lot_area: number | null;
  building_size: number | null;
  sqm: number;
  bedroom: number;
  bathroom: number;
  parking_lot: number;
  is_corner_lot: boolean;
  studio_type: boolean;
  building_name: string | null;
  year_built: string | null;
  city_name: string;
  address: string;
  is_active: boolean;
  is_cbd: boolean;
  amenities: string | null;
  images: string[];
  description: string;
  longitude: string;
  latitude: string;
  lease_end: string | null;
  created_at: string;
}

export interface PropertyResponse {
  properties: Property[];
  totalPages: number;
}
