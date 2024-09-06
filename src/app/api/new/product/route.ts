import { uploadFile } from "@/lib/s3Client";
import { NextResponse } from "next/server";
import snowflake from "@/lib/useId";
import clientPromise from "@/lib/db/Client";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  revalidatePath("/api/new/product");
  try {
    const formData = await request.formData();

    const file = formData.get("image") as File;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const parent = formData.get("parent") as string;

    if (!file) {
      return NextResponse.json(
        { message: "No file found!", success: false, error: "404 File" },
        { status: 400 }
      );
    }
    if (!name || !description || !price || !parent) {
      return NextResponse.json(
        {
          message: "Please fill all the fields",

          success: false,
          error: "404 File",
        },
        { status: 400 }
      );
    }
    const client = await clientPromise;
    const db = client.db("menu");
    const hasParent = await db
      .collection("categories")
      .findOne({ slug: parent });
    if (!hasParent) {
      return NextResponse.json(
        { message: "Category not found", success: false, error: "404 File" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadFile(buffer, file.name, parent);
    // console.log(name, description, fileName);
    // await Products.create({
    //   productId: snowflake.create().toString(),
    //   name,
    //   description,
    //   parent,
    //   categoryName: hasParent.name,
    //   price,
    //   image: `https://cdnqrmenu.s3.eu-west-1.amazonaws.com/${fileName}`,
    //   createdAt: Date.now(),
    // });
    await db.collection("products").insertOne({
      productId: snowflake.create().toString(),
      name,
      description,
      parent,
      categoryName: hasParent.name,
      price,
      image: `https://cdnqrmenu.s3.eu-west-1.amazonaws.com/${fileName}`,
      createdAt: Date.now,
    });

    return NextResponse.json(
      {
        success: true,
        fileName,
        message: "Produt created successfully",
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
