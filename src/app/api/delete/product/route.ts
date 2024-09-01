import { NextResponse } from "next/server";

export async function DELETE(req: Request, res: Response) {
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
