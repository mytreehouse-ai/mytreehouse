import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const selectPropertiesTextQuery = `
        select 
          p.property_id
          pt.name as property_type_name,
          lt.name as listing_type_name,
          ts.name as turnover_status_name,
          ct.name as city_name
        from properties p
        inner join property_types pt on pt.property_type_id = p.property_type_id
        inner join listing_types lt on lt.listing_type_id = p.listing_type_id
        inner join turnover_status ts on ts.turnover_status_id = p.turnover_status_id
        inner join cities ct on ct.city_id = p.city_id
        where p.ts_query_improve = false
        limit 10
      `;

    const properties = await sql.query(selectPropertiesTextQuery);

    const propertyUpdateTsQueriesPropertiesTextQuery = `
        update properties
        set
          ts_query_listing_type_name = $1,
          ts_query_property_type_name = $2,
          ts_query_city_name = $3,
          ts_query_improve = true,
          ts_query_data_updated_at = current_timestamp
        where property_id = $4
      `;

    for (const property of properties.rows) {
      await sql.query(propertyUpdateTsQueriesPropertiesTextQuery, [
        property.listing_type_name,
        property.property_type_name,
        property.city_name,
        property.property_id,
      ]);

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    return NextResponse.json({ ok: true });
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
