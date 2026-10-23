const KOLKATA = "Asia/Kolkata";

function kolkataParts(date: Date) {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: KOLKATA,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const parts = fmt.formatToParts(date);
  const y = parts.find((p) => p.type === "year")?.value ?? "1970";
  const m = parts.find((p) => p.type === "month")?.value ?? "01";
  const d = parts.find((p) => p.type === "day")?.value ?? "01";
  return { y, m, d, iso: `${y}-${m}-${d}` };
}

export function toIsoDate(date: Date): string {
  return kolkataParts(date).iso;
}

export function shiftDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

/** Legacy three-day window (still used by homepage query slices). */
export function calendarParams(anchor = new Date()) {
  const today = toIsoDate(anchor);
  return {
    today,
    yesterday: toIsoDate(shiftDays(anchor, -1)),
    tomorrow: toIsoDate(shiftDays(anchor, 1)),
  };
}

export type PanchangDay = {
  iso: string;
  month: number;
  day: number;
  label: string;
  isToday: boolean;
};

export function panchangWindow(
  anchor = new Date(),
  radius = 7,
): PanchangDay[] {
  const todayIso = toIsoDate(anchor);
  const days: PanchangDay[] = [];

  for (let offset = -radius; offset <= radius; offset++) {
    const d = shiftDays(anchor, offset);
    const { iso, m, d: dayStr } = kolkataParts(d);
    const month = Number(m);
    const dayNum = Number(dayStr);
    const label = new Intl.DateTimeFormat("en-IN", {
      timeZone: KOLKATA,
      weekday: "short",
      day: "numeric",
      month: "short",
    }).format(d);

    days.push({
      iso,
      month,
      day: dayNum,
      label,
      isToday: iso === todayIso,
    });
  }

  return days;
}

export function deathAnniversaryKey(deathDate: string): {
  month: number;
  day: number;
} {
  const [, m, d] = deathDate.split("-");
  return { month: Number(m), day: Number(d) };
}
