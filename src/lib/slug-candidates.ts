/** WordPress slugs are often stored percent-encoded; Next may pass decoded paths. */
export function slugCandidates(slug: string): string[] {
  const out = new Set<string>([slug]);
  try {
    const decoded = decodeURIComponent(slug);
    out.add(decoded);
    out.add(encodeURIComponent(decoded));
  } catch {
    // keep original only
  }
  return [...out];
}
