import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ResourcePage } from "@/components/resources/ResourcePage";
import { getResourceBySlug } from "@/lib/resources";

export const dynamic = "force-static";

export function generateMetadata(): Metadata {
  const resource = getResourceBySlug("/resources");
  if (!resource) return {};

  const isDraft = resource.status !== "published" && resource.status !== "updated";
  return {
    title: resource.title,
    description: resource.description,
    alternates: { canonical: resource.slug },
    robots: isDraft ? { index: false, follow: true } : undefined,
  };
}

export default function ResourcesPage() {
  const resource = getResourceBySlug("/resources");
  if (!resource) notFound();
  return <ResourcePage article={resource} />;
}
