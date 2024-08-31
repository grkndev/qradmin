import { uploadFile } from "@/lib/s3Client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("image") as File;
    if (!file) {
      return NextResponse.json(
        { message: "No file found!", success: false, error: "404 File" },
        { status: 400 }
      );
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadFile(buffer, file.name);
    return NextResponse.json(
      {
        success: true,
        fileName,
        message: "File successfly uploaded",
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
