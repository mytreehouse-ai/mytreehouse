import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const query = `select pt.property_type_id as value, 
        pt.name as label, url_value from property_types pt`;

    const property_types = await sql.query(query);

    return NextResponse.json(property_types.rows);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Neon database internal server error" },
      { status: 500 },
    );
  }
}
