import { generateNanoIdFilename } from "@/lib/utils";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Buffer } from "buffer";
import axios from "axios";

export async function downloadAndUploadImage(imageUrl: string) {
  const s3 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: `${process.env.R2_ACCESS_KEY_ID}`,
      secretAccessKey: `${process.env.R2_SECRET_ACCESS_KEY}`,
    },
    // logger: console,
  });

  try {
    const response = await axios({
      method: "GET",
      url: imageUrl,
      responseType: "arraybuffer",
    });
    console.log("download success");

    const s3Key = generateNanoIdFilename("png");
    console.log("s3Key:", s3Key);

    const uploadParams = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: s3Key,
      Body: response.data,
    });

    const ret = await s3.send(uploadParams);
    console.log("upload succeeded:", ret);
    return getPublicObjectUrl(s3Key);
  } catch (e) {
    console.log("upload failed:", e);
    throw e;
  }
}

export function getPublicObjectUrl(s3Key: string) {
  return `https://${process.env.R2_PUBLIC_DOMAIN}/${s3Key}`;
}

export async function uploadBase64ImageToS3(base64String: string): Promise<string> {
  const s3 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: `${process.env.R2_ACCESS_KEY_ID}`,
      secretAccessKey: `${process.env.R2_SECRET_ACCESS_KEY}`,
    },
    // logger: console,
  });

  try {
    // 将Base64字符串转换为Buffer
    const buffer = Buffer.from(base64String.split(",")[1], "base64");

    // 生成S3对象键
    const s3Key = generateNanoIdFilename("png");
    console.log("s3Key:", s3Key);

    // 创建PutObjectCommand对象
    const uploadParams = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: s3Key,
      Body: buffer,
      ContentType: "image/png", // 假设图片是PNG格式，根据实际情况调整
    });

    // 发送命令到S3
    const ret = await s3.send(uploadParams);
    console.log("upload succeeded:", ret);
    return getPublicObjectUrl(s3Key);
  } catch (e) {
    console.log("upload failed:", e);
    throw e;
  }
}
