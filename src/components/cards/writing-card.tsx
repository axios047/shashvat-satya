"use client";

import Link from "next/link";
import { Paisley, Shankh, Toran, PeacockFeather } from "@withicons/react/utsav";
import { useLanguage } from "@/components/language/language-provider";
import { pickString } from "@/lib/i18n";
import type { Writing } from "@/sanity/types";

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

  return (
    <Link
      href={href}
      className="group flex h-full w-full gap-4 rounded-lg border border-border bg-card/90 p-4 transition hover:border-maroon/35 hover:shadow-sm"
    >
      <Icon size={44} className="shrink-0" aria-hidden />
      <div className="min-w-0 flex-1">
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
