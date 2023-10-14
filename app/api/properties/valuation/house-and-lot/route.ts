import { sql } from "@vercel/postgres";

export async function GET() {
  try {
    const textQuery = `select * from properties where property_id = $1`;

    await sql.query("begin");

    const foo = await sql.query(textQuery, [
      "2c3583a5-31f6-4604-8a52-2d8ecb470866",
    ]);

    await sql.query("commit");

    return new Response(JSON.stringify(foo.rows));
  } catch (e) {
    await sql.query("rollback");

    return new Response("Neon Database Internal Server Error", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
