import { BookOpen, CalendarCheck, CircleAlert, Scale } from "lucide-react";
import Link from "next/link";

import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Container, Eyebrow, Section } from "@/components/common/Layout";
import { ResourceMarkdown } from "@/components/resources/ResourceMarkdown";
import {
  clusterLabel,
  formatResourceDate,
  type ResourceArticle,
} from "@/lib/resources";
import { site } from "@/lib/site";

function ResourceBreadcrumb({ article }: { article: ResourceArticle }) {
  const isHub = article.slug === "/resources";
  return (
    <Breadcrumb
      trail={
        isHub
          ? [{ label: "Resources" }]
          : [{ label: "Resources", href: "/resources" }, { label: article.title }]
      }
    />
  );
}

function ReviewStatus({ article }: { article: ResourceArticle }) {
  return (
    <aside
      aria-labelledby="resource-review-status"
      className="mt-12 rounded-xl border border-border bg-tint p-5 sm:p-6"
    >
      <div className="flex gap-3">
        {article.professionalReviewRequired ? (
          <CircleAlert aria-hidden className="mt-0.5 size-5 shrink-0 text-flag-red" />
        ) : (
          <CalendarCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-blue" />
        )}
        <div>
          <h2 id="resource-review-status" className="text-lg">
            Evidence and review status
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-foreground">
            Written by {article.author}. Sources last checked{" "}
            <span className="apparatus">{formatResourceDate(article.lastChecked)}</span>.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {article.professionalReviewRequired
              ? "Qualified professional review has not yet been completed. This review page does not imply that a plumber, contractor, engineer, or health professional has approved the guidance."
              : "No professional technical review is claimed. Verify model-specific, local, legal, tax, permit, program, and price information with the organization that owns it before acting."}
          </p>
        </div>
      </div>
    </aside>
  );
}

export function ResourcePage({ article }: { article: ResourceArticle }) {
  const isHub = article.slug === "/resources";
  const schema = isHub
    ? {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: article.title,
        description: article.description,
        url: `${site.url}${article.slug}`,
        isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
      }
    : {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.description,
        dateModified: article.lastChecked,
        author: { "@type": "Organization", name: article.author },
        publisher: { "@type": "Organization", name: site.name },
        mainEntityOfPage: `${site.url}${article.slug}`,
        isPartOf: {
          "@type": "CollectionPage",
          name: "Water Heater Resources for Homeowners",
          url: `${site.url}/resources`,
        },
      };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Section className="pb-10 pt-10 sm:pb-12 sm:pt-14">
        <Container width="narrow">
          <ResourceBreadcrumb article={article} />
          <div className="mt-8">
            <Eyebrow icon={isHub ? BookOpen : Scale}>
              {isHub ? "Homeowner library" : clusterLabel(article.cluster)}
            </Eyebrow>
            <h1 className="max-w-[18ch] text-4xl leading-[1.08] sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-5 max-w-measure text-lg leading-relaxed text-navy">
              {article.description}
            </p>
            {article.status !== "published" && article.status !== "updated" ? (
              <p className="apparatus mt-5 inline-flex rounded-full border border-dashed border-input px-3 py-1.5 text-xs text-muted-foreground">
                Review draft · excluded from production indexing
              </p>
            ) : null}
          </div>
        </Container>
      </Section>

      <Section className="pt-8 sm:pt-10" tone={isHub ? "tint" : "paper"}>
        <Container width="narrow">
          <ResourceMarkdown content={article.content} />
          <ReviewStatus article={article} />
        </Container>
      </Section>
    </>
  );
}
