import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { z } from "zod";

const PropertySlugSchema = z.object({
  slug: z.string().uuid(),
});

const UpdatePropertySchema = z.object({
property_type_id: z.string().optional(),
listing_type_id: z.string().optional(),
turnover_status_name: z.string().optional()
});

export async function PATCH(
  req: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const parsedParams = await PropertySlugSchema.safeParseAsync(params);

    const body = await req.json();

    const parsed = await UpdatePropertySchema.safeParseAsync(body)

       if (parsed.success === false) {
      return new Response(parsed.error.message, {
        status: 400,
        statusText: "Bad request",
      });
    }
    

    if (parsedParams.success === false ) {
      return new Response("Bad Request", {
        status: 400,
        statusText: "Bad request",
      });

    }

        const updates = Object.entries(parsed.data)
      .map(([key, value]) => `${key} = '${value}'`)
      .join(", ");


    const query = `
    update properties 
    set ${updates}
    where property_id = '${parsedParams.data.slug}'
    returning *
    `

    await sql.query(query);

    return NextResponse.json({ message: "Update successful" });
  } catch (error: any) {
    console.error(error);
  return NextResponse.json(
    { message: "Neon database internal server error" },
    { status: 500 },
  );
  }
}