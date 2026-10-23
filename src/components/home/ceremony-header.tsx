"use client";

import { Diya, Kalash, Lotus } from "@withicons/react/utsav";
import { LanguageToggle } from "@/components/site/language-toggle";
import { useLanguage } from "@/components/language/language-provider";
import { cn } from "@/lib/utils";

export function CeremonyHeader({ visible }: { visible: boolean }) {
  const { lang } = useLanguage();

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-marigold/70 bg-paper/95 shadow-sm backdrop-blur-md transition duration-300",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-full opacity-0",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 md:px-6">
        <a href="#ceremony" className="flex min-w-0 items-center gap-3">
          <span className="flex items-end gap-1.5" aria-hidden>
            <Lotus size={26} />
            <Diya size={32} />
            <Kalash size={26} />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-heading text-lg leading-none font-extrabold text-maroon-deep">
              शाश्वत सत्य
            </span>
            <span className="mt-0.5 block truncate text-xs font-medium text-ink/75">
              {lang === "hi" ? "स्मृति और श्रद्धांजलि" : "Shashvat Satya"}
            </span>
          </span>
        </a>
        <LanguageToggle dense />
      </div>
    </header>
  );
}
