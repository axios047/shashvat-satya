export type PortraitEntity = "tribute" | "martyr" | "teamMember";

const EXPLICIT: Record<string, string> = {
  "martyr:%e0%a4%b6%e0%a5%8d%e0%a4%b0%e0%a5%80-%e0%a4%ac%e0%a4%b2%e0%a4%bf%e0%a4%b0%e0%a4%be%e0%a4%ae":
    "/art/portraits/martyr-shree-biliram.png",
  "team:c-%e0%a4%b5%e0%a4%bf%e0%a4%9c%e0%a4%af-%e0%a4%b8%e0%a4%be%e0%a4%97%e0%a4%b0":
    "/art/portraits/team-c-vijay-sagar.png",
};

/** ASCII filename stem for generated oleograph files. */
export function portraitArtKey(type: PortraitEntity, slug: string): string {
  const explicit = EXPLICIT[`${type}:${slug}`];
  if (explicit) {
    return explicit.replace("/art/portraits/", "").replace(/\.png$/, "");
  }
  const decoded = decodeURIComponent(slug);
  const ascii = decoded
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const prefix =
    type === "teamMember" ? "team" : type === "martyr" ? "martyr" : "tribute";
  return `${prefix}-${ascii || slug.replace(/%/g, "")}`;
}

const PAINTED_STEMS = new Set([
  "tribute-ratan-naval-tata",
  "tribute-tulsi-tanti",
  "tribute-aditya-vikram-birla",
  "tribute-ramnath-goenka",
  "martyr-mustafa-mahammad",
  "martyr-dinesh-chandra-sharma",
  "martyr-m-govinda-rao",
  "martyr-shree-biliram",
  "team-c-vijay-sagar",
  "team-b-dr-anupam-chouksey",
  "team-a-sumitra-mahajan",
  "team-dsuneel-agarwal",
]);

export function hasPaintedPortrait(type: PortraitEntity, slug: string) {
  return PAINTED_STEMS.has(portraitArtKey(type, slug));
}

export function paintedPortraitSrc(
  type: PortraitEntity,
  slug: string,
): string {
  const explicit = EXPLICIT[`${type}:${slug}`];
  if (explicit) return explicit;
  return `/art/portraits/${portraitArtKey(type, slug)}.png`;
}
