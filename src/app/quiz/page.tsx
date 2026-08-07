import type { Metadata } from "next";

import QuizFlow from "./QuizFlow";

export const metadata: Metadata = {
  title: "Which water heater is right for my home?",
  description:
    "Ten questions about your home and household. Get a system recommendation, a size, " +
    "a realistic cost range and the questions to ask an installer, before we ask for anything.",
};

export default function QuizPage() {
  return <QuizFlow />;
}
