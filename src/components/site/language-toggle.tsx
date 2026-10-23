"use client";

import { useLanguage } from "@/components/language/language-provider";
import type { Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const options: {
  id: Lang;
  glyph: string;
  label: string;
  glyphClass: string;
}[] = [
  {
    id: "hi",
    glyph: "अ",
    label: "हिंदी",
    glyphClass: "font-[family-name:var(--font-devanagari)]",
  },
  {
    id: "en",
    glyph: "A",
    label: "English",
    glyphClass: "font-heading",
  },
];

export function LanguageToggle({
  className,
  dense = false,
}: {
  className?: string;
  dense?: boolean;
}) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      role="group"
      aria-label={lang === "hi" ? "भाषा" : "Language"}
      className={cn(
        "relative grid grid-cols-2 rounded-full border border-marigold/80 bg-paper/95 p-0.5 shadow-[inset_0_0_0_1px_rgba(74,28,28,0.18)]",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute top-0.5 bottom-0.5 left-0.5 w-[calc(50%-2px)] rounded-full bg-maroon-deep shadow-sm transition-transform duration-300 ease-out",
          lang === "en" && "translate-x-full",
        )}
      />
      {options.map((option) => {
        const active = lang === option.id;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={active}
            aria-label={option.label}
            onClick={() => setLang(option.id)}
            className={cn(
              "relative z-10 flex items-center justify-center gap-1.5 rounded-full px-2.5 py-1 transition-colors",
              active ? "text-paper" : "text-maroon-deep hover:text-maroon",
            )}
          >
            <span
              className={cn(
                "text-base leading-none font-bold",
                option.glyphClass,
              )}
              aria-hidden
            >
              {option.glyph}
            </span>
            <span
              className={cn(
                "text-[11px] font-semibold tracking-wide",
                dense && "max-sm:hidden",
              )}
            >
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
