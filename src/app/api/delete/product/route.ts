import { NextResponse } from "next/server";
import clientPromise from "@/lib/db/Client";
import { revalidatePath } from "next/cache";

export async function DELETE(req: Request, res: Response) {
  revalidatePath("/api/delete/products");
  try {
    const { productId } = await req.json();
    if (!productId) {
      return NextResponse.json({ success: false, message: "Ürün bulunamadı" });
    }
    return NextResponse.json({
      success: true,
      message: "Ürün başarıyla silindi",
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Bir hata oluştu" });
  }
}
