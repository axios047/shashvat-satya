import { notFound } from "next/navigation";
import { DetailLayout } from "@/components/detail/detail-layout";
import { slugCandidates } from "@/lib/slug-candidates";
import { sanityFetch } from "@/sanity/fetch";
import { pageBySlugQuery } from "@/sanity/queries";
import type { SitePage } from "@/sanity/types";

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>(
    `*[_type == "page"].slug.current`,
  );
  return slugs.map((slug) => ({ slug }));
}

const reserved = new Set([
  "studio",
  "tributes",
  "martyrs",
  "writings",
  "team",
]);

export default async function SitePageRoute({
  params,
}: PageProps<"/[slug]">) {
  const { slug } = await params;
  if (reserved.has(slug)) notFound();

  const page = await sanityFetch<SitePage | null>(pageBySlugQuery, {
    slugs: slugCandidates(slug),
  });
  if (!page) notFound();

  return (
    <DetailLayout
      backHref="/"
      backLabel={{ hi: "मुख्य पृष्ठ", en: "Home" }}
      title={page.title}
      bodyHtml={page.bodyHtml}
      variant="warm"
    />
  );
}
