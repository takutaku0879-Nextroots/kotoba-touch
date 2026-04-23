"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
      person_profiles: "identified_only",
      capture_pageview: true,
    });

    // 滞在時間トラッキング
    const startTime = Date.now();
    const handleEnd = () => {
      const duration_seconds = Math.round((Date.now() - startTime) / 1000);
      posthog.capture("session_ended", { duration_seconds });
    };
    window.addEventListener("beforeunload", handleEnd);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") handleEnd();
    });
    return () => {
      window.removeEventListener("beforeunload", handleEnd);
    };
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
