import { sql } from "@vercel/postgres";

export async function GET() {
  const query = `select pt.property_type_id as value, 
        pt.name as label, url_value from property_types pt`;

  const property_types = await sql.query(query);

  return new Response(JSON.stringify(property_types.rows));
}
