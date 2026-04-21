import sharp from "sharp";
import { writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public");

// ピンクのグラデーション背景に👶の絵文字アイコンをSVGで作成
function makeSvg(size) {
  const s = size;
  const cx = s / 2;
  const cy = s / 2;
  const r = s * 0.22; // corner radius

  // bubble: big rounded rect centered slightly above
  const bw = s * 0.62, bh = s * 0.46, br = s * 0.1;
  const bx = cx - bw / 2, by = s * 0.17;
  // bubble tail
  const tx = cx - s * 0.04, ty = by + bh;
  const tx2 = cx - s * 0.18, ty2 = by + bh + s * 0.13;
  const tx3 = cx + s * 0.1, ty3 = by + bh;

  // face center inside bubble
  const fcx = cx, fcy = by + bh * 0.5;
  const faceR = bh * 0.34;
  const eyeR = faceR * 0.16;
  const eyeOffX = faceR * 0.38;
  const eyeY = fcy - faceR * 0.05;
  const cheekR = faceR * 0.22;
  const cheekY = fcy + faceR * 0.22;
  const mouthW = faceR * 0.3;
  const mouthY = fcy + faceR * 0.38;

  // sparkles
  const sp = (x, y, r2) =>
    `<circle cx="${x}" cy="${y}" r="${r2}" fill="white" opacity="0.9"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 ${s} ${s}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f9a8d4"/>
      <stop offset="50%" stop-color="#e879a0"/>
      <stop offset="100%" stop-color="#c026a0"/>
    </linearGradient>
    <linearGradient id="bubble" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#fce7f3"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="${s * 0.015}" stdDeviation="${s * 0.02}" flood-color="#be185d" flood-opacity="0.25"/>
    </filter>
  </defs>

  <!-- background -->
  <rect width="${s}" height="${s}" rx="${r}" fill="url(#bg)"/>

  <!-- decorative dots -->
  ${sp(s * 0.12, s * 0.14, s * 0.025)}
  ${sp(s * 0.88, s * 0.12, s * 0.018)}
  ${sp(s * 0.82, s * 0.82, s * 0.022)}
  ${sp(s * 0.15, s * 0.8, s * 0.016)}

  <!-- speech bubble tail -->
  <path d="M ${tx} ${ty} L ${tx2} ${ty2} Q ${cx - s*0.02} ${ty2 - s*0.02} ${tx3} ${ty3} Z"
    fill="url(#bubble)" filter="url(#shadow)"/>

  <!-- speech bubble body -->
  <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="${br}"
    fill="url(#bubble)" filter="url(#shadow)"/>

  <!-- face: ears -->
  <circle cx="${fcx - faceR * 0.9}" cy="${fcy}" r="${faceR * 0.28}" fill="#fda4af"/>
  <circle cx="${fcx + faceR * 0.9}" cy="${fcy}" r="${faceR * 0.28}" fill="#fda4af"/>
  <circle cx="${fcx - faceR * 0.9}" cy="${fcy}" r="${faceR * 0.16}" fill="#fecdd3"/>

  <!-- face: head -->
  <circle cx="${fcx}" cy="${fcy}" r="${faceR}" fill="#fef3c7"/>

  <!-- face: hair -->
  <ellipse cx="${fcx}" cy="${fcy - faceR * 0.82}" rx="${faceR * 0.5}" ry="${faceR * 0.22}" fill="#92400e"/>
  <ellipse cx="${fcx - faceR * 0.32}" cy="${fcy - faceR * 0.9}" rx="${faceR * 0.16}" ry="${faceR * 0.24}" fill="#92400e"/>
  <ellipse cx="${fcx + faceR * 0.32}" cy="${fcy - faceR * 0.9}" rx="${faceR * 0.16}" ry="${faceR * 0.24}" fill="#92400e"/>

  <!-- face: eyes -->
  <circle cx="${fcx - eyeOffX}" cy="${eyeY}" r="${eyeR}" fill="#1c1917"/>
  <circle cx="${fcx + eyeOffX}" cy="${eyeY}" r="${eyeR}" fill="#1c1917"/>
  <circle cx="${fcx - eyeOffX + eyeR*0.35}" cy="${eyeY - eyeR*0.35}" r="${eyeR*0.32}" fill="white"/>
  <circle cx="${fcx + eyeOffX + eyeR*0.35}" cy="${eyeY - eyeR*0.35}" r="${eyeR*0.32}" fill="white"/>

  <!-- face: cheeks -->
  <circle cx="${fcx - cheekR * 1.55}" cy="${cheekY}" r="${cheekR}" fill="#fda4af" opacity="0.6"/>
  <circle cx="${fcx + cheekR * 1.55}" cy="${cheekY}" r="${cheekR}" fill="#fda4af" opacity="0.6"/>

  <!-- face: smile -->
  <path d="M ${fcx - mouthW} ${mouthY} Q ${fcx} ${mouthY + mouthW * 0.85} ${fcx + mouthW} ${mouthY}"
    stroke="#e11d48" stroke-width="${s * 0.018}" fill="none" stroke-linecap="round"/>

  <!-- bottom text area -->
  <rect x="${s*0.18}" y="${s*0.73}" width="${s*0.64}" height="${s*0.16}" rx="${s*0.08}" fill="white" opacity="0.25"/>
  <text x="${cx}" y="${s*0.845}" font-size="${s*0.11}" font-weight="700"
    text-anchor="middle" fill="white" font-family="Helvetica Neue, Arial, sans-serif"
    letter-spacing="${s*0.004}">ことばタッチ</text>
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
