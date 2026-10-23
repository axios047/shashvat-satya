import { calendarParams } from "../src/lib/dates";
import { urlFor } from "../src/sanity/image";
import { client } from "../src/sanity/client";
import { homepageQuery } from "../src/sanity/queries";

async function main() {
  const data = await client.fetch(homepageQuery, calendarParams(new Date()));
  const items: { type: string; slug: string; url: string }[] = [];
  const seen = new Set<string>();

  function add(type: string, slug: string, portrait: unknown) {
    const key = `${type}:${slug}`;
    if (seen.has(key) || !portrait) return;
    seen.add(key);
    items.push({
      type,
      slug,
      url: urlFor(portrait as Parameters<typeof urlFor>[0])
        .width(512)
        .height(640)
        .fit("crop")
        .url(),
    });
  }

  for (const t of [
    ...data.shradhanjali,
    ...data.deathAnniversaries,
    ...data.birthAnniversaries,
    ...(data.calendar?.today ?? []),
    ...(data.calendar?.yesterday ?? []),
    ...(data.calendar?.tomorrow ?? []),
  ]) {
    add("tribute", t.slug.current, t.portrait);
  }
  for (const m of data.martyrs) add("martyr", m.slug.current, m.portrait);
  for (const tm of data.team) add("team", tm.slug.current, tm.portrait);

  console.log(JSON.stringify(items, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
