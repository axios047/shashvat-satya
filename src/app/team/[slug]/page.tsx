import { notFound } from "next/navigation";
import { DetailLayout } from "@/components/detail/detail-layout";
import { hasPaintedPortrait } from "@/lib/painted-portraits";
import { slugCandidates } from "@/lib/slug-candidates";
import { sanityFetch } from "@/sanity/fetch";
import { teamBySlugQuery } from "@/sanity/queries";
import type { TeamMember } from "@/sanity/types";

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>(
    `*[_type == "teamMember"].slug.current`,
  );
  return slugs.map((slug) => ({ slug }));
}

export default async function TeamPage({
  params,
}: PageProps<"/team/[slug]">) {
  const { slug } = await params;
  const member = await sanityFetch<TeamMember | null>(teamBySlugQuery, {
    slugs: slugCandidates(slug),
  });
  if (!member) notFound();

  const storedSlug = member.slug.current;
  const showPortrait =
    member.portrait || hasPaintedPortrait("teamMember", storedSlug);

  return (
    <DetailLayout
      backHref="/#sections"
      backLabel={{ hi: "हमारा समूह", en: "Our group" }}
      title={member.name}
      bodyHtml={{
        en: member.note?.en ? `<p>${member.note.en}</p>` : "",
        hi: member.note?.hi ? `<p>${member.note.hi}</p>` : "",
      }}
      variant="warm"
      portrait={
        showPortrait ? { type: "teamMember", slug: storedSlug } : null
      }
    />
  );
}
