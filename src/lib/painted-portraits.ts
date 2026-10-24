export type PortraitEntity = "tribute" | "martyr" | "teamMember";

const EXPLICIT: Record<string, string> = {
  "martyr:%e0%a4%b6%e0%a5%8d%e0%a4%b0%e0%a5%80-%e0%a4%ac%e0%a4%b2%e0%a4%bf%e0%a4%b0%e0%a4%be%e0%a4%ae":
    "/art/portraits/martyr-shree-biliram.png",
  "teamMember:c-%e0%a4%b5%e0%a4%bf%e0%a4%9c%e0%a4%af-%e0%a4%b8%e0%a4%be%e0%a4%97%e0%a4%b0":
    "/art/portraits/team-c-vijay-sagar.png",
  "tribute:%e0%a4%b6%e0%a5%8d%e0%a4%b0%e0%a5%80-%e0%a4%aa%e0%a5%8d%e0%a4%b0%e0%a4%b5%e0%a4%b0%e0%a5%8d%e0%a4%a4%e0%a4%a8-%e0%a4%b6%e0%a5%81%e0%a4%95%e0%a5%8d%e0%a4%b2%e0%a4%be":
    "/art/portraits/tribute-pravartan-shukla.png",
  "tribute:%e0%a4%b6%e0%a5%8d%e0%a4%b0%e0%a5%80%e0%a4%ae%e0%a4%a4%e0%a5%80-%e0%a4%86%e0%a4%b6%e0%a4%be-%e0%a4%b6%e0%a5%8d%e0%a4%b0%e0%a5%80%e0%a4%b5%e0%a4%be%e0%a4%b8%e0%a5%8d%e0%a4%a4%e0%a4%b5":
    "/art/portraits/tribute-asha-shrivastava.png",
  "tribute:%e0%a4%b6%e0%a5%8d%e0%a4%b0%e0%a5%80%e0%a4%ae%e0%a4%a4%e0%a5%80-%e0%a4%85%e0%a4%b0%e0%a5%8d%e0%a4%9a%e0%a4%a8%e0%a4%be-%e0%a4%ac%e0%a5%8b%e0%a4%a8%e0%a5%8d%e0%a4%a6%e0%a5%8d%e0%a4%b0%e0%a4%bf%e0%a4%af":
    "/art/portraits/tribute-archana-bondriya.png",
  "tribute:%e0%a4%ad%e0%a5%80%e0%a4%b7%e0%a5%8d%e0%a4%ae-%e0%a4%95%e0%a5%81%e0%a4%ae%e0%a4%be%e0%a4%b0-%e0%a4%9a%e0%a5%81%e0%a4%98":
    "/art/portraits/tribute-bheeshm-kumar-chugh.png",
  "tribute:%e0%a4%b8%e0%a5%8d%e0%a4%b5%e0%a4%b0%e0%a5%8d%e0%a4%97%e0%a5%80%e0%a4%af-%e0%a4%b6%e0%a5%8d%e0%a4%b0%e0%a5%80-%e0%a4%b8%e0%a5%8b%e0%a4%b9%e0%a4%a8%e0%a4%b2%e0%a4%be%e0%a4%b2-%e0%a4%b8%e0%a4%9a":
    "/art/portraits/tribute-sohanlal-sachdeva.png",
  "tribute:%e0%a4%b8%e0%a4%b0%e0%a4%a6%e0%a4%be%e0%a4%b0-%e0%a4%97%e0%a5%81%e0%a4%b0%e0%a4%9a%e0%a4%b0%e0%a4%a3-%e0%a4%b8%e0%a4%bf%e0%a4%82%e0%a4%b9-%e0%a4%ae%e0%a4%b0%e0%a4%b5%e0%a4%be%e0%a4%b9%e0%a4%be":
    "/art/portraits/tribute-gurcharan-singh-marwaha.png",
  "tribute:%e0%a4%b8%e0%a5%8d%e0%a4%b5%e0%a4%b0%e0%a5%8d%e0%a4%97%e0%a5%80%e0%a4%af-%e0%a4%b6%e0%a5%8d%e0%a4%b0%e0%a5%80-%e0%a4%95%e0%a5%87-%e0%a4%95%e0%a5%87-%e0%a4%95%e0%a5%81%e0%a4%b2%e0%a4%b6%e0%a5%8d":
    "/art/portraits/tribute-kk-kulshreshtha.png",
  "tribute:%e0%a4%b8%e0%a5%8d%e0%a4%b5%e0%a4%b0%e0%a5%8d%e0%a4%97%e0%a5%80%e0%a4%af-%e0%a4%b6%e0%a5%8d%e0%a4%b0%e0%a5%80%e0%a4%ae%e0%a4%a4%e0%a5%80-%e0%a4%87%e0%a4%82%e0%a4%a6%e0%a5%81-%e0%a4%aa%e0%a5%8d":
    "/art/portraits/tribute-indu-prabha-sharma.png",
  "tribute:%e0%a4%b6%e0%a5%8d%e0%a4%b0%e0%a5%80%e0%a4%ae%e0%a4%a4%e0%a5%80-%e0%a4%b6%e0%a4%bf%e0%a4%b5%e0%a4%be%e0%a4%a8%e0%a5%80-%e0%a4%9c%e0%a5%88%e0%a4%a8":
    "/art/portraits/tribute-shivani-jain.png",
  "tribute:%e0%a4%85%e0%a4%a7%e0%a4%bf%e0%a4%aa-%e0%a4%b2%e0%a5%8b%e0%a4%a8%e0%a4%be%e0%a4%b0%e0%a5%87":
    "/art/portraits/tribute-adhip-lonare.png",
  "martyr:param-veer-chakra": "/art/portraits/martyr-param-veer-chakra.png",
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
  "tribute-pravartan-shukla",
  "tribute-asha-shrivastava",
  "tribute-archana-bondriya",
  "tribute-bheeshm-kumar-chugh",
  "tribute-sohanlal-sachdeva",
  "tribute-gurcharan-singh-marwaha",
  "tribute-kk-kulshreshtha",
  "tribute-indu-prabha-sharma",
  "tribute-shivani-jain",
  "tribute-adhip-lonare",
  "martyr-mustafa-mahammad",
  "martyr-dinesh-chandra-sharma",
  "martyr-m-govinda-rao",
  "martyr-shree-biliram",
  "martyr-param-veer-chakra",
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
