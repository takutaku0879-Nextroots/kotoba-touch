"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Volume2, Pause, ImageOff, Play } from "lucide-react";
import { VOCABULARY_DATA, getImagePath, type Entry, type Category } from "@/data/vocabulary";

export default function KotobaTouchPage() {
  const [activeCategory, setActiveCategory] = useState<Category>(VOCABULARY_DATA[0]);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const detailRef = useRef<HTMLDivElement>(null);

  const currentAudio = useRef<HTMLAudioElement | null>(null);

  const speak = useCallback(async (text: string) => {
    if (currentAudio.current) {
      currentAudio.current.pause();
      currentAudio.current = null;
    }
    setIsSpeaking(false);

    // 静的ファイルがあればそちら、なければAPI
    const staticUrl = `/vocab-audio/${encodeURIComponent(text)}.mp3`;
    const apiUrl = `/api/tts?text=${encodeURIComponent(text)}`;

    setIsSpeaking(true);
    const audio = new Audio(staticUrl);
    currentAudio.current = audio;
    audio.onended = () => setIsSpeaking(false);
    audio.onerror = async () => {
      // 静的ファイルがなければAPIにフォールバック
      try {
        const fallback = new Audio(apiUrl);
        currentAudio.current = fallback;
        fallback.onended = () => setIsSpeaking(false);
        fallback.onerror = () => setIsSpeaking(false);
        await fallback.play();
      } catch {
        setIsSpeaking(false);
      }
    };
    try {
      await audio.play();
    } catch {
      setIsSpeaking(false);
    }
  }, []);

  const handleEntrySelect = useCallback((entry: Entry) => {
    if (selectedEntry?.id !== entry.id) {
      setSelectedEntry(entry);
      setImageLoaded(false);
      setImageError(false);
    }
  }, [selectedEntry]);

  const handleCategorySelect = useCallback((category: Category) => {
    setActiveCategory(category);
    setSelectedEntry(null);
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  useEffect(() => {
    if (selectedEntry) {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selectedEntry]);

  const imageUrl = selectedEntry ? getImagePath(selectedEntry.imageFile) : null;
  const primaryBabyWord = selectedEntry?.babyWords[0] ?? "";

  return (
    <main className="min-h-dvh flex flex-col max-w-md mx-auto">

      {/* Header */}
      <div className="px-4 pt-6 pb-3 text-center">
        <h1 className="text-xl font-bold text-primary tracking-tight">ことばタッチ</h1>
        <p className="text-xs text-muted-foreground mt-0.5">赤ちゃん言葉を覚えよう</p>
      </div>

      {/* Category tabs */}
      <div className="flex gap-1.5 px-4 overflow-x-auto pb-2 scrollbar-hide">
        {VOCABULARY_DATA.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => handleCategorySelect(cat)}
            onTouchEnd={(e) => { e.preventDefault(); handleCategorySelect(cat); }}
            className={`flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeCategory.id === cat.id
                ? "bg-primary text-white shadow-sm"
                : "bg-white border border-border text-muted-foreground hover:border-primary/40"
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.nameJa}</span>
          </button>
        ))}
      </div>

      {/* Detail panel */}
      {selectedEntry && (
        <div ref={detailRef} className="mx-4 mb-3 float-in">
          <button
            type="button"
            onClick={() => speak(primaryBabyWord)}
            onTouchEnd={(e) => { e.preventDefault(); speak(primaryBabyWord); }}
            className={`relative w-full rounded-2xl overflow-hidden shadow-md active:scale-[0.98] transition-all ${
              isSpeaking ? "ring-2 ring-primary" : ""
            }`}
            style={{ minHeight: "200px" }}
          >
            {!imageLoaded && !imageError && (
              <div className="shimmer-loading absolute inset-0" />
            )}
            {imageError && (
              <div className="absolute inset-0 bg-muted flex flex-col items-center justify-center gap-2 text-muted-foreground">
                <ImageOff className="w-8 h-8 opacity-40" />
                <span className="text-sm">{selectedEntry.displayJa}</span>
              </div>
            )}
            {imageUrl && !imageError && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageUrl}
                alt={selectedEntry.displayJa}
                onLoad={() => setImageLoaded(true)}
                onError={() => { setImageError(true); setImageLoaded(false); }}
                className={`w-full object-cover transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
              />
            )}

            {/* Overlay */}
            {(imageLoaded || imageError) && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold text-white tracking-wider">{primaryBabyWord}</p>
                  {selectedEntry.babyWords.length > 1 && (
                    <p className="text-xs text-white/70 mt-0.5">
                      {selectedEntry.babyWords.slice(1).join("・")}
                    </p>
                  )}
                  <p className="text-xs text-white/60">{selectedEntry.displayJa}</p>
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                  isSpeaking ? "bg-primary" : "bg-white/90"
                }`}>
                  {isSpeaking
                    ? <Pause className="w-5 h-5 text-white" />
                    : <Play className="w-5 h-5 text-primary" />
                  }
                </div>
              </div>
            )}
          </button>

          {/* Baby word chips */}
          <div className="flex gap-2 mt-2 flex-wrap">
            {selectedEntry.babyWords.map((word) => (
              <button
                key={word}
                type="button"
                onClick={() => speak(word)}
                onTouchEnd={(e) => { e.preventDefault(); speak(word); }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium active:scale-95 transition-all hover:bg-primary/20"
              >
                <Volume2 className="w-3.5 h-3.5" />
                {word}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Entry grid */}
      <div className="flex-1 px-4 pb-6">
        <div className="grid grid-cols-3 gap-2">
          {activeCategory.entries.map((entry) => {
            const isSelected = selectedEntry?.id === entry.id;
            const entryImageUrl = getImagePath(entry.imageFile);
            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => handleEntrySelect(entry)}
                onTouchEnd={(e) => { e.preventDefault(); handleEntrySelect(entry); }}
                className={`relative rounded-xl overflow-hidden aspect-square transition-all duration-200 active:scale-95 ${
                  isSelected
                    ? "ring-2 ring-primary shadow-md shadow-primary/20"
                    : "shadow-sm hover:shadow-md"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={entryImageUrl}
                  alt={entry.displayJa}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden");
                  }}
                />
                <div className="hidden absolute inset-0 bg-muted flex items-center justify-center">
                  <ImageOff className="w-6 h-6 text-muted-foreground/40" />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-1.5 py-1.5">
                  <p className="text-white text-xs font-semibold text-center leading-tight">
                    {entry.displayJa}
                  </p>
                  <p className="text-white/70 text-[10px] text-center leading-tight">
                    {entry.babyWords[0]}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}
