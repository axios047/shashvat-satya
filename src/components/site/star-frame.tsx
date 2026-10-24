import { cn } from "@/lib/utils";

/** Eight-pointed star: two squares spinning the same way, inner dash traveling the border. */
export function StarFrame({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 flex items-center justify-center",
        className,
      )}
      aria-hidden
    >
      <div className="relative aspect-square w-[min(108vw,92vh)] transition-transform duration-700 ease-out group-hover:scale-110">
        <FramedSquare offset={0} />
        <FramedSquare offset={45} />
      </div>
    </div>
  );
}

function FramedSquare({ offset }: { offset: number }) {
  const from = `${offset} 50 50`;
  const to = `${offset + 360} 50 50`;

  return (
    <svg
      viewBox="0 0 100 100"
      className="absolute inset-[2%] h-full w-full overflow-visible"
      fill="none"
    >
      <g transform={offset ? `rotate(${offset} 50 50)` : undefined}>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from={from}
          to={to}
          dur="42s"
          repeatCount="indefinite"
        />
        <rect
          x="2.5"
          y="2.5"
          width="95"
          height="95"
          stroke="var(--maroon)"
          strokeWidth="0.32"
          strokeOpacity="0.5"
        />
        <rect
          x="6.5"
          y="6.5"
          width="87"
          height="87"
          pathLength={400}
          stroke="oklch(from var(--marigold) 0.9 c h)"
          strokeWidth="0.4"
          strokeDasharray="120 56"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-400"
            dur="7s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
    </svg>
  );
}
