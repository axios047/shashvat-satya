"use client";

import type { ComponentType } from "react";
import { cn } from "@/lib/utils";
import {
  Diya,
  Kalash,
  Lotus,
  Marigold,
  Paisley,
  PeacockFeather,
  Shankh,
  Toran,
} from "@withicons/react/utsav";
export type SectionIconId =
  | "panchang"
  | "shraddhanjali"
  | "martyrs"
  | "deathAnniversary"
  | "birthAnniversary"
  | "jeevanSaar"
  | "articles"
  | "news"
  | "letters"
  | "team";

const ICONS = {
  panchang: Diya,
  shraddhanjali: Lotus,
  martyrs: Diya,
  deathAnniversary: Marigold,
  birthAnniversary: Lotus,
  jeevanSaar: Paisley,
  articles: Shankh,
  news: Toran,
  letters: PeacockFeather,
  team: Kalash,
};

export function SectionEmblem({
  id,
  size = 40,
  className,
}: {
  id: SectionIconId;
  size?: number;
  className?: string;
}) {
  const Icon = ICONS[id] as ComponentType<{
    size?: number;
    className?: string;
    title?: string;
  }>;
  return <Icon size={size} className={className} aria-hidden />;
}

const PERSON_EMBLEMS = [
  Diya,
  Lotus,
  Marigold,
  Kalash,
  Shankh,
  PeacockFeather,
  Paisley,
  Toran,
] as const;

/** Stable emblem for a person. Same slug always lands on the same icon. */
export function emblemIndex(slug: string) {
  let hash = 0;
  for (const char of decodeURIComponent(slug)) {
    hash = (hash * 33 + char.charCodeAt(0)) >>> 0;
  }
  return hash % PERSON_EMBLEMS.length;
}

export function MemorialEmblem({
  slug,
  size = 28,
  className,
}: {
  slug: string;
  size?: number;
  className?: string;
}) {
  const Icon = PERSON_EMBLEMS[emblemIndex(slug)];
  return (
    <span className={cn("inline-flex shrink-0", className)}>
      <Icon size={size} aria-hidden />
    </span>
  );
}

export function DiyaEmblem({
  size = 40,
  className,
  lit,
}: {
  size?: number;
  className?: string;
  lit?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex",
        lit && "drop-shadow-[0_0_6px_rgba(224,177,90,0.85)]",
        className,
      )}
    >
      <Diya size={size} aria-hidden />
    </span>
  );
}
