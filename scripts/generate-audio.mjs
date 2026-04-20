import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ---- 声を変えるにはここのIDを変える ----
// Aria     : 9BWtsMINqrJLrRacOk9x  明るく親しみやすい（現在）
// Sarah    : EXAVITQu4vr4xnSDxMaL  柔らかく温かい
// Laura    : FGY2WhTYpPnrIDTdsKH5  若々しく元気
// Charlotte: XB0fDUnXU5powFXDhCwa  落ち着いた温かみ
// Matilda  : XrExE9yKIg1WjnnlVkGX  フレンドリーで優しい
const VOICE_ID = "gARvXPexe5VF3cKZBian";
const MODEL_ID = "eleven_turbo_v2_5";
// -----------------------------------------

const VOICE_SETTINGS = {
  stability: 0.5,
  similarity_boost: 0.75,
  style: 0.4,
  use_speaker_boost: true,
};

// 全バブ語（重複なし）
const BABY_WORDS = [
  // 人
  "まー", "まんま", "ぱー", "ぱーぱ", "じいじ", "ばあば", "にぃに", "ねぇね", "ともらち",
  // 動物
  "ワンワン", "ニャンニャン", "ニャ", "チュー", "チューチュー", "モーモー", "ポッポ",
  "コッコさん", "とっと", "コケコッコー", "ンマ", "オンマ", "むいむい",
  "おっとっと", "とと", "ぴよぴよ", "ぴっぴ", "めーめー", "ぴょんぴょん",
  "ブーブー", "ガオー", "ガーガー", "ケロケロ", "ミーンミーン", "パオーン",
  "ちょうちょ", "しーまま", "アイアイ",
  // 行動
  "あんよ", "ポイ", "えんと", "おっちん", "かみかみ", "たっち", "かいかい",
  "かきかき", "ないない", "なむなむ", "ねんね", "ちー", "しー", "ちっち",
  "うんうん", "んち", "きれいきれい", "ごっくん", "もぐもぐ", "だー",
  "だっだー", "おんも", "おんり", "ばぁ", "ちょっきん", "くるくる",
  "シュー", "コンコン", "ちんする", "かえかえ", "ふきふき", "おっき",
  // もの
  "あっぽん", "しょっぽ", "べべ", "おべべ", "くっく", "たった", "たんたん",
  "おたら", "うーびん", "テビレ", "だいじだいじ",
  // 乗り物
  "きしゃぽっぽ", "ぽっぽ", "こうき", "キューキュ", "ピーポー",
  // 体
  "おめめ", "めんめ", "ぱいぱい", "ぽんぽ", "ぽんぽん", "てて", "おてて",
  "おつむ", "かんかん", "はぁは", "おちり",
  // 食べ物
  "ちゅるちゅる", "ちゅーちゅー", "にゅーにゅー", "みーく",
  // その他
  "たーたー", "おぶ", "ぶー", "ぶぶ", "ばっちい", "め！", "ポッケ",
  "おいちい", "うまうま", "おほしさま", "あっちっち", "エベレーター",
  "あんと", "ちれい", "くちゃいくちゃい",
];

const outputDir = path.join(__dirname, "..", "public", "vocab-audio");

async function generateAudio(text) {
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
    method: "POST",
    headers: {
      "xi-api-key": process.env.ELEVENLABS_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      model_id: MODEL_ID,
      voice_settings: VOICE_SETTINGS,
    }),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  return res.arrayBuffer();
}

async function main() {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    console.error("ELEVENLABS_API_KEY が設定されていません");
    process.exit(1);
  }

  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true });
  }

  // 重複除去
  const words = [...new Set(BABY_WORDS)];
  console.log(`生成する単語数: ${words.length}  Voice: ${VOICE_ID}\n`);

  let success = 0;
  let skip = 0;
  let fail = 0;

  for (const word of words) {
    const filename = `${word}.mp3`;
    const filepath = path.join(outputDir, filename);

    if (existsSync(filepath)) {
      skip++;
      continue;
    }

    process.stdout.write(`生成中: ${word}...`);
    try {
      const buffer = await generateAudio(word);
      await writeFile(filepath, Buffer.from(buffer));
      console.log(" ✓");
      success++;
    } catch (err) {
      console.log(` ✗ ${err.message}`);
      fail++;
    }

    await new Promise((r) => setTimeout(r, 200));
  }

  console.log(`\n完了 — 生成: ${success}  スキップ: ${skip}  失敗: ${fail}`);
  console.log(`Voice ID: ${VOICE_ID}`);
}

main();
