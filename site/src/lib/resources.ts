import "server-only";

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

export type ResourceStatus =
  | "draft"
  | "researched"
  | "reviewed"
  | "approved"
  | "published"
  | "updated";

export interface ResourceArticle {
  id: string;
  title: string;
  description: string;
  slug: string;
  pageType: string;
  cluster?: string;
  geography: string;
  status: ResourceStatus;
  author: string;
  professionalReviewRequired: boolean;
  legalReviewFlag?: string;
  lastChecked: string;
  reviewInterval: string;
  primaryCta: string;
  content: string;
}

const CONTENT_DIRECTORY = path.resolve(process.cwd(), "..", "Resources");
const RESOURCE_STATUSES = new Set<ResourceStatus>([
  "draft",
  "researched",
  "reviewed",
  "approved",
  "published",
  "updated",
]);

/**
 * Drafts are reviewable locally and on Vercel preview deployments. A Vercel
 * production deployment withholds them until their frontmatter is explicitly
 * promoted to `published` or `updated` after owner approval.
 */
export const resourceDraftsVisible = process.env.VERCEL_ENV !== "production";

function requireString(
  data: Record<string, unknown>,
  field: string,
  filename: string,
): string {
  const value = data[field];
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Resource ${filename} is missing a valid ${field}`);
  }
  return value.trim();
}

function requireDateString(
  data: Record<string, unknown>,
  field: string,
  filename: string,
): string {
  const value = data[field];
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  return requireString(data, field, filename);
}

function parseResource(filename: string): ResourceArticle {
  const source = fs.readFileSync(path.join(CONTENT_DIRECTORY, filename), "utf8");
  const { data, content } = matter(source);
  const status = requireString(data, "status", filename) as ResourceStatus;

  if (!RESOURCE_STATUSES.has(status)) {
    throw new Error(`Resource ${filename} has unsupported status ${status}`);
  }

  const slug = requireString(data, "slug", filename).replace(/\/$/, "") || "/";
  if (slug !== "/resources" && !slug.startsWith("/resources/")) {
    throw new Error(`Resource ${filename} has out-of-scope slug ${slug}`);
  }

  const professionalReviewRequired = data.professional_review_required;
  if (typeof professionalReviewRequired !== "boolean") {
    throw new Error(
      `Resource ${filename} is missing a boolean professional_review_required`,
    );
  }

  return {
    id: requireString(data, "id", filename),
    title: requireString(data, "title", filename),
    description: requireString(data, "description", filename),
    slug,
    pageType: requireString(data, "page_type", filename),
    cluster:
      typeof data.cluster === "string" && data.cluster.trim()
        ? data.cluster.trim()
        : undefined,
    geography: requireString(data, "geography", filename),
    status,
    author: requireString(data, "author", filename),
    professionalReviewRequired,
    legalReviewFlag:
      typeof data.legal_review_flag === "string" && data.legal_review_flag.trim()
        ? data.legal_review_flag.trim()
        : undefined,
    lastChecked: requireDateString(data, "last_checked", filename),
    reviewInterval: requireString(data, "review_interval", filename),
    primaryCta: requireString(data, "primary_cta", filename),
    // The final "Last checked" paragraph is an editorial control in the
    // authoring file. The page renders a structured status panel instead.
    content: content.replace(/\nLast checked:[\s\S]*$/, "").trim(),
  };
}

function resourceFiles(): string[] {
  return fs
    .readdirSync(CONTENT_DIRECTORY)
    .filter((filename) => filename.endsWith(".md"))
    .filter((filename) => filename !== "README.md" && filename !== "QA-REPORT.md")
    .sort();
}

function assertUniqueResources(resources: ResourceArticle[]): void {
  const ids = new Set<string>();
  const slugs = new Set<string>();

  for (const resource of resources) {
    if (ids.has(resource.id)) {
      throw new Error(`Duplicate resource id: ${resource.id}`);
    }
    if (slugs.has(resource.slug)) {
      throw new Error(`Duplicate resource slug: ${resource.slug}`);
    }
    ids.add(resource.id);
    slugs.add(resource.slug);
  }
}

export function getAllResources({
  includeDrafts = resourceDraftsVisible,
}: { includeDrafts?: boolean } = {}): ResourceArticle[] {
  const resources = resourceFiles().map(parseResource);
  assertUniqueResources(resources);

  return resources.filter(
    (resource) =>
      includeDrafts || resource.status === "published" || resource.status === "updated",
  );
}

export function getResourceBySlug(slug: string): ResourceArticle | undefined {
  const normalized = slug.replace(/\/$/, "") || "/";
  return getAllResources().find((resource) => resource.slug === normalized);
}

export function resourcePathSegment(resource: ResourceArticle): string {
  return resource.slug.replace(/^\/resources\/?/, "");
}

export function formatResourceDate(date: string): string {
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(parsed);
}

export function clusterLabel(cluster?: string): string {
  if (!cluster) return "Resources";
  return cluster
    .split("-")
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join(" ");
}
