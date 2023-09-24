import sql from "@/server/db";

export async function GET() {
  const property_types = await sql`select pt.property_type_id as value, 
        pt.name as label, url_value from property_types pt`;

  return new Response(JSON.stringify(property_types));
}
