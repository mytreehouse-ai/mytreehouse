import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { z } from "zod";

// TODO: Put valid description and message for this schema
const PropertySlugSchema = z.object({
  slug: z.string().uuid(),
});

export async function GET(
  _req: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const parsed = await PropertySlugSchema.safeParseAsync(params);

    if (parsed.success === false) {
      return new Response(parsed.error.message, {
        status: 400,
        statusText: "Bad request",
      });
    }

    const query = `
        select
          p.property_id,
          p.listing_title,
          p.listing_url,
          pt.name as property_type_name,
          lt.name as listing_type_name,
          ts.name as turnover_status_name,
          p.current_price,
          p.floor_area,
          p.lot_area,
          p.sqm,
          p.bedroom,
          p.bathroom,
          p.parking_lot,
          p.is_corner_lot,
          p.studio_type,
          p.building_name,
          p.year_built,
          ct.name as city_name,
          p.address,
          p.is_active,
          p.is_cbd,
          p.amenities,
          p.images,
          p.description,
          p.longitude,
          p.latitude,
          p.lease_end,
          p.created_at
        from properties p
        inner join property_types pt on pt.property_type_id = p.property_type_id
        inner join listing_types lt on lt.listing_type_id = p.listing_type_id
        inner join turnover_status ts on ts.turnover_status_id = p.turnover_status_id
        inner join cities ct on ct.city_id = p.city_id
        where p.property_id = '${parsed.data.slug}'
  `.replace(/\n\s*\n/g, "\n");

    const property = await sql.query(query);

    return NextResponse.json(property.rows);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Neon database internal server error" },
      { status: 500 },
    );
  }
}
