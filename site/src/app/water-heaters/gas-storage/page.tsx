import type { Metadata } from "next";

import { TechnologyPage, techBySlug } from "@/components/advisor/TechnologyPage";

const tech = techBySlug("gas-storage");

export const metadata: Metadata = {
  title: tech.title,
  description: tech.metaDescription,
};

export default function GasStoragePage() {
  return <TechnologyPage tech={tech} />;
}
