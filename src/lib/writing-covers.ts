const EXPLICIT: Record<string, string> = {
  "1622": "cover-news-1622",
  "no-space-for-samadhis-vvips-to-share-memorial-place-in-delhi":
    "cover-news-samadhis-delhi",
  "%e0%a4%b9%e0%a4%b0%e0%a4%bf%e0%a4%b6%e0%a5%8d%e0%a4%9a%e0%a4%82%e0%a4%a6%e0%a5%8d%e0%a4%b0-%e0%a4%98%e0%a4%be%e0%a4%9f-%e0%a4%b5%e0%a4%be%e0%a4%b0%e0%a4%be%e0%a4%a3%e0%a4%b8%e0%a5%80":
    "cover-harishchandra-ghat",
  "%e0%a4%aa%e0%a5%81%e0%a4%b7%e0%a5%8d%e0%a4%95%e0%a4%b0-%e0%a4%ae%e0%a5%8b%e0%a4%95%e0%a5%8d%e0%a4%b7-%e0%a4%95%e0%a5%80-%e0%a4%aa%e0%a5%8d%e0%a4%b0%e0%a4%be%e0%a4%aa%e0%a5%8d%e0%a4%a4%e0%a4%bf":
    "cover-pushkar",
  "%e0%a4%85%e0%a4%b8%e0%a5%8d%e0%a4%a5%e0%a4%bf-%e0%a4%b5%e0%a4%bf%e0%a4%b8%e0%a4%b0%e0%a5%8d%e0%a4%9c%e0%a4%a8-%e0%a4%95%e0%a5%87-%e0%a4%b2%e0%a4%bf%e0%a4%8f-%e0%a4%aa%e0%a4%b5%e0%a4%bf%e0%a4%a4":
    "cover-asthi-visarjan-ghats",
  "%e0%a4%b8%e0%a5%8d%e0%a4%b5%e0%a4%be%e0%a4%ae%e0%a5%80-%e0%a4%b5%e0%a4%bf%e0%a4%b5%e0%a5%87%e0%a4%95%e0%a4%be%e0%a4%a8%e0%a4%82%e0%a4%a6":
    "cover-swami-vivekananda",
  "%e0%a4%b8%e0%a5%8d%e0%a4%b5%e0%a4%be%e0%a4%ae%e0%a5%80-%e0%a4%a6%e0%a4%af%e0%a4%be%e0%a4%a8%e0%a4%82%e0%a4%a6-%e0%a4%b8%e0%a4%b0%e0%a4%b8%e0%a5%8d%e0%a4%b5%e0%a4%a4%e0%a5%80":
    "cover-swami-dayanand-saraswati",
  "%e0%a4%a4%e0%a5%81%e0%a4%ae-%e0%a4%ae%e0%a5%81%e0%a4%9d%e0%a5%87-%e0%a4%96%e0%a5%82%e0%a4%a8-%e0%a4%a6%e0%a5%8b-%e0%a4%ae%e0%a5%88%e0%a4%82-%e0%a4%a4%e0%a5%81%e0%a4%ae%e0%a5%8d%e0%a4%b9%e0%a5%87":
    "cover-subhash-chandra-bose",
  "%e0%a4%aa%e0%a5%8d%e0%a4%b0%e0%a5%87%e0%a4%b0%e0%a4%a3%e0%a4%be%e0%a4%b8%e0%a5%8d%e0%a4%aa%e0%a4%a6-%e0%a4%b5%e0%a5%8d%e0%a4%af%e0%a4%95%e0%a5%8d%e0%a4%a4%e0%a4%bf%e0%a4%a4%e0%a5%8d%e0%a4%b5-%e0%a4%ad":
    "cover-letter-bhojram-patel",
  "%e0%a4%97%e0%a4%b0%e0%a5%80%e0%a4%ac%e0%a5%80-%e0%a4%b8%e0%a5%87-%e0%a4%b8%e0%a4%ab%e0%a4%b2%e0%a4%a4%e0%a4%be-%e0%a4%a4%e0%a4%95%e0%a4%a8%e0%a4%bf%e0%a4%a7%e0%a4%bf-%e0%a4%b8%e0%a5%87":
    "cover-letter-nidhi-sen",
};

const COVER_STEMS = new Set<string>(Object.values(EXPLICIT));

export function coverArtKey(slug: string): string {
  const explicit = EXPLICIT[slug];
  if (explicit) return explicit;
  const decoded = decodeURIComponent(slug);
  const ascii = decoded
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `cover-${ascii || slug.replace(/%/g, "")}`;
}

export function hasWritingCover(slug: string) {
  return COVER_STEMS.has(coverArtKey(slug));
}

export function writingCoverSrc(slug: string): string {
  return `/art/covers/${coverArtKey(slug)}.png`;
}
