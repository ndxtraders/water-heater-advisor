import type { Metadata } from "next";

import { TechnologyPage, techBySlug } from "@/components/advisor/TechnologyPage";

const tech = techBySlug("tankless");

export const metadata: Metadata = {
  title: tech.title,
  description: tech.metaDescription,
};

export default function TanklessPage() {
  return <TechnologyPage tech={tech} />;
}
