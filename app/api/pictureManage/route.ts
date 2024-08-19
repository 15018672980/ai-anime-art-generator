// import { findPictureById } from "@/database/pictureRepo";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const domain = process.env.R2_PUBLIC_DOMAIN; // 确保环境变量在客户端可用
  if (!domain) {
    return new Response("R2_PUBLIC_DOMAIN is not defined", { status: 500 });
  }
  const dbList = [
    "temp_001.jpg",
    "edhua.png",
    "supperman.jpg"
  ]
  // 使用模板字符串拼接 URL
  for (let i = 0; i < dbList.length; i++) {
    dbList[i] = `https://${domain}/${dbList[i]}`;
  }
  return new Response(JSON.stringify(dbList), { status: 200 });
}
