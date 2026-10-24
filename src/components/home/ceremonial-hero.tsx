"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Diya, Kalash, Lotus } from "@withicons/react/utsav";
import { CeremonyHeader } from "@/components/home/ceremony-header";
import { FadeIn } from "@/components/motion/fade-in";
import { LanguageToggle } from "@/components/site/language-toggle";
import { StarFrame } from "@/components/site/star-frame";
import { useLanguage } from "@/components/language/language-provider";
import { cn } from "@/lib/utils";

function ScrollCue() {
  return (
    <svg
      viewBox="0 0 120 88"
      overflow="visible"
      className="h-14 w-24 drop-shadow-[0_2px_10px_rgba(42,33,24,0.45)]"
      aria-hidden
    >
      <g fill="var(--card)">
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0 0; 0 8; 0 0"
          dur="1.6s"
          repeatCount="indefinite"
        />
        <polygon points="14,10 60,42 106,10 92,10 60,32 28,10" />
        <polygon points="14,32 60,64 106,32 92,32 60,54 28,32" opacity="0.72" />
      </g>
    </svg>
  );
}

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
        className="group relative flex min-h-[90vh] items-center justify-center overflow-hidden px-4 py-16 sm:px-6"
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
      <div className="relative z-10 mx-auto w-full max-w-2xl sm:max-w-3xl">
        <StarFrame />
        <FadeIn className="relative flex flex-col items-center gap-5 px-10 py-24 text-center sm:gap-6 sm:px-14 sm:py-28 md:px-20 md:py-32">
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
            <span className="block">शाश्वत सत्य</span>
            <span className="mt-3 block text-2xl font-bold text-ink/85 sm:text-3xl">
              Shashvat Satya
            </span>
          </h1>
          <p className="max-w-lg text-base leading-relaxed text-ink/90 md:text-lg">
            {lang === "hi"
              ? "परिवार की श्रद्धांजलि और भारत के अमर बलिदानियों के प्रति स्मरण — एक स्मारक प्रकाशन।"
              : "Family shradhanjali and remembrance of Bharat's martyrs — a memorial publication."}
          </p>
        </FadeIn>
      </div>
      <a
        href="#sections"
        aria-label={lang === "hi" ? "स्मरण देखें" : "Enter the memorial"}
        onClick={(event) => {
          event.preventDefault();
          document
            .getElementById("sections")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 p-2 transition duration-300 hover:translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-marigold"
      >
        <ScrollCue />
      </a>
      </section>
    </>
  );
}
