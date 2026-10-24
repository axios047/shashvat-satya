"use client";

import Image from "next/image";
import { writingCoverSrc } from "@/lib/writing-covers";
import { cn } from "@/lib/utils";

export function WritingCoverArt({
  slug,
  alt,
  className,
  sizes,
  priority,
}: {
  slug: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const src = writingCoverSrc(slug);

  return (
    <div
      className={cn(
        "relative aspect-[4/3] w-full overflow-hidden bg-muted",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-center"
        sizes={sizes ?? "(max-width: 768px) 85vw, 360px"}
        priority={priority}
      />
    </div>
  );
}
