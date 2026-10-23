"use client";

import Link from "next/link";
import { MemorialFrame } from "@/components/site/memorial-frame";
import {
  PortraitArt,
  PortraitPlaceholder,
} from "@/components/site/portrait-art";
import { useLanguage } from "@/components/language/language-provider";
import { pickString } from "@/lib/i18n";
import type { Martyr, Tribute } from "@/sanity/types";
import { cn } from "@/lib/utils";

type Person = Tribute | Martyr;

export function WarmPersonCard({
  person,
  href,
}: {
  person: Person;
  href: string;
}) {
  const { lang } = useLanguage();
  const name = pickString(person.name, lang);
  const entity = person._type === "martyr" ? "martyr" : "tribute";

  return (
    <Link href={href} className="group block h-full w-full">
      <MemorialFrame
        variant="warm"
        className="h-full overflow-hidden transition group-hover:shadow-md"
        tight
      >
        <div className="flex flex-col">
          {person.portrait ? (
            <PortraitArt
              type={entity}
              slug={person.slug.current}
              alt={name}
            />
          ) : (
            <PortraitPlaceholder />
          )}
          <h3 className="px-3 py-3 text-center font-heading text-lg font-bold text-maroon-deep group-hover:text-maroon">
            {name}
          </h3>
        </div>
      </MemorialFrame>
    </Link>
  );
}

export function SolemnPersonCard({
  person,
  href,
}: {
  person: Martyr;
  href: string;
}) {
  const { lang } = useLanguage();
  const name = pickString(person.name, lang);

  return (
    <Link
      href={href}
      className={cn(
        "group block h-full w-full overflow-hidden rounded-lg border transition",
        "border-paper/15 bg-maroon-deep/50 hover:border-marigold/50 hover:bg-maroon-deep/70",
      )}
    >
      {person.portrait ? (
        <PortraitArt
          type="martyr"
          slug={person.slug.current}
          alt={name}
          className="opacity-95"
        />
      ) : (
        <PortraitPlaceholder className="bg-maroon-deep/80" />
      )}
      <div className="px-3 py-3">
        <p className="font-heading text-base font-bold text-paper">{name}</p>
        {person.award ? (
          <p className="mt-1 text-xs font-medium tracking-wide text-marigold/90 uppercase">
            {person.award}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
