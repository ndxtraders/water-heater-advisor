import type { Metadata } from "next";
import { Suspense } from "react";

import QuizFlow from "./QuizFlow";

export const metadata: Metadata = {
  alternates: { canonical: "/quiz" },
  title: "Which water heater is right for my home?",
  description:
    "Ten questions about your home and household. Get a system recommendation, a size, " +
    "a realistic cost range and the questions to ask an installer, before we ask for anything.",
};

export default function QuizPage() {
  // QuizFlow reads the seeded answer from the query string, which needs a
  // Suspense boundary to keep this route statically prerenderable.
  return (
    <Suspense fallback={null}>
      <QuizFlow />
    </Suspense>
  );
}
