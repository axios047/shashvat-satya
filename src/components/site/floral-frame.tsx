import { cn } from "@/lib/utils";

export function FloralFrame({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden
    >
      <Corner className="top-0 left-0" />
      <Corner className="top-0 right-0 -scale-x-100" />
      <Corner className="bottom-0 left-0 -scale-y-100" />
      <Corner className="right-0 bottom-0 -scale-x-100 -scale-y-100" />
      <span className="absolute top-24 right-24 left-24 h-px bg-marigold/90 md:top-32 md:right-32 md:left-32" />
      <span className="absolute top-[6.4rem] right-28 left-28 h-px bg-maroon/35 md:top-[8.4rem] md:right-36 md:left-36" />
      <span className="absolute right-24 bottom-24 left-24 h-px bg-marigold/90 md:right-32 md:bottom-32 md:left-32" />
      <span className="absolute right-28 bottom-[6.4rem] left-28 h-px bg-maroon/35 md:right-36 md:bottom-[8.4rem] md:left-36" />
      <span className="absolute top-24 bottom-24 left-24 w-px bg-marigold/90 md:top-32 md:bottom-32 md:left-32" />
      <span className="absolute top-28 bottom-28 left-[6.4rem] w-px bg-maroon/35 md:top-36 md:bottom-36 md:left-[8.4rem]" />
      <span className="absolute top-24 right-24 bottom-24 w-px bg-marigold/90 md:top-32 md:right-32 md:bottom-32" />
      <span className="absolute top-28 right-[6.4rem] bottom-28 w-px bg-maroon/35 md:top-36 md:right-[8.4rem] md:bottom-36" />
    </div>
  );
}

function Corner({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 180"
      className={cn(
        "absolute h-24 w-24 text-marigold md:h-32 md:w-32",
        className,
      )}
    >
      <path
        d="M12 168C12 78 58 22 168 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
      />
      <path
        d="M26 168C28 92 72 36 168 26"
        fill="none"
        stroke="var(--maroon)"
        strokeWidth="1.15"
        opacity="0.75"
      />
      <path
        d="M48 168c2-48 28-86 78-108"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        opacity="0.7"
      />
      <Leaf x={78} y={22} rotate={-18} />
      <Leaf x={22} y={78} rotate={72} />
      <Leaf x={108} y={34} rotate={8} />
      <Leaf x={34} y={108} rotate={98} />
      <Marigold cx={62} cy={18} />
      <Marigold cx={18} cy={62} />
      <Lotus cx={40} cy={40} />
      <circle cx="112" cy="16" r="2.2" fill="var(--maroon)" />
      <circle cx="16" cy="112" r="2.2" fill="var(--maroon)" />
      <circle cx="96" cy="14" r="1.4" fill="currentColor" />
      <circle cx="14" cy="96" r="1.4" fill="currentColor" />
    </svg>
  );
}

function Lotus({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      {Array.from({ length: 8 }, (_, index) => (
        <ellipse
          key={index}
          cx="0"
          cy="-13"
          rx="5"
          ry="13"
          fill="var(--paper)"
          fillOpacity="0.35"
          stroke="currentColor"
          strokeWidth="1.2"
          transform={`rotate(${index * 45})`}
        />
      ))}
      <circle r="4.2" fill="var(--maroon)" />
      <circle r="1.8" fill="currentColor" />
    </g>
  );
}

function Marigold({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      {Array.from({ length: 8 }, (_, index) => (
        <ellipse
          key={index}
          cx="0"
          cy="-6"
          rx="2.4"
          ry="6"
          fill="currentColor"
          opacity="0.9"
          transform={`rotate(${index * 45})`}
        />
      ))}
      <circle r="2.3" fill="var(--maroon)" />
    </g>
  );
}

function Leaf({
  x,
  y,
  rotate,
}: {
  x: number;
  y: number;
  rotate: number;
}) {
  return (
    <path
      d="M0 0c8 1 14 8 14 16C8 14 2 8 0 0z"
      fill="var(--tulsi)"
      opacity="0.85"
      transform={`translate(${x} ${y}) rotate(${rotate})`}
    />
  );
}
