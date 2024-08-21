import { checkUserCredits, consumeUserCredits } from "@/actions/credits";
import { faceswapAI } from "@/actions/faceMeger";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("POST /api/faceApi");
  console.log("body:", body);  
  const { sourFile,targetFileUrl } = body;
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const creditsNeed = 5;
  const creditsEnough = await checkUserCredits(userId, creditsNeed);
  if (!creditsEnough) {
    return new NextResponse("Credits not enough", { status: 400 });
  }

  try {
    const url =  await faceswapAI(sourFile, targetFileUrl);        
    await consumeUserCredits(userId, creditsNeed);
    const resp = JSON.stringify({ url:url });
    return new NextResponse(resp, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    const errorResponse = JSON.stringify({
      error: true,
      msg: "An error occurred while processing your request.",
    });
    return new NextResponse(errorResponse, {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}


