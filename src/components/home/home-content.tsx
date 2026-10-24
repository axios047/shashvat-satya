"use client";

import Link from "next/link";
import {
  SolemnPersonCard,
  WarmPersonCard,
} from "@/components/cards/person-card";
import { WritingCard } from "@/components/cards/writing-card";
import { CeremonialHero } from "@/components/home/ceremonial-hero";
import { PanchangCalendar } from "@/components/home/panchang-calendar";
import { LanguageProvider } from "@/components/language/language-provider";
import { SectionBlock } from "@/components/site/section-block";
import { SiteFooter } from "@/components/site/site-footer";
import {
  PortraitArt,
  PortraitPlaceholder,
} from "@/components/site/portrait-art";
import { hasPaintedPortrait } from "@/lib/painted-portraits";
import { SnapRail } from "@/components/ui/snap-rail";
import { useLanguage } from "@/components/language/language-provider";
import { pickString } from "@/lib/i18n";
import type {
  Martyr,
  SitePage,
  TeamMember,
  Tribute,
  Writing,
} from "@/sanity/types";

export type HomepageData = {
  panchangTributes: Pick<Tribute, "_id" | "slug" | "name" | "deathDate">[];
  shradhanjali: Tribute[];
  martyrs: Martyr[];
  deathAnniversaries: Tribute[];
  birthAnniversaries: Tribute[];
  jeevanSaar: Writing[];
  articles: Writing[];
  news: Writing[];
  letters: Writing[];
  team: TeamMember[];
  pages: SitePage[];
};

export function HomeContent({
  data,
  todayIso,
}: {
  data: HomepageData;
  todayIso: string;
}) {
  return (
    <LanguageProvider>
      <CeremonialHero />
      <div id="sections">
        <HomeSections data={data} todayIso={todayIso} />
      </div>
      <SiteFooter pages={data.pages} />
    </LanguageProvider>
  );
}

function HomeSections({
  data,
  todayIso,
}: {
  data: HomepageData;
  todayIso: string;
}) {
  const { lang } = useLanguage();

  return (
    <>
      <SectionBlock
        id="calendar"
        icon="panchang"
        titleHi="पुण्यतिथि पंचांग"
        titleEn="Punyatithi panchang"
      >
        <PanchangCalendar
          tributes={data.panchangTributes}
          todayIso={todayIso}
        />
      </SectionBlock>

      <SectionBlock
        icon="shraddhanjali"
        titleHi="श्रद्धांजलि"
        titleEn="Shraddhanjali"
        tone="paper"
      >
        <SnapRail itemClassName="w-[min(72vw,240px)]">
          {data.shradhanjali.map((item) => (
            <WarmPersonCard
              key={item._id}
              person={item}
              href={`/tributes/${item.slug.current}`}
            />
          ))}
        </SnapRail>
      </SectionBlock>

      <SectionBlock
        icon="martyrs"
        titleHi="भारत के अमर बलिदानी"
        titleEn="Amar Balidani"
        tone="solemn"
      >
        <div className="mb-6 flex items-center gap-3 text-marigold/90">
          <span className="inline-block h-8 w-1 rounded bg-marigold" aria-hidden />
          <p className="text-sm font-medium">
            {lang === "hi"
              ? "नामों का शांत मैदान — अमर ज्योति"
              : "A quiet field of names — eternal flame"}
          </p>
        </div>
        <SnapRail itemClassName="w-[min(72vw,240px)]">
          {data.martyrs.map((item) => (
            <SolemnPersonCard
              key={item._id}
              person={item}
              href={`/martyrs/${item.slug.current}`}
            />
          ))}
        </SnapRail>
      </SectionBlock>

      <SectionBlock
        icon="deathAnniversary"
        titleHi="पुण्यतिथि"
        titleEn="Death anniversaries"
      >
        <SnapRail itemClassName="w-[min(72vw,240px)]">
          {data.deathAnniversaries.map((item) => (
            <WarmPersonCard
              key={item._id}
              person={item}
              href={`/tributes/${item.slug.current}`}
            />
          ))}
        </SnapRail>
      </SectionBlock>

      <SectionBlock icon="birthAnniversary" titleHi="जन्मदिन" titleEn="Birth anniversaries">
        <SnapRail itemClassName="w-[min(72vw,240px)]">
          {data.birthAnniversaries.map((item) => (
            <WarmPersonCard
              key={item._id}
              person={item}
              href={`/tributes/${item.slug.current}`}
            />
          ))}
        </SnapRail>
      </SectionBlock>

      <SectionBlock icon="jeevanSaar" titleHi="जीवन सार" titleEn="Jeevan Saar">
        <SnapRail itemClassName="w-[min(85vw,360px)]">
          {data.jeevanSaar.map((item) => (
            <WritingCard
              key={item._id}
              item={item}
              href={`/writings/${item.slug.current}`}
            />
          ))}
        </SnapRail>
      </SectionBlock>

      <SectionBlock icon="articles" titleHi="लेख" titleEn="Articles">
        <SnapRail itemClassName="w-[min(85vw,360px)]">
          {data.articles.map((item) => (
            <WritingCard
              key={item._id}
              item={item}
              href={`/writings/${item.slug.current}`}
            />
          ))}
        </SnapRail>
      </SectionBlock>

      <SectionBlock icon="news" titleHi="समाचार" titleEn="News">
        <SnapRail itemClassName="w-[min(85vw,360px)]">
          {data.news.map((item) => (
            <WritingCard
              key={item._id}
              item={item}
              href={`/writings/${item.slug.current}`}
            />
          ))}
        </SnapRail>
      </SectionBlock>

      <SectionBlock icon="letters" titleHi="आपके पत्र" titleEn="Your letters">
        <SnapRail itemClassName="w-[min(85vw,360px)]">
          {data.letters.map((item) => (
            <WritingCard
              key={item._id}
              item={item}
              href={`/writings/${item.slug.current}`}
            />
          ))}
        </SnapRail>
      </SectionBlock>

      <SectionBlock icon="team" titleHi="हमारा समूह" titleEn="Our group">
        <SnapRail itemClassName="w-[min(72vw,240px)]">
          {data.team.map((member) => (
            <TeamCard key={member._id} member={member} />
          ))}
        </SnapRail>
      </SectionBlock>
    </>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  const { lang } = useLanguage();
  const name = pickString(member.name, lang);
  const note = pickString(member.note, lang);

  return (
    <Link
      href={`/team/${member.slug.current}`}
      className="group block h-full w-full overflow-hidden rounded-lg border-2 border-marigold/70 bg-paper shadow-[inset_0_0_0_1px_var(--maroon-deep)] transition hover:shadow-md"
    >
      {member.portrait ||
      hasPaintedPortrait("teamMember", member.slug.current) ? (
        <PortraitArt
          type="teamMember"
          slug={member.slug.current}
          alt={name}
        />
      ) : (
        <PortraitPlaceholder />
      )}
      <div className="border-t border-maroon/15 bg-background/90 px-3 py-3 text-center">
        <h3 className="font-heading text-base font-bold text-maroon-deep group-hover:text-maroon">
          {name}
        </h3>
        {note ? (
          <p className="mt-1 text-xs text-muted-foreground">{note}</p>
        ) : null}
      </div>
    </Link>
  );
}
