import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
  ListObjectVersionsCommandOutput,
  ListObjectsV2CommandOutput,
} from "@aws-sdk/client-s3";
import { exportTraceState } from "next/dist/trace";

export const s3Client = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY!,
    secretAccessKey: process.env.SECRET_KEY!,
  },
});
export async function getParentList(parent: string) {
  const command = new ListObjectsV2Command({
    Bucket: process.env.S3_BUCKET!,
    Prefix: parent,
  });

  try {
    const data = await s3Client.send(command);
    return data;
  } catch (error) {
    return error;
  }
}
export async function deleteParent(parent: string) {
  const fileList = await getParentList(parent);
  if (!fileList) return false;

  try {
    for (const file of (fileList as ListObjectsV2CommandOutput).Contents!) {
      await deleteFile(file.Key!);
    }
    return true;
  } catch (error) {
    return error;
  }
}
export async function deleteFile(fileName: string) {
  const command = new DeleteObjectCommand({
    Bucket: process.env.S3_BUCKET!,
    Key: fileName,
  });

  try {
    await s3Client.send(command);
    return true;
  } catch (error) {
    return error;
  }
}
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
