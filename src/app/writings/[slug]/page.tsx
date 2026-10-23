import { notFound } from "next/navigation";
import { DetailLayout } from "@/components/detail/detail-layout";
import { sanityFetch } from "@/sanity/fetch";
import { writingBySlugQuery } from "@/sanity/queries";
import type { Writing } from "@/sanity/types";

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>(
    `*[_type == "writing"].slug.current`,
  );
  return slugs.map((slug) => ({ slug }));
}

export default async function WritingPage({
  params,
}: PageProps<"/writings/[slug]">) {
  const { slug } = await params;
  const writing = await sanityFetch<Writing | null>(writingBySlugQuery, {
    slug,
  });
  if (!writing) notFound();

  return (
    <DetailLayout
      backHref="/#sections"
      backLabel={{ hi: "मुख्य स्मरण", en: "Back to memorial" }}
      title={writing.title}
      bodyHtml={writing.bodyHtml}
      variant="warm"
    />
  );
}
