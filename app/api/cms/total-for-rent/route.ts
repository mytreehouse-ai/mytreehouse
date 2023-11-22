import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const total_for_rent = `SELECT COUNT(*) FROM properties WHERE listing_type_id = '6af21b8c-3022-41fa-86dc-3730d8bf0d4f'`;

    const result = await sql.query(total_for_rent);

    return NextResponse.json(result.rows);
  } catch (error: any) {
    return NextResponse.json(
      { status: 500, message: error.message },
      { status: 500, statusText: "Internal server error" }
    );
  }
}