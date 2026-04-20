import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ことばタッチ — 赤ちゃん言葉アプリ";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #fce4ec 0%, #f8bbd0 50%, #f48fb1 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          gap: 24,
        }}
      >
        <div style={{ fontSize: 120, lineHeight: 1 }}>👶</div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "#c2185b",
            letterSpacing: "-2px",
          }}
        >
          ことばタッチ
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#880e4f",
            background: "rgba(255,255,255,0.6)",
            padding: "12px 32px",
            borderRadius: 40,
          }}
        >
          赤ちゃん言葉を声で覚えよう
        </div>
      </div>
    ),
    { ...size }
  );
}
