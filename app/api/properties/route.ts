import { sql } from "@vercel/postgres";
import { z } from "zod";

// TODO: Add description and proper schema error message
const InsertPropertySchema = z.object({
  property_id: z.string().uuid(),
  listing_title: z.string().nonempty(),
  listing_url: z.string().url(),
  property_type_id: z.string().uuid(),
  listing_type_id: z.string().uuid(),
  property_status_id: z.string().uuid(),
  turnover_status_id: z.string().uuid(),
  current_price: z.preprocess(
    (input) => (input ? parseFloat(input as string) : 0),
    z.number(),
  ),
  floor_area: z.number().nullable(),
  lot_area: z.number().nullable(),
  sqm: z.number().nullable(),
  bedroom: z.number().nullable(),
  bathroom: z.number().nullable(),
  parking_lot: z.number().nullable(),
  is_corner_lot: z.boolean().default(false),
  studio_type: z.boolean().default(false),
  building_name: z.string().nonempty().nullable(),
  year_built: z.number().positive().nullable(),
  city_id: z.string().nonempty(),
  address: z.string().nonempty(),
  is_active: z.boolean().default(true),
  is_cbd: z.boolean().default(false),
  amenities: z.array(z.string()).nullable(),
  images: z.array(z.string().url()).nullable(),
  description: z.string().nonempty().nullable(),
  longitude: z.preprocess(
    (input) => (input ? parseFloat(input as string) : 0),
    z.number(),
  ),
  latitude: z.preprocess(
    (input) => (input ? parseFloat(input as string) : 0),
    z.number(),
  ),
  lease_end: z.string().datetime().nullable(),
  created_at: z.string().datetime(),
});

export async function GET(req: Request) {
  return new Response(JSON.stringify({ message: "Ok" }));
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = await InsertPropertySchema.safeParseAsync(body);

    if (parsed.success === false) {
      return new Response(parsed.error.message, {
        status: 400,
        statusText: "Bad request",
      });
    }

    const images = parsed.data.images ?? [];
    const amenities = parsed.data.amenities ?? [];

    const insert = await sql`insert into properties (
       property_id,
       listing_title,
       listing_url,
       property_type_id,
       listing_type_id,
       property_status_id,
       turnover_status_id,
       current_price,
       floor_area,
       lot_area,
       sqm,
       bedroom,
       bathroom,
       parking_lot,
       is_corner_lot,
       studio_type,
       building_name,
       year_built,
       city_id,
       address,
       is_active,
       is_cbd,
       amenities,
       images,
       description,
       longitude,
       latitude,
       lease_end,
       created_at
    ) values (
      ${parsed.data.property_id},
      ${parsed.data.listing_title},
      ${parsed.data.listing_url},
      ${parsed.data.property_type_id},
      ${parsed.data.listing_type_id},
      ${parsed.data.property_status_id},
      ${parsed.data.turnover_status_id},
      ${parsed.data.current_price},
      ${parsed.data.floor_area},
      ${parsed.data.lot_area},
      ${parsed.data.sqm},
      ${parsed.data.bedroom},
      ${parsed.data.bathroom},
      ${parsed.data.parking_lot},
      ${parsed.data.is_corner_lot},
      ${parsed.data.studio_type},
      ${parsed.data.building_name},
      ${parsed.data.year_built},
      ${parsed.data.city_id},
      ${parsed.data.address},
      ${parsed.data.is_active},
      ${parsed.data.is_cbd},
      ${JSON.stringify(amenities)},
      ${JSON.stringify(images)},
      ${parsed.data.description},
      ${parsed.data.longitude},
      ${parsed.data.latitude},
      ${parsed.data.lease_end},
      ${parsed.data.created_at}
    ) on conflict(property_id) do nothing`;

    return new Response(
      JSON.stringify({
        message: "Ok",
        inserted: insert.rowCount,
      }),
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        message: error.message || "Not Ok",
        inserted: 0,
      }),
      {
        status: 500,
        statusText: "Internal Server Error",
      },
    );
  }
}
