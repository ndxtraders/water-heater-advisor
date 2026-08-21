import type { Metadata } from "next";

import { TechnologyPage, techBySlug } from "@/components/advisor/TechnologyPage";

const tech = techBySlug("heat-pump");

export const metadata: Metadata = {
  title: tech.title,
  description: tech.metaDescription,
};

export default function HeatPumpPage() {
  return <TechnologyPage tech={tech} />;
}
