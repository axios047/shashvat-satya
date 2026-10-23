"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { MemorialEmblem } from "@/components/site/memorial-icons";
import { useLanguage } from "@/components/language/language-provider";
import { deathAnniversaryKey } from "@/lib/dates";
import { pickString } from "@/lib/i18n";
import type { Tribute } from "@/sanity/types";
import { cn } from "@/lib/utils";

type PanchangTribute = Pick<Tribute, "_id" | "slug" | "name" | "deathDate">;

const WEEKDAYS = {
  hi: ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"],
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
} as const;

function parseIso(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return { year, month, day };
}

function monthTitle(year: number, month: number, lang: "hi" | "en") {
  return new Intl.DateTimeFormat(lang === "hi" ? "hi-IN" : "en-IN", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, 15)));
}

function shiftMonth(year: number, month: number, delta: number) {
  const date = new Date(Date.UTC(year, month - 1 + delta, 1));
  return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1 };
}

export function PanchangCalendar({
  tributes,
  todayIso,
}: {
  tributes: PanchangTribute[];
  todayIso: string;
}) {
  const { lang } = useLanguage();
  const today = parseIso(todayIso);
  const [cursor, setCursor] = useState({
    year: today.year,
    month: today.month,
  });

  const byDay = useMemo(() => {
    const map = new Map<string, PanchangTribute[]>();
    for (const tribute of tributes) {
      if (!tribute.deathDate) continue;
      const { month, day } = deathAnniversaryKey(tribute.deathDate);
      const key = `${month}-${day}`;
      const list = map.get(key) ?? [];
      list.push(tribute);
      map.set(key, list);
    }
    return map;
  }, [tributes]);

  const firstWeekday = new Date(
    Date.UTC(cursor.year, cursor.month - 1, 1),
  ).getUTCDay();
  const daysInMonth = new Date(
    Date.UTC(cursor.year, cursor.month, 0),
  ).getUTCDate();
  const cells: Array<number | null> = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const namesThisMonth = tributes.filter((tribute) => {
    if (!tribute.deathDate) return false;
    return deathAnniversaryKey(tribute.deathDate).month === cursor.month;
  }).length;

  return (
    <div>
      <p className="mb-6 max-w-2xl text-base leading-relaxed text-ink">
        {lang === "hi"
          ? "यह महीने का पंचांग है। जिस दिन किसी की पुण्यतिथि पड़ती है, उनका नाम उस खाने में एक बटन है। नाम चुनें — स्मरण का पृष्ठ खुलता है।"
          : "This is the month as a panchang. When a punyatithi falls on a day, that person’s name is a button in the square. Choose a name to open their remembrance."}
      </p>

      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="font-heading text-3xl font-extrabold text-maroon-deep md:text-4xl">
          {monthTitle(cursor.year, cursor.month, lang)}
        </h3>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() =>
              setCursor((current) => shiftMonth(current.year, current.month, -1))
            }
            className="rounded-full border border-marigold/60 bg-paper p-2 text-maroon-deep transition hover:bg-marigold/20"
            aria-label={lang === "hi" ? "पिछला महीना" : "Previous month"}
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() =>
              setCursor({ year: today.year, month: today.month })
            }
            className="rounded-full border border-marigold/60 bg-paper px-3 py-2 font-heading text-sm font-bold text-maroon-deep transition hover:bg-marigold/20"
          >
            {lang === "hi" ? "आज" : "Today"}
          </button>
          <button
            type="button"
            onClick={() =>
              setCursor((current) => shiftMonth(current.year, current.month, 1))
            }
            className="rounded-full border border-marigold/60 bg-paper p-2 text-maroon-deep transition hover:bg-marigold/20"
            aria-label={lang === "hi" ? "अगला महीना" : "Next month"}
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>

      <p className="mb-4 text-sm text-ink/80">
        {namesThisMonth === 0
          ? lang === "hi"
            ? "इस महीने कोई पुण्यतिथि नहीं है।"
            : "No punyatithi falls in this month."
          : lang === "hi"
            ? `${namesThisMonth} नाम इस महीने लौटते हैं।`
            : `${namesThisMonth} ${namesThisMonth === 1 ? "name returns" : "names return"} this month.`}
      </p>

      <div className="overflow-hidden rounded-lg border-2 border-marigold/70 bg-card shadow-[inset_0_0_0_1px_var(--maroon-deep)]">
        <div className="grid grid-cols-7 border-b border-marigold/40 bg-maroon-deep text-paper">
          {WEEKDAYS[lang].map((label) => (
            <div
              key={label}
              className="px-1 py-2 text-center font-heading text-xs font-bold tracking-wide md:text-sm"
            >
              {label}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {cells.map((day, index) => {
            if (day === null) {
              return (
                <div
                  key={`empty-${index}`}
                  className="min-h-24 border-t border-r border-border/50 bg-muted/40 md:min-h-32"
                />
              );
            }

            const isToday =
              cursor.year === today.year &&
              cursor.month === today.month &&
              day === today.day;
            const people = byDay.get(`${cursor.month}-${day}`) ?? [];

            return (
              <div
                key={day}
                className={cn(
                  "min-h-24 border-t border-r border-border/60 p-1.5 md:min-h-36 md:p-2",
                  isToday && "bg-marigold/20 ring-2 ring-inset ring-marigold",
                  !isToday && people.length > 0 && "bg-paper",
                )}
              >
                <p
                  className={cn(
                    "font-heading text-sm font-extrabold md:text-base",
                    isToday ? "text-maroon" : "text-maroon-deep/80",
                  )}
                >
                  {day}
                  {isToday ? (
                    <span className="ml-1 text-[10px] tracking-wide uppercase">
                      {lang === "hi" ? "आज" : "Today"}
                    </span>
                  ) : null}
                </p>
                {people.length > 0 ? (
                  <p className="mt-1 text-[10px] font-semibold text-maroon md:hidden">
                    {people.length}
                  </p>
                ) : null}
                <ul className="mt-1 hidden space-y-1 md:block">
                  {people.map((person) => (
                    <li key={person._id}>
                      <NameButton
                        slug={person.slug.current}
                        name={pickString(person.name, lang)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <ol className="mt-6 space-y-4 md:hidden">
        {Array.from({ length: daysInMonth }, (_, index) => index + 1)
          .filter((day) => (byDay.get(`${cursor.month}-${day}`) ?? []).length > 0)
          .map((day) => {
            const people = byDay.get(`${cursor.month}-${day}`) ?? [];
            const isToday =
              cursor.year === today.year &&
              cursor.month === today.month &&
              day === today.day;
            return (
              <li key={day}>
                <p
                  className={cn(
                    "font-heading text-lg font-extrabold text-maroon-deep",
                    isToday && "text-maroon",
                  )}
                >
                  {day}{" "}
                  <span className="text-sm font-bold text-ink/70">
                    {monthTitle(cursor.year, cursor.month, lang)}
                    {isToday
                      ? lang === "hi"
                        ? " · आज"
                        : " · Today"
                      : ""}
                  </span>
                </p>
                <ul className="mt-2 space-y-2">
                  {people.map((person) => (
                    <li key={person._id}>
                      <NameButton
                        slug={person.slug.current}
                        name={pickString(person.name, lang)}
                        large
                      />
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
      </ol>
    </div>
  );
}

function NameButton({
  slug,
  name,
  large = false,
}: {
  slug: string;
  name: string;
  large?: boolean;
}) {
  return (
    <Link
      href={`/tributes/${slug}`}
      className={cn(
        "flex items-center gap-2 rounded-md border border-maroon/15 bg-background/80 text-left transition hover:border-maroon hover:bg-marigold/25",
        large ? "px-3 py-2.5" : "items-start px-1.5 py-1",
      )}
    >
      <MemorialEmblem slug={slug} size={large ? 28 : 18} />
      <span
        className={cn(
          "font-heading font-bold text-maroon-deep",
          large ? "text-base" : "text-sm leading-tight",
        )}
      >
        {name}
      </span>
    </Link>
  );
}
