import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function MemorialFrame({
  children,
  className,
  variant = "warm",
  tight = false,
}: {
  children: ReactNode;
  className?: string;
  variant?: "warm" | "solemn";
  /** Less padding so portraits can bleed to the frame edge. */
  tight?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative rounded-lg p-1",
        variant === "warm"
          ? "border-2 border-marigold/80 bg-paper shadow-[inset_0_0_0_1px_var(--maroon-deep)]"
          : "border border-maroon-deep/60 bg-maroon-deep/95 text-paper",
        className,
      )}
    >
      <CornerOrnament className="left-2 top-2" />
      <CornerOrnament className="right-2 top-2 scale-x-[-1]" />
      <CornerOrnament className="bottom-2 left-2 scale-y-[-1]" />
      <CornerOrnament className="bottom-2 right-2 scale-x-[-1] scale-y-[-1]" />
      <div
        className={cn(
          "relative rounded-md border",
          tight ? "p-0" : "px-1 py-1",
          variant === "warm"
            ? "border-maroon/20 bg-background/90"
            : "border-paper/15 bg-maroon-deep/80",
        )}
      >
        {children}
      </div>
    </div>
  );
}

function CornerOrnament({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={cn("pointer-events-none absolute h-4 w-4 text-marigold/60", className)}
    >
      <path
        d="M2 22c8-2 12-8 14-16M2 14c5-1 8-5 10-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="6" cy="6" r="1.5" fill="currentColor" opacity="0.8" />
    </svg>
  );
}
