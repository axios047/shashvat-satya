"use client";

import { useLanguage } from "@/components/language/language-provider";

export function LocalizedHtml({
  html,
}: {
  html: { hi: string; en: string };
}) {
  const { lang } = useLanguage();
  const content = html[lang] || html.en || html.hi;
  if (!content) return null;

  return (
    <div
      className="prose prose-stone max-w-none prose-headings:font-heading prose-a:text-maroon prose-strong:text-maroon-deep"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
