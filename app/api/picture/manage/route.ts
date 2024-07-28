import { findPictureById } from "@/database/pictureRepo";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const dbList = [
    "edhua.png",
    "supperman.jpg"
  ]
  // 循环dbList 拼接https://process.env/+dbList[i]
  for (let i = 0; i < dbList.length; i++) {
    dbList[i] = `https://`+process.env+`/+dbList[i]`
  }
  return new Response(JSON.stringify(dbList), { status: 200 });
}
