import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import path from "node:path";
import { XMLParser } from "fast-xml-parser";

type WpItem = Record<string, unknown>;

const XML_PATH = path.resolve(
  import.meta.dirname,
  "../../shashvatsatya.WordPress.2026-10-17.xml",
);

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const token = process.env.SANITY_API_WRITE_TOKEN!;

if (!projectId || !dataset || !token) {
  throw new Error("Missing Sanity env vars in .env.local");
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

function hasDevanagari(text: string) {
  return /[\u0900-\u097F]/.test(text);
}

function textOf(value: unknown): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "#text" in value) {
    return String((value as { "#text": string })["#text"]);
  }
  return "";
}

function getCategories(item: WpItem): string[] {
  const raw = item.category;
  if (!raw) return [];
  const list = Array.isArray(raw) ? raw : [raw];
  return list
    .map((entry) => {
      if (typeof entry === "string") return entry;
      const domain = (entry as Record<string, string>)["@_domain"];
      if (domain !== "category") return "";
      return (
        (entry as Record<string, string>)["@_nicename"] ||
        textOf(entry) ||
        ""
      );
    })
    .filter(Boolean);
}

function getMeta(item: WpItem, key: string): string | undefined {
  const raw = item["wp:postmeta"];
  if (!raw) return undefined;
  const list = Array.isArray(raw) ? raw : [raw];
  for (const entry of list) {
    const metaKey = textOf((entry as WpItem)["wp:meta_key"]);
    if (metaKey === key) {
      return textOf((entry as WpItem)["wp:meta_value"]);
    }
  }
  return undefined;
}

function isDemoPost(item: WpItem, title: string) {
  const date = textOf(item["wp:post_date"]);
  if (!date.startsWith("2025-11-22")) return false;
  return !hasDevanagari(title);
}

function parseItems() {
  const xml = readFileSync(XML_PATH, "utf8");
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    parseTagValue: false,
    trimValues: true,
    isArray: (name) =>
      ["item", "category", "wp:postmeta"].includes(name),
  });
  const data = parser.parse(xml) as {
    rss: { channel: { item: WpItem[] } };
  };
  return data.rss.channel.item;
}

function extractDates(html: string) {
  const death =
    html.match(/Death-\s*([^<\n]+)/i)?.[1]?.trim() ||
    html.match(/मृत्यु[^:]*:?\s*([^<\n]+)/)?.[1]?.trim();
  const birth =
    html.match(/Birth-\s*([^<\n]+)/i)?.[1]?.trim() ||
    html.match(/जन्म[^:]*:?\s*([^<\n]+)/)?.[1]?.trim();
  return { death, birth };
}

function toIsoFromLoose(value?: string): string | undefined {
  if (!value) return undefined;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString().slice(0, 10);
}

function shiftAnniversaryTo(base: Date, monthDaySource?: string) {
  if (!monthDaySource) return undefined;
  const iso = toIsoFromLoose(monthDaySource);
  if (!iso) return undefined;
  const [, month, day] = iso.split("-");
  const year = base.getFullYear();
  return `${year}-${month}-${day}`;
}

async function uploadPortrait(url: string, filename: string) {
  const res = await fetch(url);
  if (!res.ok) return undefined;
  const buffer = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, { filename });
  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
  };
}

async function portraitFromThumb(
  item: WpItem,
  attachments: Map<string, string>,
) {
  const thumbId = getMeta(item, "_thumbnail_id");
  if (!thumbId) return undefined;
  const url = attachments.get(thumbId);
  if (!url) return undefined;
  return uploadPortrait(url, path.basename(url));
}

function bilingualFromTitle(title: string) {
  if (hasDevanagari(title)) {
    return { hi: title, en: "" };
  }
  return { hi: "", en: title };
}

function docId(prefix: string, item: WpItem) {
  const postId = textOf(item["wp:post_id"]);
  return `${prefix}-${postId}`;
}

function bilingualHtml(html: string) {
  if (!html.trim()) return undefined;
  if (hasDevanagari(html)) {
    return { hi: html, en: "" };
  }
  return { hi: "", en: html };
}

function pickPosts(
  posts: WpItem[],
  category: string,
  limit: number,
  requireBody = false,
) {
  const picked: WpItem[] = [];
  for (const item of posts) {
    const cats = getCategories(item);
    if (!cats.includes(category)) continue;
    const title = textOf(item.title);
    const body = textOf(item["content:encoded"]);
    if (requireBody && body.trim().length < 40) continue;
    if (isDemoPost(item, title)) continue;
    picked.push(item);
    if (picked.length >= limit) break;
  }
  return picked;
}

const pageDrafts: Record<
  string,
  { title: { hi: string; en: string }; body: { hi: string; en: string } }
> = {
  "about-us": {
    title: { hi: "हमारे बारे में", en: "About us" },
    body: {
      hi: "<p>शाश्वत सत्य एक स्मारक प्रकाशन है जो परिवारों की श्रद्धांजलि और राष्ट्र के बलिदानियों की स्मृति को संजोता है।</p>",
      en: "<p>Shashvat Satya is a memorial publication preserving family shradhanjali and the memory of the nation's martyrs.</p>",
    },
  },
  "contact-us": {
    title: { hi: "संपर्क", en: "Contact us" },
    body: {
      hi: "<p>ईमेल: shashvatsatya.delhi@gmail.com<br>WhatsApp: 9811652105</p>",
      en: "<p>Email: shashvatsatya.delhi@gmail.com<br>WhatsApp: 9811652105</p>",
    },
  },
  "help-us": {
    title: { hi: "हमारी सहायता करें", en: "Help us" },
    body: {
      hi: "<p>इस स्मारक पोर्टल को जीवित रखने के लिए आपका सहयोग स्मरण को दीर्घकालिक बनाता है।</p>",
      en: "<p>Your support helps keep this memorial portal alive for families and citizens alike.</p>",
    },
  },
  advertising: {
    title: { hi: "विज्ञापन", en: "Advertising" },
    body: {
      hi: "<p>स्मारक प्रकाशन में विज्ञापन के लिए संपर्क करें।</p>",
      en: "<p>Contact us for advertising in the memorial publication.</p>",
    },
  },
  jobs: {
    title: { hi: "कार्य", en: "Jobs" },
    body: {
      hi: "<p>स्वयंसेवा और सहयोग के अवसरों के लिए हमसे जुड़ें।</p>",
      en: "<p>Join us for volunteer and collaboration opportunities.</p>",
    },
  },
};

async function main() {
  const items = parseItems();
  const attachments = new Map<string, string>();
  const posts: WpItem[] = [];

  for (const item of items) {
    const type = textOf(item["wp:post_type"]);
    const status = textOf(item["wp:status"]);
    if (type === "attachment") {
      const id = textOf(item["wp:post_id"]);
      const url = textOf(item["wp:attachment_url"]);
      if (id && url) attachments.set(id, url);
    }
    if (type === "post" && status === "publish") {
      posts.push(item);
    }
  }

  const anchor = new Date();
  const today = anchor.toISOString().slice(0, 10);
  const yesterday = new Date(anchor);
  yesterday.setDate(yesterday.getDate() - 1);
  const tomorrow = new Date(anchor);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const docs: Record<string, unknown>[] = [];

  const deathPosts = pickPosts(posts, "death-anniversaries", 12);
  deathPosts.slice(0, 6).forEach((item, index) => {
    const title = textOf(item.title);
    const slug = textOf(item["wp:post_name"]);
    const body = textOf(item["content:encoded"]);
    const { death, birth } = extractDates(body);
    const calendarTargets = [
      yesterday.toISOString().slice(0, 10),
      yesterday.toISOString().slice(0, 10),
      today,
      today,
      tomorrow.toISOString().slice(0, 10),
      tomorrow.toISOString().slice(0, 10),
    ];
    docs.push({
      _id: docId("tribute-death", item),
      _type: "tribute",
      name: bilingualFromTitle(title),
      slug: { _type: "slug", current: slug },
      role: "family",
      birthDate: toIsoFromLoose(birth),
      deathDate:
        calendarTargets[index] ||
        shiftAnniversaryTo(anchor, death) ||
        toIsoFromLoose(death),
      bodyHtml: bilingualHtml(body),
    });
  });

  const birthPosts = pickPosts(posts, "birth-anniversaries", 4);
  for (const item of birthPosts) {
    const title = textOf(item.title);
    const slug = textOf(item["wp:post_name"]);
    const body = textOf(item["content:encoded"]);
    const { birth } = extractDates(body);
    docs.push({
      _id: docId("tribute-birth", item),
      _type: "tribute",
      name: bilingualFromTitle(title),
      slug: { _type: "slug", current: slug },
      role: "family",
      birthDate: shiftAnniversaryTo(anchor, birth) || toIsoFromLoose(birth),
      bodyHtml: bilingualHtml(body),
    });
  }

  const shradPosts = pickPosts(posts, "shradhanjali", 8, true);
  const publicSlugs = new Set([
    "ratan-naval-tata",
    "mohandas-karamchand-gandhi",
    "lal-bahadur-shastri",
    "jitendra-singh-gurjar",
  ]);
  const publicPosts = [
    ...shradPosts.filter((p) => publicSlugs.has(textOf(p["wp:post_name"]))),
    ...shradPosts.filter((p) => !publicSlugs.has(textOf(p["wp:post_name"]))),
  ].slice(0, 4);

  for (const item of publicPosts) {
    const title = textOf(item.title);
    const slug = textOf(item["wp:post_name"]);
    const body = textOf(item["content:encoded"]);
    const { death, birth } = extractDates(body);
    const portrait = await portraitFromThumb(item, attachments);
    docs.push({
      _id: docId("tribute-public", item),
      _type: "tribute",
      name: bilingualFromTitle(title),
      slug: { _type: "slug", current: slug },
      role: "publicFigure",
      birthDate: toIsoFromLoose(birth),
      deathDate: toIsoFromLoose(death),
      portrait,
      bodyHtml: bilingualHtml(body),
    });
  }

  const martyrPosts = pickPosts(posts, "bhaarat-ke-amar-balidaani", 12, true);
  const martyrCandidates = martyrPosts.filter((p) => {
    const slug = textOf(p["wp:post_name"]);
    return !slug.includes("paramveer-chakra") && !slug.includes("tributes");
  });
  for (const item of martyrCandidates.slice(0, 4)) {
    const title = textOf(item.title);
    const slug = textOf(item["wp:post_name"]);
    const body = textOf(item["content:encoded"]);
    const { death, birth } = extractDates(body);
    const portrait = await portraitFromThumb(item, attachments);
    docs.push({
      _id: docId("martyr", item),
      _type: "martyr",
      name: bilingualFromTitle(title),
      slug: { _type: "slug", current: slug },
      award: slug.includes("joginder") ? "Param Vir Chakra" : undefined,
      birthDate: toIsoFromLoose(birth),
      deathDate: toIsoFromLoose(death),
      portrait,
      bodyHtml: bilingualHtml(body),
    });
  }

  const pvcPost = posts.find(
    (p) => textOf(p["wp:post_name"]) === "awarded-with-paramveer-chakra1st-part",
  );
  if (pvcPost) {
    const body = textOf(pvcPost["content:encoded"]);
    docs.push({
      _id: "martyr-param-veer-chakra",
      _type: "martyr",
      name: {
        hi: "परमवीर चक्र विजेता",
        en: "Param Vir Chakra recipients",
      },
      slug: { _type: "slug", current: "param-veer-chakra" },
      award: "Param Vir Chakra",
      bodyHtml: bilingualHtml(body),
    });
  }

  const articlePosts = pickPosts(posts, "articles", 3, true);
  for (const item of articlePosts) {
    const title = textOf(item.title);
    const slug = textOf(item["wp:post_name"]);
    const body = textOf(item["content:encoded"]);
    docs.push({
      _id: docId("writing-article", item),
      _type: "writing",
      title: bilingualFromTitle(title),
      slug: { _type: "slug", current: slug },
      kind: "article",
      publishedAt: textOf(item["wp:post_date"]),
      bodyHtml: bilingualHtml(body),
    });
  }

  const jeevanPosts = pickPosts(posts, "jeevan-saar", 2, true);
  for (const item of jeevanPosts) {
    const title = textOf(item.title);
    const slug = textOf(item["wp:post_name"]);
    const body = textOf(item["content:encoded"]);
    docs.push({
      _id: docId("writing-jeevan", item),
      _type: "writing",
      title: bilingualFromTitle(title),
      slug: { _type: "slug", current: slug },
      kind: "jeevanSaar",
      publishedAt: textOf(item["wp:post_date"]),
      bodyHtml: bilingualHtml(body),
    });
  }

  const newsPosts = pickPosts(posts, "top-news-stories", 3, true);
  for (const item of newsPosts) {
    const title = textOf(item.title);
    const slug = textOf(item["wp:post_name"]);
    const body = textOf(item["content:encoded"]);
    docs.push({
      _id: docId("writing-news", item),
      _type: "writing",
      title: bilingualFromTitle(title),
      slug: { _type: "slug", current: slug },
      kind: "news",
      publishedAt: textOf(item["wp:post_date"]),
      bodyHtml: bilingualHtml(body),
    });
  }

  const letterPosts = pickPosts(posts, "your-letters", 2, true);
  const letterFallback = pickPosts(posts, "motivational-persons", 2, true);
  for (const item of [...letterPosts, ...letterFallback].slice(0, 2)) {
    const title = textOf(item.title);
    const slug = textOf(item["wp:post_name"]);
    const body = textOf(item["content:encoded"]);
    docs.push({
      _id: docId("writing-letter", item),
      _type: "writing",
      title: bilingualFromTitle(title),
      slug: { _type: "slug", current: slug },
      kind: "letter",
      publishedAt: textOf(item["wp:post_date"]),
      bodyHtml: bilingualHtml(body),
    });
  }

  const teamPosts = pickPosts(posts, "our-group", 4);
  for (const item of teamPosts) {
    const title = textOf(item.title).replace(/^\([A-Z]\)\s*/, "");
    const slug = textOf(item["wp:post_name"]);
    const portrait = await portraitFromThumb(item, attachments);
    docs.push({
      _id: docId("team", item),
      _type: "teamMember",
      name: bilingualFromTitle(title),
      slug: { _type: "slug", current: slug },
      note: {
        hi: "शाश्वत सत्य परिवार का सहयोगी सदस्य।",
        en: "A supporting member of the Shashvat Satya family.",
      },
      portrait,
    });
  }

  for (const [slug, draft] of Object.entries(pageDrafts)) {
    docs.push({
      _id: `page-${slug}`,
      _type: "page",
      title: draft.title,
      slug: { _type: "slug", current: slug },
      bodyHtml: draft.body,
    });
  }

  const transaction = client.transaction();
  for (const doc of docs) {
    transaction.createOrReplace(doc);
  }
  await transaction.commit();
  console.log(`Seeded ${docs.length} documents to ${projectId}/${dataset}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
