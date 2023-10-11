import { sql } from "@vercel/postgres";

export async function GET(req: Request) {
  return new Response(JSON.stringify({ message: "Ok" }));
}

export async function POST(req: Request) {
  try {
    await sql`insert into properties (
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
    ) values () on conflict(property_id) do nothing`;

    return new Response(JSON.stringify({ message: "Ok" }));
  } catch (error: any) {
    return new Response(
      JSON.stringify({ message: error.message || "Not Ok" }),
      {
        status: 500,
        statusText: "Internal Server Error",
      },
    );
  }
}
