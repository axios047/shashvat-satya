"use client";

import Image from "next/image";
import { DiyaEmblem } from "@/components/site/memorial-icons";
import {
  paintedPortraitSrc,
  type PortraitEntity,
} from "@/lib/painted-portraits";
import { cn } from "@/lib/utils";

export function PortraitArt({
  type,
  slug,
  alt,
  className,
  sizes,
  priority,
}: {
  type: PortraitEntity;
  slug: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const src = paintedPortraitSrc(type, slug);

  return (
    <div
      className={cn(
        "relative aspect-[3/4] w-full overflow-hidden bg-muted",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-top"
        sizes={sizes ?? "(max-width: 768px) 70vw, 240px"}
        priority={priority}
      />
    </div>
  );
}

export function PortraitPlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex aspect-[3/4] w-full items-center justify-center bg-paper",
        className,
      )}
    >
      <DiyaEmblem size={48} className="opacity-80" lit />
    </div>
  );
}
