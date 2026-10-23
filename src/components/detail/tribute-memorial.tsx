"use client";

import Image from "next/image";
import Link from "next/link";
import { LanguageToggle } from "@/components/site/language-toggle";
import { MemorialEmblem } from "@/components/site/memorial-icons";
import { MemorialFrame } from "@/components/site/memorial-frame";
import { useLanguage } from "@/components/language/language-provider";
import { pickString } from "@/lib/i18n";
import { hasPaintedPortrait, paintedPortraitSrc } from "@/lib/painted-portraits";
import type { BilingualString, Tribute } from "@/sanity/types";

function formatDate(iso: string | undefined, lang: "hi" | "en") {
  if (!iso) return null;
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Intl.DateTimeFormat(lang === "hi" ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function TributeMemorial({
  tribute,
  body,
}: {
  tribute: Pick<
    Tribute,
    "name" | "slug" | "role" | "birthDate" | "deathDate" | "portrait"
  >;
  body: { hi: string; en: string };
}) {
  const { lang } = useLanguage();
  const name = pickString(tribute.name, lang);
  const other = otherName(tribute.name, lang);
  const birth = formatDate(tribute.birthDate, lang);
  const death = formatDate(tribute.deathDate, lang);
  const written = (lang === "hi" ? body.hi : body.en) || body.en || body.hi;
  const painted = hasPaintedPortrait("tribute", tribute.slug.current);
  const role =
    tribute.role === "publicFigure"
      ? lang === "hi"
        ? "सार्वजनिक श्रद्धांजलि"
        : "Public shradhanjali"
      : lang === "hi"
        ? "परिवार का स्मरण"
        : "Family remembrance";

  return (
    <div className="min-h-screen bg-background text-ink">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6">
        <Link
          href="/#calendar"
          className="text-sm font-semibold text-maroon underline-offset-4 hover:underline"
        >
          {lang === "hi" ? "पंचांग पर लौटें" : "Back to the panchang"}
        </Link>
        <LanguageToggle />
      </header>

      <div className="mx-auto max-w-3xl px-6 pb-20">
        <MemorialFrame className="overflow-hidden">
          <div className="px-6 py-10 md:px-10 md:py-14">
            <div className="flex flex-col gap-8 md:flex-row md:items-start">
              <div className="min-w-0 flex-1 text-center md:text-left">
                <MemorialEmblem
                  slug={tribute.slug.current}
                  size={64}
                  className="mx-auto md:mx-0"
                />
                <p className="mt-4 text-xs font-semibold tracking-[0.28em] text-maroon uppercase">
                  {lang === "hi" ? "पुण्यतिथि" : "Punyatithi"}
                </p>
                <h1 className="mt-2 font-heading text-4xl leading-tight font-extrabold text-maroon-deep md:text-6xl">
                  {name}
                </h1>
                {other ? (
                  <p className="mt-2 font-heading text-xl font-bold text-ink/75">
                    {other}
                  </p>
                ) : null}
                <p className="mt-3 text-sm font-medium text-ink/80">{role}</p>
              </div>
              {painted ? (
                <div className="relative mx-auto aspect-[3/4] w-40 shrink-0 overflow-hidden rounded-md border border-marigold/60 md:w-44">
                  <Image
                    src={paintedPortraitSrc("tribute", tribute.slug.current)}
                    alt={name}
                    fill
                    className="object-cover object-top"
                    sizes="176px"
                    priority
                  />
                </div>
              ) : null}
            </div>

            <dl className="mt-8 grid gap-3 sm:grid-cols-2">
              <DatePlate
                label={lang === "hi" ? "जन्म" : "Birth"}
                value={birth ?? (lang === "hi" ? "अभी अंकित नहीं" : "Not yet recorded")}
              />
              <DatePlate
                label={lang === "hi" ? "निधन" : "Death"}
                value={death ?? (lang === "hi" ? "अभी अंकित नहीं" : "Not yet recorded")}
              />
            </dl>
          </div>
        </MemorialFrame>

        <article className="mt-8 rounded-lg border border-border bg-card px-6 py-8 md:px-10">
          <h2 className="font-heading text-2xl font-extrabold text-maroon-deep md:text-3xl">
            {lang === "hi" ? "स्मरण" : "Remembrance"}
          </h2>
          <div className="mt-2 h-1 w-16 bg-marigold" />
          {written ? (
            <div
              className="prose prose-stone mt-6 max-w-none text-ink prose-headings:font-heading prose-p:leading-relaxed prose-a:text-maroon prose-strong:text-maroon-deep"
              dangerouslySetInnerHTML={{ __html: written }}
            />
          ) : (
            <PlaceholderCopy name={name} death={death} lang={lang} />
          )}
        </article>
      </div>
    </div>
  );
}

function DatePlate({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-marigold/50 bg-paper px-4 py-3">
      <dt className="text-xs font-semibold tracking-[0.2em] text-maroon uppercase">
        {label}
      </dt>
      <dd className="mt-1 font-heading text-lg font-bold text-maroon-deep">
        {value}
      </dd>
    </div>
  );
}

function otherName(name: BilingualString, lang: "hi" | "en") {
  const primary = pickString(name, lang);
  const secondary = lang === "hi" ? name.en?.trim() : name.hi?.trim();
  if (!secondary || secondary === primary) return null;
  return secondary;
}

function PlaceholderCopy({
  name,
  death,
  lang,
}: {
  name: string;
  death: string | null;
  lang: "hi" | "en";
}) {
  if (lang === "hi") {
    return (
      <div className="mt-6 space-y-4 text-base leading-relaxed text-ink">
        <p className="text-xs font-semibold tracking-[0.22em] text-maroon uppercase">
          स्मरण लिखा जा रहा है
        </p>
        <p>
          {name} की पुण्यतिथि
          {death ? ` ${death} को` : " इस दिन"} मनाई जाती है। उनका विस्तृत
          जीवन-वृत्त अभी इस पृष्ठ पर नहीं है। जब तक परिवार के शब्द यहाँ नहीं
          आते, यह पृष्ठ उनकी स्मृति के लिए रखा गया दीप है।
        </p>
        <p>
          आगे चलकर उनका कार्य, उनके लोग, और श्रद्धांजलि के वाक्य इसी स्मरण के
          नीचे जुड़ेंगे। अभी नाम, तिथि, और यह चिह्न ही उनका परिचय हैं।
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4 text-base leading-relaxed text-ink">
      <p className="text-xs font-semibold tracking-[0.22em] text-maroon uppercase">
        Remembrance in preparation
      </p>
      <p>
        The punyatithi of {name} is observed
        {death ? ` on ${death}` : " on this date"}. A fuller account of their
        life is not on this page yet. Until the family&apos;s words are placed
        here, the page is kept as a lamp for their memory.
      </p>
      <p>
        In time, their work, the people they leave, and the lines of
        shradhanjali will be added beneath this remembrance. For now the name,
        the dates, and this emblem are the introduction.
      </p>
    </div>
  );
}
