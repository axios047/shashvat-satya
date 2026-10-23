"use client";

import Link from "next/link";
import { useLanguage } from "@/components/language/language-provider";
import { pickString } from "@/lib/i18n";
import type { SitePage } from "@/sanity/types";

export function SiteFooter({ pages }: { pages: SitePage[] }) {
  const { lang } = useLanguage();

  return (
    <footer className="border-t border-border bg-muted/40 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted-foreground">
          {lang === "hi"
            ? "शाश्वत सत्य — स्मृति और श्रद्धांजलि"
            : "Shashvat Satya — remembrance and tribute"}
        </p>
        <nav className="flex flex-wrap gap-4 text-sm">
          {pages.map((page) => (
            <Link
              key={page._id}
              href={`/${page.slug.current}`}
              className="text-maroon hover:underline"
            >
              {pickString(page.title, lang)}
            </Link>
          ))}
          <Link href="/studio" className="text-muted-foreground hover:underline">
            Studio
          </Link>
        </nav>
      </div>
    </footer>
  );
}
