import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import InstallPrompt from "@/components/InstallPrompt";
import PostHogProvider from "@/components/PostHogProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL ?? "https://kotoba-touch.vercel.app"),
  title: "ことばタッチ — 赤ちゃん言葉・幼児語を声で覚える無料アプリ",
  description: "赤ちゃん言葉（幼児語）をタップひとつで絵と音声で確認できる無料の育児アプリ。まんま・ワンワン・ねんねなど100以上の言葉を収録。0歳・1歳・2歳の赤ちゃんと一緒に楽しく言葉を覚えよう。",
  keywords: ["赤ちゃん言葉", "幼児語", "育児アプリ", "言葉 覚える", "0歳", "1歳", "2歳", "まんま", "ワンワン", "ねんね", "赤ちゃん 言葉 練習"],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ことばタッチ",
    startupImage: "/apple-touch-icon.png",
  },
  icons: {
    apple: "/apple-touch-icon.png",
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  openGraph: {
    title: "ことばタッチ — 赤ちゃん言葉・幼児語を声で覚える無料アプリ",
    description: "赤ちゃん言葉をタップひとつで絵と音声で確認できる無料の育児アプリ。まんま・ワンワン・ねんねなど100以上の言葉を収録。",
    siteName: "ことばタッチ",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ことばタッチ — 赤ちゃん言葉・幼児語を声で覚える無料アプリ",
    description: "赤ちゃん言葉をタップひとつで絵と音声で確認できる無料の育児アプリ。まんま・ワンワン・ねんねなど100以上の言葉を収録。",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#d580b8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PostHogProvider>
          {children}
          <InstallPrompt />
        </PostHogProvider>
      </body>
    </html>
  );
}
