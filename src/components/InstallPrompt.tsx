"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

type BrowserType = "line" | "ios-safari" | "ios-chrome" | "android" | null;

function detectBrowser(): BrowserType {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent;
  const isIOS = /iphone|ipad|ipod/i.test(ua);
  const isAndroid = /android/i.test(ua);

  if (/line\//i.test(ua)) return "line";
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

const INSTRUCTIONS: Record<
  Exclude<BrowserType, null>,
  { steps: string[] }
> = {
  line: {
    steps: [
      "右下のブラウザアイコンをタップして「ブラウザで開く」を選択",
      "開いたブラウザの右下「三」をタップ",
      "「ホーム画面に追加」を選んで完了",
    ],
  },
  "ios-safari": {
    steps: [
      "下のツールバーの共有ボタン「↑」をタップ",
      "「ホーム画面に追加」を選択",
      "「追加」をタップして完了",
    ],
  },
  "ios-chrome": {
    steps: [
      "右下の「三」をタップ",
      "「ホーム画面に追加」を選択",
      "「追加」をタップして完了",
    ],
  },
  android: { steps: [] },
};

export default function InstallPrompt() {
  const [show, setShow] = useState(false);
  const [browser, setBrowser] = useState<BrowserType>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    if (isStandalone()) return;
    if (sessionStorage.getItem("install-dismissed")) return;

    const b = detectBrowser();
    setBrowser(b);

    if (b === "android") {
      const handler = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e);
        setShow(true);
      };
      window.addEventListener("beforeinstallprompt", handler);
      return () => window.removeEventListener("beforeinstallprompt", handler);
    }

    if (b !== null) setShow(true);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
    }
    dismiss();
  };

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem("install-dismissed", "1");
  };

  if (!show || !browser) return null;

  const instruction = INSTRUCTIONS[browser];

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 animate-in slide-in-from-bottom duration-300">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-border p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-2xl">
              👶
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground">ホーム画面に追加しよう</p>
              <p className="text-xs text-muted-foreground mt-0.5">アプリとして使えます</p>
            </div>
          </div>
          <button type="button" onClick={dismiss} className="text-muted-foreground p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {browser === "android" ? (
          <button
            type="button"
            onClick={handleInstall}
            className="mt-3 w-full bg-primary text-white rounded-xl py-2.5 text-sm font-medium active:scale-95 transition-all"
          >
            ホーム画面に追加する
          </button>
        ) : (
          <ol className="mt-3 bg-muted rounded-xl p-3 space-y-1.5">
            {instruction.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                <span className="w-4 h-4 rounded-full bg-primary/20 text-primary font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
