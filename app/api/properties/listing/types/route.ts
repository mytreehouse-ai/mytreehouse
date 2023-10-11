import { sql } from "@vercel/postgres";

export async function GET() {
  const query = `select lt.listing_type_id as value, 
            name as label, url_value from listing_types lt`;

  const listing_types = await sql.query(query);

  return new Response(JSON.stringify(listing_types.rows));
}
