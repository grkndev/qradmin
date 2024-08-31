import ConnectDatabase from "@/lib/db/Client";
import Products from "@/lib/db/models/Products";
import { NextResponse, NextRequest } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next";

export async function GET(request: NextRequest) {
  try {
    await ConnectDatabase();
    const products = await Products.find(
      {},
      "name price image parent categoryName description"
    );
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
    await ConnectDatabase();
    const products = parent
      ? await Products.find({ parent: parent }, "name price image categoryName parent")
      : await Products.find({}, "name price image parent categoryName description");
    console.log(products);
    return NextResponse.json({ data: products }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { success: false, message: e.message },
      { status: 500 }
    );
  }
}
