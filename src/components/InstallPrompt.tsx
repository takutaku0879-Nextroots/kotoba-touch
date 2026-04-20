"use client";

import { useState, useEffect } from "react";
import { X, Share, PlusSquare } from "lucide-react";

type Platform = "ios" | "android" | null;

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent;
  if (/iphone|ipad|ipod/i.test(ua)) return "ios";
  if (/android/i.test(ua)) return "android";
  return null;
}

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true;
}

export default function InstallPrompt() {
  const [show, setShow] = useState(false);
  const [platform, setPlatform] = useState<Platform>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    if (isStandalone()) return;
    if (sessionStorage.getItem("install-dismissed")) return;

    const p = detectPlatform();
    setPlatform(p);

    if (p === "android") {
      const handler = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e);
        setShow(true);
      };
      window.addEventListener("beforeinstallprompt", handler);
      return () => window.removeEventListener("beforeinstallprompt", handler);
    }

    if (p === "ios") {
      setShow(true);
    }
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

  if (!show) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 animate-in slide-in-from-bottom duration-300">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-border p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">👶</span>
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground">ホーム画面に追加</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                アプリとして使えるようになります
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={dismiss}
            className="text-muted-foreground hover:text-foreground p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {platform === "ios" ? (
          <div className="mt-3 bg-muted rounded-xl p-3">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="inline-flex items-center gap-1 align-middle">
                <Share className="w-3.5 h-3.5 text-blue-500" />
              </span>
              {" "}共有ボタンをタップして
              <span className="inline-flex items-center gap-1 align-middle mx-1">
                <PlusSquare className="w-3.5 h-3.5" />
                <span className="font-medium text-foreground">「ホーム画面に追加」</span>
              </span>
              を選んでください
            </p>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleInstall}
            className="mt-3 w-full bg-primary text-white rounded-xl py-2.5 text-sm font-medium active:scale-95 transition-all"
          >
            ホーム画面に追加する
          </button>
        )}
      </div>
    </div>
  );
}
