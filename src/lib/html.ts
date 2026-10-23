import DOMPurify from "isomorphic-dompurify";
import { cacheLife } from "next/cache";

export async function sanitizeContent(html: string) {
  "use cache";
  cacheLife("max");
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ADD_TAGS: ["mark"],
    ADD_ATTR: ["style", "class", "target", "rel"],
  });
}
