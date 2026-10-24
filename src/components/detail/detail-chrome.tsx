"use client";

import Link from "next/link";
import { LanguageToggle } from "@/components/site/language-toggle";
import { MemorialFrame } from "@/components/site/memorial-frame";
import { PortraitArt } from "@/components/site/portrait-art";
import { WritingCoverArt } from "@/components/site/writing-cover-art";
import { useLanguage } from "@/components/language/language-provider";
import { pickString } from "@/lib/i18n";
import type { PortraitEntity } from "@/lib/painted-portraits";
import type { BilingualString } from "@/sanity/types";

export function DetailChrome({
  backHref,
  backLabel,
  title,
  subtitle,
  variant,
  portrait,
  writingCoverSlug,
}: {
  backHref: string;
  backLabel: { hi: string; en: string };
  title: BilingualString;
  subtitle?: string;
  variant: "warm" | "solemn";
  portrait?: { type: PortraitEntity; slug: string } | null;
  writingCoverSlug?: string | null;
}) {
  const { lang } = useLanguage();
  const heading = pickString(title, lang);

  return (
    <>
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6">
        <Link
          href={backHref}
          className="text-sm font-medium underline-offset-4 hover:underline"
        >
          {lang === "hi" ? backLabel.hi : backLabel.en}
        </Link>
        <LanguageToggle />
      </header>
      <div className="mx-auto max-w-3xl px-6">
        <MemorialFrame variant={variant} className="mb-8 overflow-hidden" tight>
          {writingCoverSlug ? (
            <WritingCoverArt
              slug={writingCoverSlug}
              alt={heading}
              className="max-h-[min(50vh,420px)]"
              sizes="(max-width: 768px) 100vw, 672px"
              priority
            />
          ) : portrait ? (
            <PortraitArt
              type={portrait.type}
              slug={portrait.slug}
              alt={heading}
              className="max-h-[min(70vh,520px)]"
              sizes="(max-width: 768px) 100vw, 672px"
              priority
            />
          ) : null}
          <div className="px-6 py-10 text-center">
            <h1 className="font-heading text-4xl font-extrabold md:text-5xl">
              {heading}
            </h1>
            {subtitle ? (
              <p className="mt-2 text-sm font-semibold tracking-wide text-marigold uppercase">
                {subtitle}
              </p>
            ) : null}
          </div>
        </MemorialFrame>
      </div>
    </>
  );
}
