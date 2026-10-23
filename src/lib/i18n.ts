import type { BilingualString, BilingualText } from "@/sanity/types";

export type Lang = "hi" | "en";

export function pickString(
  value: BilingualString | undefined,
  lang: Lang,
): string {
  if (!value) return "";
  return value[lang]?.trim() || value.en?.trim() || value.hi?.trim() || "";
}

export function pickText(
  value: BilingualText | undefined,
  lang: Lang,
): string {
  if (!value) return "";
  return value[lang]?.trim() || value.en?.trim() || value.hi?.trim() || "";
}

export function hasDevanagari(text: string) {
  return /[\u0900-\u097F]/.test(text);
}
