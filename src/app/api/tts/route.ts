import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

// Aria — warm, friendly, works well with Japanese
const VOICE_ID = "gARvXPexe5VF3cKZBian";
const MODEL_ID = "eleven_turbo_v2_5"; // multilingual, supports Japanese

export async function GET(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const { success } = rateLimit(`tts:${ip}`, 30, 60_000);
  if (!success) {
    return NextResponse.json({ error: "リクエストが多すぎます" }, { status: 429 });
  }

  const text = req.nextUrl.searchParams.get("text");
  if (!text) {
    return NextResponse.json({ error: "text is required" }, { status: 400 });
  }

  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method: "POST",
    headers: {
      "xi-api-key": process.env.ELEVENLABS_API_KEY ?? "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      model_id: MODEL_ID,
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
        style: 0.4,
        use_speaker_boost: true,
      },
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "音声生成に失敗しました" }, { status: 502 });
  }

  const buffer = await res.arrayBuffer();
  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
