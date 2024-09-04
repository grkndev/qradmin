import { NextResponse, NextRequest } from "next/server";
import clientPromise from "@/lib/db/Client";
export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("menu");
    const products = await db.collection("products").find({}).toArray();
    return NextResponse.json({ data: products }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { success: false, message: e.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { parent } = body;
  try {
    const client = await clientPromise;
    const db = client.db("menu");
    const products = await db.collection("products").find({ parent }).toArray();

    return NextResponse.json({ data: products }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { success: false, message: e.message },
      { status: 500 }
    );
  }
}
