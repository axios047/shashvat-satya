"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Diya, Kalash, Lotus } from "@withicons/react/utsav";
import { CeremonyHeader } from "@/components/home/ceremony-header";
import { FadeIn } from "@/components/motion/fade-in";
import { LanguageToggle } from "@/components/site/language-toggle";
import { FloralFrame } from "@/components/site/floral-frame";
import { useLanguage } from "@/components/language/language-provider";
import { cn } from "@/lib/utils";

export function CeremonialHero() {
  const { lang } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setCompact(entry.intersectionRatio < 0.55);
      },
      { threshold: [0, 0.25, 0.55, 0.8, 1] },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);
  const invocation =
    lang === "hi"
      ? ["श्रद्धांजलि", "स्मृति", "बलिदान"]
      : ["Shraddhanjali", "Memory", "Sacrifice"];

  return (
    <>
      <CeremonyHeader visible={compact} />
      <div
        className={cn(
          "fixed top-4 right-4 z-40 transition duration-300",
          compact && "pointer-events-none opacity-0",
        )}
      >
        <LanguageToggle dense />
      </div>
      <section
        id="ceremony"
        ref={heroRef}
        className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-4 py-16 sm:px-6"
      >
      <Image
        src="/art/hero-courtyard.jpg"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(243,234,223,0.42)_0%,rgba(243,234,223,0.12)_46%,transparent_72%)]"
        aria-hidden
      />
      <div className="relative z-10 w-full max-w-3xl">
        <FloralFrame />
        <FadeIn className="flex flex-col items-center gap-6 px-8 py-28 text-center sm:px-12 md:px-16 md:py-40">
          <div className="flex items-end justify-center gap-5">
            <Lotus size={52} aria-hidden />
            <Diya size={64} aria-hidden />
            <Kalash size={52} aria-hidden />
          </div>
          <p
            className={cn(
              "flex flex-wrap items-center justify-center text-xs font-semibold text-maroon-deep",
              lang === "en" && "tracking-[0.28em] uppercase",
            )}
          >
            {invocation.map((word, index) => (
              <span key={word} className="inline-flex items-center">
                {index > 0 ? (
                  <span
                    aria-hidden
                    className="mx-2.5 text-base leading-none font-normal tracking-normal text-marigold normal-case"
                  >
                    ·
                  </span>
                ) : null}
                <span className={lang === "hi" ? "tracking-normal" : undefined}>
                  {word}
                </span>
              </span>
            ))}
          </p>
          <h1 className="font-heading text-5xl leading-[1.05] font-extrabold text-maroon-deep sm:text-6xl md:text-7xl">
            <span className="block font-[family-name:var(--font-devanagari)]">
              शाश्वत सत्य
            </span>
            <span className="mt-3 block text-2xl font-bold text-ink/85 sm:text-3xl">
              Shashvat Satya
            </span>
          </h1>
          <p className="max-w-lg text-base leading-relaxed text-ink/90 md:text-lg">
            {lang === "hi"
              ? "परिवार की श्रद्धांजलि और भारत के अमर बलिदानियों के प्रति स्मरण — एक स्मारक प्रकाशन।"
              : "Family shradhanjali and remembrance of Bharat's martyrs — a memorial publication."}
          </p>
          <a
            href="#sections"
            className="text-sm font-semibold text-maroon underline-offset-4 hover:underline"
          >
            {lang === "hi" ? "स्मरण देखें" : "Enter the memorial"}
          </a>
        </FadeIn>
      </div>
      </section>
    </>
  );
}
