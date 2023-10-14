import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        message: error.message,
      }),
      {
        status: 500,
        statusText: "Internal Server Error",
      },
    );
  }
}
