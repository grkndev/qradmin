import { NextResponse } from "next/server";
import clientPromise from "@/lib/db/Client";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("menu");
    const categories = await db.collection("categories").find({}).toArray();
    return NextResponse.json(
      { categories, success: true, error: null },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
