import {sql} from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function  GET() {
    try{
        const total_for_sale = `SELECT COUNT(*) FROM properties WHERE listing_type_id = 'cb2fbe3c-b9d0-4cbe-8b62-c28693837d2c'`;

        const result = await sql.query(total_for_sale);

        return NextResponse.json(result.rows);

    }
    catch(error:any){
        return NextResponse.json(
            { status: 500, message: error.message },
            { status: 500, statusText: "Internal server error" },
          );
    }
}