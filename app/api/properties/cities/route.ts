import sql from "@/server/db";
import { NextRequest } from "next/server";
import { z } from "zod";

const schema = z
  .object({
    city: z.string().nonempty({ message: "City name must not be empty" }),
  })
  .partial();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const query = schema.safeParse(Object.fromEntries(searchParams));

  if (query.success === false) {
    return new Response(query.error.message, {
      status: 400,
      statusText: "Bad request",
    });
  }

  const cities = await sql`
    select ct.city_id as value, ct.name as label, ct.url_value from cities ct
    ${
      query?.data?.city
        ? sql`where ct.name ilike  ${"%" + query.data.city + "%"}`
        : sql``
    }
    limit 20
  `;

  return new Response(JSON.stringify(cities));
}
