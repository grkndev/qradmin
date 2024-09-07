import { NextResponse } from "next/server";
import clientPromise from "@/lib/db/Client";
import { uploadFile } from "@/lib/s3Client";
export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("image") as File;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  const parent = formData.get("parent") as string;
  const productId = formData.get("productId") as string;

  if (!file) {
    return NextResponse.json(
      { message: "No file found!", success: false, error: "404 File" },
      { status: 400 }
    );
  }
  if (!name || !description || !price || !parent || !productId) {
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
  const product = await db.collection("products").findOne({
    productId,
  });

  if (!product) {
    return NextResponse.json(
      { message: "Product not found!", success: false, error: "404 Product" },
      { status: 400 }
    );
  }
  const hasParent = await db.collection("categories").findOne({
    slug: parent,
  });
  if (!hasParent) {
    return NextResponse.json(
      { message: "Category not found!", success: false, error: "404 Category" },
      { status: 400 }
    );
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  const imageUrl = await uploadFile(buffer, file.name, parent);
  const updatedProduct = await db.collection("products").updateOne(
    {
      productId,
    },
    {
      $set: {
        name,
        description,
        price,
        imageUrl,
      },
    }
  );
  return NextResponse.json({
    message: "Product updated successfully!",
    success: true,
    updatedProduct,
  });
}
