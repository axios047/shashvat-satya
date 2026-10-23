"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Children, useCallback, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SnapRail({
  children,
  className,
  itemClassName,
}: {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = useCallback((dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.75;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  return (
    <div className={cn("group/rail relative", className)}>
      <button
        type="button"
        onClick={() => scrollBy(-1)}
        className="absolute top-1/2 left-0 z-10 hidden -translate-y-1/2 rounded-full border border-marigold/50 bg-paper/95 p-2 text-maroon-deep shadow-sm transition hover:bg-paper md:flex"
        aria-label="Scroll left"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => scrollBy(1)}
        className="absolute top-1/2 right-0 z-10 hidden -translate-y-1/2 rounded-full border border-marigold/50 bg-paper/95 p-2 text-maroon-deep shadow-sm transition hover:bg-paper md:flex"
        aria-label="Scroll right"
      >
        <ChevronRight className="size-5" />
      </button>
      <div
        ref={scrollerRef}
        className={cn(
          "flex gap-4 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory",
          "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "px-1 md:px-10",
        )}
      >
        {Children.map(children, (child, i) => (
          <div key={i} className={cn("shrink-0 snap-start", itemClassName)}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
