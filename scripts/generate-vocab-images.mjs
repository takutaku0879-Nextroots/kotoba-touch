import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const VOCABULARY = [
  { baby: "まんま", imagePrompt: "yummy baby food rice bowl" },
  { baby: "わんわん", imagePrompt: "cute puppy dog" },
  { baby: "ママ", imagePrompt: "loving mother" },
  { baby: "パパ", imagePrompt: "loving father" },
  { baby: "ねんね", imagePrompt: "sleeping baby" },
  { baby: "にゃんにゃん", imagePrompt: "cute kitten cat" },
  { baby: "ぶっぶー", imagePrompt: "red toy car" },
  { baby: "くっく", imagePrompt: "baby shoes boots" },
  { baby: "ばーば", imagePrompt: "grandmother grandma" },
  { baby: "じーじ", imagePrompt: "grandfather grandpa" },
  { baby: "ぶーぶー", imagePrompt: "funny cute pig" },
  { baby: "ぽい", imagePrompt: "throwing toy ball" },
  { baby: "じゃー", imagePrompt: "baby bath tub" },
  { baby: "もーもー", imagePrompt: "cute baby cow" },
  { baby: "ちゅるちゅる", imagePrompt: "noodles ramen bowl" },
  { baby: "ぽーん", imagePrompt: "colorful bouncy ball" },
  { baby: "ぴっ", imagePrompt: "light switch button" },
  { baby: "きれいきれい", imagePrompt: "washing hands soap bubbles" },
  { baby: "ごろん", imagePrompt: "baby rolling on floor" },
  { baby: "ぱちぱち", imagePrompt: "baby clapping hands" },
  { baby: "ぺったん", imagePrompt: "colorful sticker" },
  { baby: "しゅー", imagePrompt: "cute baby socks" },
  { baby: "とんとん", imagePrompt: "patting baby back" },
  { baby: "しーしー", imagePrompt: "potty training toilet" },
  { baby: "ぴょんぴょん", imagePrompt: "jumping bunny rabbit" },
];

const outputDir = path.join(__dirname, "..", "public", "vocab-images");

async function main() {
  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true });
  }

  for (const item of VOCABULARY) {
    const filename = `${item.baby}.jpg`;
    const filepath = path.join(outputDir, filename);

    if (existsSync(filepath)) {
      console.log(`✓ スキップ: ${item.baby}`);
      continue;
    }

    const prompt = `cute colorful illustration for toddlers, ${item.imagePrompt}`;
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=512&height=512&nologo=true&seed=42`;

    console.log(`生成中: ${item.baby}...`);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buffer = await res.arrayBuffer();
      await writeFile(filepath, Buffer.from(buffer));
      console.log(`✓ 保存: ${filename}`);
    } catch (err) {
      console.error(`✗ 失敗: ${item.baby}:`, err.message);
    }

    await new Promise((r) => setTimeout(r, 300));
  }

  console.log("\n完了！");
}

main();
