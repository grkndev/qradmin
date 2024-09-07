import { uploadFile } from "@/lib/s3Client";
import { NextResponse } from "next/server";
import Categories from "@/lib/db/models/Categories";
import snowflake from "@/lib/useId";
import clientPromise from "@/lib/db/Client";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  revalidatePath("/api/new/category");
  try {
    const formData = await request.formData();

    const file = formData.get("image") as File;
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;

    if (!file) {
      return NextResponse.json(
        { message: "No file found!", success: false, error: "404 File" },
        { status: 400 }
      );
    }
    if (!name || !slug) {
      return NextResponse.json(
        {
          message: "Name and Slug are required",
          success: false,
          error: "404 File",
        },
        { status: 400 }
      );
    }
    const client = await clientPromise;
    const db = client.db("menu");
    // const hasCategory = await Categories.findOne({ slug });
    const hasCategory = await db.collection("categories").findOne({ slug });
    if (hasCategory) {
      return NextResponse.json(
        {
          message: "Category already exists",
          success: false,
          error: "404 File",
        },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadFile(buffer, file.name);
    // await ConnectDatabase();
    // await Categories.create({
    //   categoryId: snowflake.create().toString(),
    //   name,
    //   slug,
    //   image: `https://cdnqrmenu.s3.eu-west-1.amazonaws.com/${fileName}`,
    //   date: Date.now(),
    // });
    await db.collection("categories").insertOne({
      categoryId: snowflake.create().toString(),
      name,
      slug,
      image: `https://cdnqrmenu.s3.eu-west-1.amazonaws.com/${fileName}`,
      date: Date.now(),
    });

    return NextResponse.json(
      {
        success: true,
        fileName,
        message: "Category created successfully",
        error: null,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, success: false, error },
      { status: 500 }
    );
  }
}
