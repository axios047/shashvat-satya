import { notFound } from "next/navigation";
import { LanguageProvider } from "@/components/language/language-provider";
import { TributeMemorial } from "@/components/detail/tribute-memorial";
import { sanitizeContent } from "@/lib/html";
import { slugCandidates } from "@/lib/slug-candidates";
import { sanityFetch } from "@/sanity/fetch";
import { tributeBySlugQuery } from "@/sanity/queries";
import type { Tribute } from "@/sanity/types";

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>(
    `*[_type == "tribute"].slug.current`,
  );
  return slugs.map((slug) => ({ slug }));
}

export default async function TributePage({
  params,
}: PageProps<"/tributes/[slug]">) {
  const { slug } = await params;
  const tribute = await sanityFetch<Tribute | null>(tributeBySlugQuery, {
    slugs: slugCandidates(slug),
  });
  if (!tribute) notFound();

  const body = {
    hi: tribute.bodyHtml?.hi ? await sanitizeContent(tribute.bodyHtml.hi) : "",
    en: tribute.bodyHtml?.en ? await sanitizeContent(tribute.bodyHtml.en) : "",
  };

  return (
    <LanguageProvider>
      <TributeMemorial tribute={tribute} body={body} />
    </LanguageProvider>
  );
}
