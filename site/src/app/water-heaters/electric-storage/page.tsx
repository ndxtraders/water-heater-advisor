import type { Metadata } from "next";

import { TechnologyPage, techBySlug } from "@/components/advisor/TechnologyPage";

const tech = techBySlug("electric-storage");

export const metadata: Metadata = {
  alternates: { canonical: "/water-heaters/electric-storage" },
  title: tech.title,
  description: tech.metaDescription,
};

export default function ElectricStoragePage() {
  return <TechnologyPage tech={tech} />;
}
