"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { usePostHog } from "posthog-js/react";

type BrowserType = "line" | "twitter" | "ios-safari" | "ios-chrome" | "ios-edge" | "android" | null;

function detectBrowser(): BrowserType {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent;
  const isIOS = /iphone|ipad|ipod/i.test(ua);
  const isAndroid = /android/i.test(ua);

  if (/line\//i.test(ua)) return "line";
  if (/twitter/i.test(ua)) return "twitter";
  if (isIOS && /edgios|edga/i.test(ua)) return "ios-edge";
  if (isIOS && /crios/i.test(ua)) return "ios-chrome";
  if (isIOS) return "ios-safari";
  if (isAndroid) return "android";
  return null;
}

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

const SAFARI_REDIRECT_BROWSERS: BrowserType[] = ["line", "twitter", "ios-chrome", "ios-edge"];

const SAFARI_REDIRECT_STEPS: Record<string, string[]> = {
  line: [
    "右下の「…」アイコンをタップ",
    "「ブラウザで開く」を選択",
    "Safariが開いたら音声が使えます 🎵",
  ],
  twitter: [
    "右下の「…」アイコンをタップ",
    "「Safariで開く」を選択",
  ],
  "ios-chrome": [
    "右上の「…」アイコンをタップ",
    "「Safariで開く」を選択",
  ],
  "ios-edge": [
    "右下の「…」アイコンをタップ",
    "「Safariで開く」を選択",
  ],
};

const PWA_INSTALL_STEPS = [
  "下のツールバーの共有ボタン「↑」をタップ",
  "「ホーム画面に追加」を選択",
  "「追加」をタップして完了",
];

export default function InstallPrompt() {
  const posthog = usePostHog();
  const [browser, setBrowser] = useState<BrowserType>(null);
  const [showSheet, setShowSheet] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    if (isStandalone()) return;

    const b = detectBrowser();
    setBrowser(b);

    if (b === "android") {
      const handler = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e);
      };
      window.addEventListener("beforeinstallprompt", handler);
      return () => window.removeEventListener("beforeinstallprompt", handler);
    }
  }, []);

  const handleBannerClick = () => {
    posthog.capture("install_prompt_shown", { browser_type: browser });
    if (browser === "android" && deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(({ outcome }: { outcome: string }) => {
        posthog.capture("install_native_result", { browser_type: browser, outcome });
        setDeferredPrompt(null);
      });
    } else {
      setShowSheet(true);
    }
  };

  const closeSheet = () => {
    posthog.capture("install_prompt_dismissed", { browser_type: browser });
    setShowSheet(false);
  };

  if (!browser) return null;

  const isSafariRedirect = SAFARI_REDIRECT_BROWSERS.includes(browser);
  const steps = isSafariRedirect
    ? SAFARI_REDIRECT_STEPS[browser] ?? []
    : PWA_INSTALL_STEPS;

  return (
    <>
      {/* 固定トップバナー */}
      <div className="fixed top-0 inset-x-0 z-40 flex justify-center">
        <button
          type="button"
          onClick={handleBannerClick}
          className="w-full max-w-md bg-primary text-white text-xs font-medium py-2 px-4 flex items-center justify-center gap-1.5 active:opacity-80 transition-opacity"
        >
          <span>📲</span>
          <span>ホーム画面にアプリ追加</span>
        </button>
      </div>

      {/* インストール手順シート */}
      {showSheet && (
        <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={closeSheet}>
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="relative w-full max-w-md bg-white rounded-t-2xl p-5 animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-2xl">
                  {isSafariRedirect ? "🔊" : "👶"}
                </div>
                <div>
                  {isSafariRedirect ? (
                    <>
                      <p className="font-semibold text-sm text-foreground">Safariで開くと音声が使えます</p>
                      <p className="text-xs text-muted-foreground mt-0.5">このブラウザでは音声が再生されない場合があります</p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold text-sm text-foreground">ホーム画面に追加しよう</p>
                      <p className="text-xs text-muted-foreground mt-0.5">アプリとして使えます</p>
                    </>
                  )}
                </div>
              </div>
              <button type="button" onClick={closeSheet} className="text-muted-foreground p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <ol className="bg-muted rounded-xl p-3 space-y-1.5">
              {steps.map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="w-4 h-4 rounded-full bg-primary/20 text-primary font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
              {isSafariRedirect && (
                <li className="flex items-start gap-2 text-xs text-primary font-medium mt-1 pt-1 border-t border-border">
                  <span className="text-base leading-none">💡</span>
                  <span>Safariで開いた後は「ホーム画面に追加」でアプリとして使えます</span>
                </li>
              )}
            </ol>
          </div>
        </div>
      )}
    </>
  );
}
