"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/language/language-provider";
import {
  SectionEmblem,
  type SectionIconId,
} from "@/components/site/memorial-icons";

export function SectionBlock({
  titleHi,
  titleEn,
  children,
  tone = "paper",
  id,
  icon,
}: {
  titleHi: string;
  titleEn: string;
  children: ReactNode;
  tone?: "paper" | "solemn";
  id?: string;
  icon?: SectionIconId;
}) {
  const { lang } = useLanguage();
  const title = lang === "hi" ? titleHi : titleEn;
  const subtitle = lang === "hi" ? titleEn : titleHi;

  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 py-16",
        tone === "solemn" ? "bg-maroon-deep text-paper" : "bg-background",
      )}
    >
      <div className="mx-auto max-w-6xl px-6">
        <header className="mb-10 border-b-2 border-marigold/50 pb-5">
          <div className="flex flex-wrap items-center gap-5">
            {icon ? (
              <SectionEmblem
                id={icon}
                size={72}
                className={cn(
                  "shrink-0",
                  tone === "solemn" ? "brightness-110" : undefined,
                )}
              />
            ) : null}
            <div className="min-w-0 flex-1">
              <h2
                className={cn(
                  "font-heading text-4xl font-extrabold leading-tight md:text-5xl",
                  tone === "solemn" ? "text-paper" : "text-maroon-deep",
                )}
              >
                {title}
              </h2>
              <p
                className={cn(
                  "mt-1 text-sm font-medium tracking-wide",
                  tone === "solemn" ? "text-marigold/90" : "text-muted-foreground",
                )}
              >
                {subtitle}
              </p>
            </div>
          </div>
        </header>
        {children}
      </div>
    </section>
  );
}
