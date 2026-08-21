import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ResourcePage } from "@/components/resources/ResourcePage";
import {
  getAllResources,
  getResourceBySlug,
  resourcePathSegment,
} from "@/lib/resources";

export const dynamic = "force-static";
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllResources()
    .filter((resource) => resource.slug !== "/resources")
    .map((resource) => ({ slug: resourcePathSegment(resource) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(`/resources/${slug}`);
  if (!resource) return {};

  const isDraft = resource.status !== "published" && resource.status !== "updated";
  return {
    title: resource.title,
    description: resource.description,
    alternates: { canonical: resource.slug },
    robots: isDraft ? { index: false, follow: true } : undefined,
  };
}

export default async function ResourceArticlePage({ params }: Props) {
  const { slug } = await params;
  const resource = getResourceBySlug(`/resources/${slug}`);
  if (!resource || resource.slug === "/resources") notFound();
  return <ResourcePage article={resource} />;
}
