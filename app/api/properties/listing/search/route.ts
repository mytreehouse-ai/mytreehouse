import { kv } from "@vercel/kv";
import { UNKNOWN_CITY } from "@/lib/constant";
import { PropertyListingSearchSchema } from "@/schema/propertyListingSearch.schema";
import { sql } from "@vercel/postgres";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const UNTAGGED_TRANSACTION_ID: string | null = await kv.get(
    "UNTAGGED_TRANSACTION_ID",
  );

  if (!UNTAGGED_TRANSACTION_ID) {
    return new Response(
      JSON.stringify({
        message: "Config UNTAGGED_TRANSACTION_ID is empty in redis kv",
      }),
      {
        status: 400,
        statusText: "Bad request",
      },
    );
  }

  const query = PropertyListingSearchSchema.safeParse(
    Object.fromEntries(searchParams),
  );

  if (query.success === false) {
    return new Response(query.error.message, {
      status: 400,
      statusText: "Bad request",
    });
  }

  const properties = await sql`
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
            ${
              query.data?.text_search
                ? void sql`
            ,ts_rank(to_tsvector('english', p.listing_title || ' ' || coalesce(p.description, '')), plainto_tsquery(${query.data.text_search})) as rank
            `
                : void sql``
            }
          from properties p
          inner join property_types pt on pt.property_type_id = p.property_type_id
          inner join listing_types lt on lt.listing_type_id = p.listing_type_id
          inner join turnover_status ts on ts.turnover_status_id = p.turnover_status_id
          inner join cities ct on ct.city_id = p.city_id
          where p.images is not null and
          p.longitude is not null and
          p.latitude is not null and
          p.property_status_id != ${UNTAGGED_TRANSACTION_ID} and
          p.city_id != ${UNKNOWN_CITY} and
          p.current_price is distinct from 'NaN'::numeric
          ${
            query.data?.text_search
              ? void sql`
          and to_tsvector('english', p.listing_title || ' ' || coalesce(p.description, '')) @@ plainto_tsquery(${query.data.text_search})
          `
              : void sql``
          }
          ${
            query.data?.property_type
              ? void sql`
          and p.property_type_id = ${query.data.property_type}
          `
              : void sql``
          }
          ${
            query.data?.listing_type
              ? void sql`
          and p.listing_type_id = ${query.data.listing_type}
          `
              : void sql``
          }
          ${
            query.data?.turnover_status
              ? void sql`
          and p.turnover_status_id = ${query.data.turnover_status}
          `
              : void sql``
          }
          ${
            query.data?.bedroom_count
              ? void sql`
            and p.bedroom = ${query.data.bedroom_count}
            `
              : void sql``
          }
          ${
            query.data?.bathroom_count
              ? void sql`
          and p.bathroom = ${query.data.bathroom_count}
          `
              : void sql``
          }
          ${
            query.data?.studio_type
              ? void sql`
          and p.studio_type = ${query.data.studio_type}
          `
              : void sql``
          }
          ${
            query.data?.is_cbd
              ? void sql`
          and p.is_cbd = ${query.data.is_cbd}
          `
              : void sql``
          }
          ${
            query.data?.city
              ? void sql`
          and p.city_id = ${query.data.city}
          `
              : void sql``
          }
          ${
            query.data?.sqm
              ? void sql`
          and p.sqm = ${query.data.sqm}
          `
              : void sql``
          }
          ${
            query.data?.sqm_min && query.data?.sqm_max
              ? void sql`
          and p.sqm between ${query.data.sqm_min} and ${query.data.sqm_max}
          `
              : void sql``
          }
          order by p.created_at desc limit ${
            query.data?.page_limit ? query.data.page_limit : 100
          }
  `;

  return new Response(JSON.stringify(properties));
}
