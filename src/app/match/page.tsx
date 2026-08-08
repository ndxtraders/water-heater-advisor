import type { Metadata } from "next";

import MatchForm from "./MatchForm";

export const metadata: Metadata = {
  title: "Get introduced to a local installer",
  description:
    "One local installer suited to your specific job, with your recommendation " +
    "already attached so you are not asked everything twice.",
  // Nothing to gain from indexing a form, and it should never be an entry point:
  // arriving here without having run the quiz is the degraded path.
  robots: { index: false, follow: true },
};

export default function MatchPage() {
  return <MatchForm />;
}
