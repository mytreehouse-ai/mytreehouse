import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const result = await sql`SELECT COUNT(*) FROM properties WHERE property_status_id = '3f49fd58-4060-4cda-bd95-67f612effa9c'`;
    return NextResponse.json(result.rows);
  } catch (error: any) {
    return NextResponse.json(
      { status: 500, message: error.message },
      { status: 500, statusText: "Internal server error" }
    );
  }
}

//SOLD "3f49fd58-4060-4cda-bd95-67f612effa9c"