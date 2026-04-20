import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import InstallPrompt from "@/components/InstallPrompt";

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
  title: "ことばタッチ — 赤ちゃん言葉アプリ",
  description: "タップすると赤ちゃん言葉と絵が表示されて声で読んでくれる幼児向けアプリ",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ことばタッチ",
  },
  openGraph: {
    title: "ことばタッチ — 赤ちゃん言葉アプリ",
    description: "タップすると赤ちゃん言葉と絵が表示されて声で読んでくれる幼児向けアプリ",
    siteName: "ことばタッチ",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ことばタッチ — 赤ちゃん言葉アプリ",
    description: "タップすると赤ちゃん言葉と絵が表示されて声で読んでくれる幼児向けアプリ",
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
        {children}
        <InstallPrompt />
      </body>
    </html>
  );
}
