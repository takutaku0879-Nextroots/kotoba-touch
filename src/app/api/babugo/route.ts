import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const { success } = rateLimit(ip, 10, 60_000);
  if (!success) {
    return NextResponse.json(
      { error: "リクエストが多すぎます。少し待ってからもう一度お試しください" },
      { status: 429 }
    );
  }

  const { text } = await req.json();

  if (!text || typeof text !== "string" || text.trim().length === 0) {
    return NextResponse.json({ error: "テキストを入力してください" }, { status: 400 });
  }

  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 512,
    system: `入力された日本語を赤ちゃんのバブ語に変換してください。

以下の赤ちゃん言葉辞書を優先的に使うこと：
まんま=ごはん・食べ物、わんわん=犬、ママ=お母さん、パパ=お父さん、ねんね=寝る・睡眠、にゃんにゃん=猫、ぶっぶー=車、くっく=靴、ばーば=おばあちゃん、じーじ=おじいちゃん、ぶーぶー=おなら・豚、ぽい=捨てる・投げる、じゃー=水・お風呂・シャワー、もーもー=牛、ちゅるちゅる=麺類、ぽーん=ボール・丸いもの、ぴっ=スイッチ・リモコン、きれいきれい=手を洗う・清潔、ごろん=横になる・転がる、ぱちぱち=拍手、ぺったん=シール・くっつける、しゅー=靴下・靴を履く、とんとん=叩く・背中をとんとん、しーしー=おしっこ、ぴょんぴょん=跳ぶ・うさぎ

ルール：
- 入力が単語なら単語で返す、文章なら短く1〜2文まで
- 辞書に該当する言葉は必ず赤ちゃん言葉に置き換える
- 辞書にない言葉は「ら行→だ行」「さ行→た行」で変換

imagePromptは入力内容を英語1〜3単語で（例: car→"boo boo car"、ごはん→"yummy rice"）

JSON形式のみ返す：
{"babugo":"...","imagePrompt":"..."}`,
    messages: [
      {
        role: "user",
        content: text,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== "text") {
    return NextResponse.json({ error: "変換に失敗しました" }, { status: 500 });
  }

  // Extract JSON from the response
  const jsonMatch = content.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return NextResponse.json({ error: "変換に失敗しました" }, { status: 500 });
  }

  const result = JSON.parse(jsonMatch[0]);
  return NextResponse.json(result);
}
