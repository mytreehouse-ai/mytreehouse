import { kv } from "@vercel/kv";
import { sql } from "@vercel/postgres";
import { UNKNOWN_CITY } from "@/lib/constant";
import { PropertyListingSearchSchema } from "@/schema/propertyListingSearch.schema";

export async function GET(req: Request) {
  try {
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

    const queryParams = PropertyListingSearchSchema.safeParse(
      Object.fromEntries(searchParams),
    );

    if (queryParams.success === false) {
      return new Response(queryParams.error.message, {
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
            ${
              queryParams.data?.text_search
                ? `
            ,ts_rank(to_tsvector('english', p.listing_title || ' ' || lt.name || ' ' || pt.name || ' ' || coalesce(p.address, '') || ' ' || ct.name || ' ' || coalesce(p.description, '')), to_tsquery('english', '${queryParams.data.text_search.replace(
              /\s+/g,
              " | ",
            )}')) as rank
            `
                : ``
            }
          from properties p
          inner join property_types pt on pt.property_type_id = p.property_type_id
          inner join listing_types lt on lt.listing_type_id = p.listing_type_id
          inner join turnover_status ts on ts.turnover_status_id = p.turnover_status_id
          inner join cities ct on ct.city_id = p.city_id
          where p.images is not null and
          p.images != '[]' and
          p.longitude is not null and
          p.latitude is not null and
          p.property_status_id != '${UNTAGGED_TRANSACTION_ID}' and
          p.city_id != '${UNKNOWN_CITY}' and
          p.current_price is distinct from 'NaN'::numeric
          ${
            queryParams.data?.text_search
              ? `
          and to_tsvector('english', p.listing_title || ' ' || lt.name || ' ' || pt.name || ' ' || coalesce(p.address, '') || ' ' || ct.name || ' ' || coalesce(p.description, '')) @@ to_tsquery('english', '${queryParams.data.text_search.replace(
            /\s+/g,
            " | ",
          )}')
          `
              : ``
          }
          ${
            queryParams.data?.property_type
              ? `
          and p.property_type_id = '${queryParams.data.property_type}'
          `
              : ``
          }
          ${
            queryParams.data?.listing_type
              ? `
          and p.listing_type_id = '${queryParams.data.listing_type}'
          `
              : ``
          }
          ${
            queryParams.data?.turnover_status
              ? `
          and p.turnover_status_id = '${queryParams.data.turnover_status}'
          `
              : ``
          }
          ${
            queryParams.data?.bedroom_count
              ? `
            and p.bedroom = ${queryParams.data.bedroom_count}
            `
              : ``
          }
          ${
            queryParams.data?.bathroom_count
              ? `
          and p.bathroom = ${queryParams.data.bathroom_count}
          `
              : ``
          }
          ${
            queryParams.data?.studio_type
              ? `
          and p.studio_type = ${queryParams.data.studio_type}
          `
              : ``
          }
          ${
            queryParams.data?.is_cbd
              ? `
          and p.is_cbd = ${queryParams.data.is_cbd}
          `
              : ``
          }
          ${
            queryParams.data?.city
              ? `
          and p.city_id = '${queryParams.data.city}'
          `
              : ``
          }
          ${
            queryParams.data?.sqm
              ? `
          and p.sqm = ${queryParams.data.sqm}
          `
              : ``
          }
          ${
            queryParams.data?.sqm_min && queryParams.data?.sqm_max
              ? `
          and p.sqm between ${queryParams.data.sqm_min} and ${queryParams.data.sqm_max}
          `
              : ``
          }
          order by ${
            queryParams.data?.text_search ? "rank" : "p.created_at"
          } desc 
          limit ${
            queryParams.data?.page_limit ? queryParams.data.page_limit : 100
          }
  `.replace(/\n\s*\n/g, "\n");

    const properties = await sql.query(query);

    return new Response(JSON.stringify(properties.rows));
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        message: error.message,
      }),
      {
        status: 500,
        statusText: "Internal Server Error",
      },
    );
  }
}
