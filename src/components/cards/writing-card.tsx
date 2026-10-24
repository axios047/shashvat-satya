"use client";

import Link from "next/link";
import { Paisley, Shankh, Toran, PeacockFeather } from "@withicons/react/utsav";
import { useLanguage } from "@/components/language/language-provider";
import { WritingCoverArt } from "@/components/site/writing-cover-art";
import { pickString } from "@/lib/i18n";
import { hasWritingCover } from "@/lib/writing-covers";
import type { Writing } from "@/sanity/types";
import { cn } from "@/lib/utils";

const kindLabel: Record<Writing["kind"], { hi: string; en: string }> = {
  article: { hi: "लेख", en: "Article" },
  jeevanSaar: { hi: "जीवन सार", en: "Jeevan Saar" },
  news: { hi: "समाचार", en: "News" },
  letter: { hi: "पत्र", en: "Letter" },
};

const kindIcon = {
  article: Shankh,
  jeevanSaar: Paisley,
  news: Toran,
  letter: PeacockFeather,
} as const;

export function WritingCard({ item, href }: { item: Writing; href: string }) {
  const { lang } = useLanguage();
  const title = pickString(item.title, lang);
  const label = kindLabel[item.kind][lang];
  const Icon = kindIcon[item.kind];
  const slug = item.slug.current;
  const cover = hasWritingCover(slug);

  return (
    <Link
      href={href}
      className={cn(
        "group flex h-full w-full overflow-hidden rounded-lg border border-border bg-card/90 transition hover:border-maroon/35 hover:shadow-sm",
        cover ? "flex-col" : "flex-row items-start gap-4 p-4",
      )}
    >
      {cover ? (
        <WritingCoverArt slug={slug} alt={title} />
      ) : (
        <Icon size={72} className="shrink-0" aria-hidden />
      )}
      <div className={cn("min-w-0 flex-1", cover && "px-4 py-4")}>
        <p className="text-xs font-semibold tracking-wide text-maroon uppercase">
          {label}
        </p>
        <h3 className="mt-1 font-heading text-xl font-bold leading-snug text-ink group-hover:text-maroon-deep">
          {title}
        </h3>
      </div>
    </Link>
  );
}
