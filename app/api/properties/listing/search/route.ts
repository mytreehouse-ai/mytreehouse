import { NextResponse } from "next/server";
import { QueryResult, sql } from "@vercel/postgres";
import { UNKNOWN_CITY } from "@/lib/constant";
import { PropertyListingSearchSchema } from "@/schema/propertyListingSearch.schema";
import { fetchVercelEdgeConfig } from "@/lib/edge-config";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const { UNTAGGED_TRANSACTION_ID } = await fetchVercelEdgeConfig();

    const queryParams = PropertyListingSearchSchema.safeParse(
      Object.fromEntries(searchParams),
    );

    if (queryParams.success === false) {
      return new Response(queryParams.error.message, {
        status: 400,
        statusText: "Bad request",
      });
    }

    const pageNumber = queryParams.data.page_number || 1;
    const pageLimit = queryParams.data.page_limit || 12;
    const offset = (pageNumber - 1) * pageLimit;

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
            p.building_size,
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
            p.created_at,
            COUNT(*) OVER() as total_records
            ${
              queryParams.data?.text_search
                ? `
            ,ts_rank(tsv, plainto_tsquery('english', '${queryParams.data.text_search}')) as rank
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
          and tsv @@ plainto_tsquery('english', '${queryParams.data.text_search}')
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
          limit ${pageLimit}
          offset ${offset}
  `.replace(/\n\s*\n/g, "\n");

    const properties = await sql.query(query);

    const totalRecords = Number(properties.rows[0]?.total_records) || 0;
    const totalPages = Math.ceil(totalRecords / pageLimit);

    return NextResponse.json({
      properties: properties.rows,
      pageNumber: pageNumber,
      pageLimit: pageLimit,
      totalPages: totalPages,
      totalRecords: totalRecords,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Neon database internal server error" },
      { status: 500 },
    );
  }
}
