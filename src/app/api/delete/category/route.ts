import Categories from "@/lib/db/models/Categories";
import Products from "@/lib/db/models/Products";
import { deleteFile, deleteParent } from "@/lib/s3Client";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    const { categoryId } = await request.json();
    const category = await Categories.findOne({ categoryId });
    if (!category) {
      return NextResponse.json(
        { message: "Category not found", success: false, error: "404 Error" },
        { status: 404 }
      );
    }
    await deleteFile((category.image as string).split("com/")[1]);
  
    await deleteParent(`products/${category.slug}`);
    await Categories.deleteOne({ categoryId });
    await Products.deleteMany({ parent: category.slug });
    return NextResponse.json(
      { message: "Category deleted", success: true },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "An error occured", success: false, error: "500 Error" },
      { status: 500 }
    );
  }
}
