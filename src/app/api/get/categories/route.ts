import { NextResponse } from "next/server";
import ConnectDatabase from "@/lib/db/Client";
import Categories from "@/lib/db/models/Categories";

export const dynamic = 'force-static'
export async function GET() {
  try {
    await ConnectDatabase();
    const categories = await Categories.find({}, "name slug image categoryId");
    return NextResponse.json(
      { categories, success: true, error: null },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, success: false, error },
      { status: 500 }
    );
  }
}
