import sharp from "sharp";
import { writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public");

// ピンクのグラデーション背景に👶の絵文字アイコンをSVGで作成
function makeSvg(size) {
  const r = Math.floor(size * 0.22);
  const cx = size / 2;
  // baby face
  const headR = size * 0.28;
  const headCy = size * 0.48;
  // ears
  const earR = size * 0.085;
  // eyes
  const eyeR = size * 0.045;
  const eyeY = size * 0.47;
  const eyeOffX = size * 0.1;
  // cheeks
  const cheekR = size * 0.07;
  const cheekY = size * 0.54;
  // mouth
  const mouthY = size * 0.585;
  const mouthW = size * 0.09;
  // hair tufts
  const hairY = size * 0.185;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#fce4ec"/>
      <stop offset="100%" style="stop-color:#f06292"/>
    </linearGradient>
  </defs>
  <!-- background -->
  <rect width="${size}" height="${size}" rx="${r}" fill="url(#bg)"/>
  <!-- ears -->
  <circle cx="${cx - headR * 0.88}" cy="${headCy}" r="${earR}" fill="#fddde6"/>
  <circle cx="${cx + headR * 0.88}" cy="${headCy}" r="${earR}" fill="#fddde6"/>
  <!-- head -->
  <circle cx="${cx}" cy="${headCy}" r="${headR}" fill="#fddde6"/>
  <!-- hair -->
  <ellipse cx="${cx}" cy="${hairY}" rx="${headR * 0.55}" ry="${headR * 0.22}" fill="#c8a27a"/>
  <ellipse cx="${cx - headR * 0.3}" cy="${hairY * 0.96}" rx="${headR * 0.18}" ry="${headR * 0.28}" fill="#c8a27a"/>
  <ellipse cx="${cx + headR * 0.3}" cy="${hairY * 0.96}" rx="${headR * 0.18}" ry="${headR * 0.28}" fill="#c8a27a"/>
  <!-- eyes -->
  <circle cx="${cx - eyeOffX}" cy="${eyeY}" r="${eyeR}" fill="#5d4037"/>
  <circle cx="${cx + eyeOffX}" cy="${eyeY}" r="${eyeR}" fill="#5d4037"/>
  <circle cx="${cx - eyeOffX + eyeR * 0.3}" cy="${eyeY - eyeR * 0.3}" r="${eyeR * 0.3}" fill="white"/>
  <circle cx="${cx + eyeOffX + eyeR * 0.3}" cy="${eyeY - eyeR * 0.3}" r="${eyeR * 0.3}" fill="white"/>
  <!-- cheeks -->
  <circle cx="${cx - cheekR * 1.6}" cy="${cheekY}" r="${cheekR}" fill="#f8bbd0" opacity="0.7"/>
  <circle cx="${cx + cheekR * 1.6}" cy="${cheekY}" r="${cheekR}" fill="#f8bbd0" opacity="0.7"/>
  <!-- mouth -->
  <path d="M ${cx - mouthW} ${mouthY} Q ${cx} ${mouthY + mouthW * 0.9} ${cx + mouthW} ${mouthY}" stroke="#e91e63" stroke-width="${size * 0.022}" fill="none" stroke-linecap="round"/>
</svg>`;
}

async function generate(size, filename) {
  const svg = Buffer.from(makeSvg(size));
  const outputPath = path.join(publicDir, filename);
  await sharp(svg).resize(size, size).png().toFile(outputPath);
  console.log(`✓ ${filename} (${size}x${size})`);
}

await generate(192, "icon-192.png");
await generate(512, "icon-512.png");
await generate(180, "apple-touch-icon.png");
console.log("アイコン生成完了");
