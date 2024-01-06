import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const query = `select pt.turnover_status_id as value, 
        pt.name as label, url_value from turnover_status pt`;

    const turnover_status = await sql.query(query);

    return NextResponse.json(turnover_status.rows);
  } catch (error: any) {
    return NextResponse.json(
      { message: "Neon database internal server error" },
      { status: 500 },
    );
  }
}
