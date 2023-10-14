import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { z } from "zod";

const schema = z
  .object({
    city: z.string().nonempty({ message: "City name must not be empty" }),
  })
  .partial();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const queryParams = schema.safeParse(Object.fromEntries(searchParams));

    if (queryParams.success === false) {
      return new Response(queryParams.error.message, {
        status: 400,
        statusText: "Bad request",
      });
    }

    const query = `
    select ct.city_id as value, ct.name as label, ct.url_value from cities ct
    ${
      queryParams?.data?.city
        ? `where ct.name ilike '%${queryParams.data.city}%'`
        : ``
    } 
    limit 20
  `.replace(/\n\s*\n/g, "\n");

    const cities = await sql.query(query);

    return NextResponse.json(cities.rows);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Neon database internal server error" },
      { status: 500 },
    );
  }
}
