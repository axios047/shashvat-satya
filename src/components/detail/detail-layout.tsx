import { LanguageProvider } from "@/components/language/language-provider";
import { DetailChrome } from "@/components/detail/detail-chrome";
import { LocalizedHtml } from "@/components/detail/localized-html";
import { sanitizeContent } from "@/lib/html";
import type { PortraitEntity } from "@/lib/painted-portraits";
import type { BilingualString, BilingualText } from "@/sanity/types";

export async function DetailLayout({
  backHref,
  backLabel,
  title,
  subtitle,
  bodyHtml,
  variant = "warm",
  portrait,
}: {
  backHref: string;
  backLabel: { hi: string; en: string };
  title: BilingualString;
  subtitle?: string;
  bodyHtml?: BilingualText;
  variant?: "warm" | "solemn";
  portrait?: { type: PortraitEntity; slug: string } | null;
}) {
  const html = {
    hi: bodyHtml?.hi ? await sanitizeContent(bodyHtml.hi) : "",
    en: bodyHtml?.en ? await sanitizeContent(bodyHtml.en) : "",
  };

  return (
    <LanguageProvider>
      <div
        className={
          variant === "solemn"
            ? "min-h-screen bg-maroon-deep text-paper"
            : "min-h-screen bg-background"
        }
      >
        <DetailChrome
          backHref={backHref}
          backLabel={backLabel}
          title={title}
          subtitle={subtitle}
          variant={variant}
          portrait={portrait}
        />
        <main className="mx-auto max-w-3xl px-6 pb-20">
          <LocalizedHtml html={html} />
        </main>
      </div>
    </LanguageProvider>
  );
}
