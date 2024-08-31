import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY!,
    secretAccessKey: process.env.SECRET_KEY!,
  },
});

export async function uploadFile(
  file: Buffer,
  fileName: string,
  parent?: string
) {
  const newFileNameRegex = fileName.replace(/[^a-zA-Z0-9_]/g, "_");
  const newFileName = `${
    parent ? `products/${parent}` : "category"
  }/${newFileNameRegex}-${Date.now()}.jpg`;
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET!,
    Key: newFileName,
    Body: file,
    ContentType: "image/jpg",
  });

  try {
    await s3Client.send(command);
    return newFileName;
  } catch (error) {
    return error;
  }
}
