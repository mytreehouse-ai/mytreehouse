import { UNKNOWN_CITY } from "@/lib/constant";
import { PropertyListingSearchSchema } from "@/schema/propertyListingSearch.schema";
import sql from "@/server/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

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
                ? sql`
            ,ts_rank(to_tsvector('english', p.listing_title || ' ' || coalesce(p.description, '')), plainto_tsquery(${query.data.text_search})) as rank
            `
                : sql``
            }
          from properties p
          inner join property_types pt on pt.property_type_id = p.property_type_id
          inner join listing_types lt on lt.listing_type_id = p.listing_type_id
          inner join turnover_status ts on ts.turnover_status_id = p.turnover_status_id
          inner join cities ct on ct.city_id = p.city_id
          where p.images is not null and
          p.longitude is not null and
          p.latitude is not null and
          p.city_id != ${UNKNOWN_CITY} and
          p.current_price is distinct from 'NaN'::numeric
          ${
            query.data?.text_search
              ? sql`
          and to_tsvector('english', p.listing_title || ' ' || coalesce(p.description, '')) @@ plainto_tsquery(${query.data.text_search})
          `
              : sql``
          }
          ${
            query.data?.property_type
              ? sql`
          and p.property_type_id = ${query.data.property_type}
          `
              : sql``
          }
          ${
            query.data?.listing_type
              ? sql`
          and p.listing_type_id = ${query.data.listing_type}
          `
              : sql``
          }
          ${
            query.data?.turnover_status
              ? sql`
          and p.turnover_status_id = ${query.data.turnover_status}
          `
              : sql``
          }
          ${
            query.data?.bedroom_count
              ? sql`
            and p.bedroom = ${query.data.bedroom_count}
            `
              : sql``
          }
          ${
            query.data?.bathroom_count
              ? sql`
          and p.bathroom = ${query.data.bathroom_count}
          `
              : sql``
          }
          ${
            query.data?.studio_type
              ? sql`
          and p.studio_type = ${query.data.studio_type}
          `
              : sql``
          }
          ${
            query.data?.is_cbd
              ? sql`
          and p.is_cbd = ${query.data.is_cbd}
          `
              : sql``
          }
          ${
            query.data?.city
              ? sql`
          and p.city_id = ${query.data.city}
          `
              : sql``
          }
          ${
            query.data?.sqm
              ? sql`
          and p.sqm = ${query.data.sqm}
          `
              : sql``
          }
          ${
            query.data?.sqm_min && query.data?.sqm_max
              ? sql`
          and p.sqm between ${query.data.sqm_min} and ${query.data.sqm_max}
          `
              : sql``
          }
          order by p.created_at desc limit ${
            query.data?.page_limit ? query.data.page_limit : 100
          }
  `;

  return new Response(JSON.stringify(properties));
}
