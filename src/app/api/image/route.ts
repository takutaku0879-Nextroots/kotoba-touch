import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const prompt = req.nextUrl.searchParams.get("prompt");
  if (!prompt) {
    return NextResponse.json({ error: "prompt is required" }, { status: 400 });
  }

  const fullPrompt = `cute colorful illustration for toddlers, ${prompt}`;
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?width=512&height=512&nologo=true&seed=42`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) {
    return NextResponse.json({ error: "image fetch failed", status: res.status, url }, { status: 502 });
  }

  const buffer = await res.arrayBuffer();
  return new NextResponse(buffer, {
    headers: {
      "Content-Type": res.headers.get("Content-Type") || "image/jpeg",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
