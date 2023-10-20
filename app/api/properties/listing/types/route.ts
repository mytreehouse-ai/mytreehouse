import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const query = `select lt.listing_type_id as value, 
            name as label, url_value from listing_types lt`;

    const listing_types = await sql.query(query);

    return NextResponse.json(listing_types.rows);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Neon database internal server error" },
      { status: 500 },
    );
  }
}
