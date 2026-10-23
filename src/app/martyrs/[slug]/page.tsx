import { notFound } from "next/navigation";
import { DetailLayout } from "@/components/detail/detail-layout";
import { sanityFetch } from "@/sanity/fetch";
import { martyrBySlugQuery } from "@/sanity/queries";
import type { Martyr } from "@/sanity/types";

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>(`*[_type == "martyr"].slug.current`);
  return slugs.map((slug) => ({ slug }));
}

export default async function MartyrPage({
  params,
}: PageProps<"/martyrs/[slug]">) {
  const { slug } = await params;
  const martyr = await sanityFetch<Martyr | null>(martyrBySlugQuery, { slug });
  if (!martyr) notFound();

  return (
    <DetailLayout
      backHref="/#sections"
      backLabel={{ hi: "मुख्य स्मरण", en: "Back to memorial" }}
      title={martyr.name}
      subtitle={martyr.award}
      bodyHtml={martyr.bodyHtml}
      variant="solemn"
      portrait={
        martyr.portrait
          ? { type: "martyr", slug: martyr.slug.current }
          : null
      }
    />
  );
}
